/**
 * Secure Vault — Pure JS/WASM implementation.
 *
 * Cryptographic stack:
 *   hash-wasm        → Argon2id KDF
 *   @noble/ciphers   → ChaCha20-Poly1305 AEAD (key-committing)
 *   @noble/hashes    → BLAKE3, HKDF-SHA-512
 *
 * v3 improvements over v2:
 *   - HKDF uses SHA-512 (SHA-2), not SHA3-512 (correct security proof pairing)
 *   - HKDF extract step receives the Argon2id salt (defense-in-depth)
 *   - ChaCha20-Poly1305 is key-committing: BLAKE3(key ‖ nonce) tag appended
 *   - Internal API works in Uint8Array — hex/base64 only at public boundaries
 *   - Key derivation separated from session caching (no side-effect leaks)
 *   - Stack-safe base64 encoding (chunked, not spread-based)
 *
 * Dependencies:
 *   npm install hash-wasm @noble/ciphers @noble/hashes
 *
 * @version 3.0.0
 * @module SecureVault
 */

import { argon2id } from 'hash-wasm';
import { chacha20poly1305 } from '@noble/ciphers/chacha.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import { sha512 } from '@noble/hashes/sha2.js';
import { blake3 } from '@noble/hashes/blake3.js';
import { randomBytes, bytesToHex, hexToBytes, utf8ToBytes, concatBytes } from '@noble/hashes/utils.js';

// ============================================
// Constants
// ============================================

/** Default Argon2id memory cost: 32 MiB (KiB) — above OWASP minimum (19 MiB) */
export const DEFAULT_MEMORY_KIB = 32768;

/** Default Argon2id iterations */
export const DEFAULT_ITERATIONS = 2;

/** SECURITY (v4.3 — M6): Default Argon2id parallelism. Higher p means each
 *  attempt needs p × memoryKib of RAM, making GPU attacks proportionally
 *  more expensive. p=2 doubles the memory cost per attempt vs p=1. */
export const DEFAULT_PARALLELISM = 3;

/** Low-memory profile: 19 MiB, 3 iterations (still meets OWASP minimum) */
export const LOW_MEMORY_KIB = 19456;
export const LOW_MEMORY_ITERATIONS = 2;

/** Vault format version — bump on any ciphertext format change */
export const VAULT_VERSION = 4;

/** HKDF purpose strings for domain separation */
const PURPOSE_ENCRYPT = 'pixa-vault-encrypt-v1';
const PURPOSE_VERIFY  = 'pixa-vault-verify-v1';

/** ChaCha20-Poly1305 nonce size in bytes */
const NONCE_SIZE = 12;

/** Key commitment tag size in bytes (BLAKE3 output) */
const COMMITMENT_SIZE = 32;

// ============================================
// Internal helpers
// ============================================

/**
 * Derive 32-byte master key via Argon2id.
 * Returns raw Uint8Array — caller is responsible for zeroization.
 * @private
 */
async function argon2idDerive(pin, saltBytes, memoryKib, iterations, parallelism = DEFAULT_PARALLELISM) {
    const pinBytes = typeof pin === 'string' ? utf8ToBytes(pin) : pin;
    const hash = await argon2id({
        password: pinBytes,
        salt: saltBytes,
        parallelism: parallelism,
        iterations: iterations,
        memorySize: memoryKib,
        hashLength: 32,
        outputType: 'binary',
    });
    return new Uint8Array(hash);
}

/**
 * Derive a sub-key via HKDF-SHA-512 with purpose string and optional salt.
 *
 * Using SHA-512 (SHA-2 family, Merkle-Damgård) — the hash family for which
 * HKDF's security proof was designed. SHA-3 (sponge) works with HMAC but is
 * not the idiomatic pairing; KMAC would be the SHA-3 equivalent.
 *
 * @param {Uint8Array} ikm - Input keying material (Argon2id output)
 * @param {string|Uint8Array} purpose - Domain separation label
 * @param {Uint8Array} [salt] - HKDF extract-step salt (recommended)
 * @param {number} [length=32] - Output key length
 * @returns {Uint8Array}
 * @private
 */
function deriveSubkey(ikm, purpose, salt, length = 32) {
    const info = typeof purpose === 'string' ? utf8ToBytes(purpose) : purpose;
    return hkdf(sha512, ikm, salt, info, length);
}

/**
 * Encrypt with ChaCha20-Poly1305, key-committing.
 *
 * Format: nonce(12) ‖ commitment(32) ‖ ciphertext ‖ tag(16)
 *
 * The commitment tag = BLAKE3(key ‖ nonce) is verified before decryption.
 * This prevents a single ciphertext from decrypting under multiple keys
 * to different plaintexts — critical for PIN-based vaults where an attacker
 * might craft decoy records.
 *
 * @param {Uint8Array} key - 32-byte encryption key
 * @param {Uint8Array} plaintext
 * @param {Uint8Array} [aad] - Additional authenticated data
 * @returns {Uint8Array} nonce ‖ commitment ‖ ciphertext ‖ tag
 * @private
 */
function chachaEncrypt(key, plaintext, aad) {
    const nonce = randomBytes(NONCE_SIZE);
    const commitment = blake3(concatBytes(key, nonce));
    const cipher = chacha20poly1305(key, nonce, aad);
    const ct = cipher.encrypt(plaintext);
    return concatBytes(nonce, commitment, ct);
}

/**
 * Decrypt with ChaCha20-Poly1305, key-committing.
 *
 * Verifies BLAKE3(key ‖ nonce) commitment before decryption (fail-fast
 * on wrong key instead of potentially succeeding with garbage plaintext).
 *
 * @param {Uint8Array} key - 32-byte encryption key
 * @param {Uint8Array} data - nonce ‖ commitment ‖ ciphertext ‖ tag
 * @param {Uint8Array} [aad]
 * @returns {Uint8Array} plaintext
 * @private
 */
function chachaDecrypt(key, data, aad) {
    const minLength = NONCE_SIZE + COMMITMENT_SIZE + 16; // nonce + commitment + tag
    if (data.length < minLength) throw new Error('Invalid ciphertext: too short');

    const nonce = data.subarray(0, NONCE_SIZE);
    const storedCommitment = data.subarray(NONCE_SIZE, NONCE_SIZE + COMMITMENT_SIZE);
    const ct = data.subarray(NONCE_SIZE + COMMITMENT_SIZE);

    // Verify key commitment before decryption (constant-time via timingSafeEqual)
    const expectedCommitment = blake3(concatBytes(key, nonce));
    if (!timingSafeEqual(storedCommitment, expectedCommitment)) {
        throw new Error('Key commitment failed — wrong key or tampered ciphertext');
    }

    const cipher = chacha20poly1305(key, nonce, aad);
    return cipher.decrypt(ct);
}

/**
 * Constant-time comparison of two Uint8Arrays.
 * @private
 */
function timingSafeEqual(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a[i] ^ b[i];
    }
    return diff === 0;
}

/**
 * Stack-safe base64 encoding. Uses chunked String.fromCharCode
 * to avoid RangeError on payloads > ~100 KB.
 * @param {Uint8Array} bytes
 * @returns {string}
 * @private
 */
function toBase64(bytes) {
    const CHUNK = 8192;
    let bin = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
        const slice = bytes.subarray(i, Math.min(i + CHUNK, bytes.length));
        bin += String.fromCharCode.apply(null, slice);
    }
    return btoa(bin);
}

/**
 * Base64 decode to Uint8Array.
 * @param {string} str
 * @returns {Uint8Array}
 * @private
 */
function fromBase64(str) {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the vault module.
 * Runs a tiny warm-up derivation to pre-load hash-wasm's WASM module.
 * Kept for API compatibility — hash-wasm auto-initializes on first call.
 *
 * @param {any} [_initFn] - Ignored (compatibility shim)
 * @returns {Promise<void>}
 */
export async function initSecureVault(_initFn) {
    try {
        await argon2id({
            password: new Uint8Array([0]),
            salt: new Uint8Array(16),
            parallelism: 1,
            iterations: 1,
            memorySize: 256,
            hashLength: 8,
            outputType: 'binary',
        });
    } catch (e) {
        throw new Error('[SecureVault] Argon2id WASM init failed: ' + (e.message || e));
    }
}

// Backward-compatible alias
export const initPQVault = initSecureVault;

// ============================================
// SecureVault Class
// ============================================

export class SecureVault {
    /**
     * @param {object} [options]
     * @param {number} [options.memoryKib=32768]  Argon2id memory in KiB
     * @param {number} [options.iterations=2]     Argon2id time cost
     * @param {number} [options.parallelism=2]    Argon2id parallelism (lanes)
     */
    constructor(options = {}) {
        this.memoryKib = options.memoryKib || DEFAULT_MEMORY_KIB;
        this.iterations = options.iterations || DEFAULT_ITERATIONS;
        this.parallelism = options.parallelism || DEFAULT_PARALLELISM;

        /** @private Cached encryption key (Uint8Array). Zeroed on lock(). */
        this._cachedEncKey = null;
        /** @private Cached salt bytes */
        this._cachedSaltBytes = null;
    }

    // ── Salt ─────────────────────────────────────────

    /**
     * Generate a CSPRNG salt.
     * @param {number} [byteLength=32]
     * @returns {string} Hex-encoded salt
     */
    generateSalt(byteLength = 32) {
        return bytesToHex(randomBytes(byteLength));
    }

    // ── Key derivation (internal, no caching) ────────

    /**
     * Derive the encryption sub-key from PIN + salt.
     * Pipeline: PIN → Argon2id(salt) → HKDF-SHA512(salt, "encrypt") → 256-bit key.
     *
     * This is the internal derivation primitive. It does NOT cache results.
     * Use unlockSession() for caching.
     *
     * @param {string} pin
     * @param {string} salt - Hex-encoded salt
     * @returns {Promise<Uint8Array>} 32-byte encryption key (caller must zeroize)
     * @private
     */
    async _deriveEncKey(pin, salt) {
        const saltBytes = hexToBytes(salt);
        const master = await argon2idDerive(pin, saltBytes, this.memoryKib, this.iterations, this.parallelism);
        const encKey = deriveSubkey(master, PURPOSE_ENCRYPT, saltBytes, 32);
        master.fill(0);
        return encKey;
    }

    // ── Public key derivation (hex API for callers) ──

    /**
     * Derive the encryption key from PIN + salt.
     * @param {string} pin
     * @param {string} salt - Hex-encoded salt
     * @returns {Promise<string>} Hex-encoded 32-byte key
     */
    async deriveKey(pin, salt) {
        const encKey = await this._deriveEncKey(pin, salt);
        const hex = bytesToHex(encKey);
        encKey.fill(0); // Don't cache — this is one-shot
        return hex;
    }

    /**
     * Derive key as ArrayBuffer (Web Crypto compatible).
     * @param {string} pin
     * @param {string} salt
     * @returns {Promise<ArrayBuffer>}
     */
    async deriveKeyAsArrayBuffer(pin, salt) {
        const encKey = await this._deriveEncKey(pin, salt);
        const buf = encKey.buffer.slice(0);
        encKey.fill(0);
        return buf;
    }

    // ── PIN verification ─────────────────────────────

    /**
     * Generate a PIN verification hash.
     * Pipeline: PIN → Argon2id → HKDF("verify", salt) → hex.
     * Domain-separated from encryption key — cannot derive encryption key.
     * Safe to store in plaintext.
     *
     * @param {string} pin
     * @param {string} salt
     * @returns {Promise<string>} Hex-encoded 32-byte verification token
     */
    async generateVerifyHash(pin, salt) {
        const saltBytes = hexToBytes(salt);
        // FIX (v4.4 — P1): Pass this.parallelism — was missing, defaulted to
        // DEFAULT_PARALLELISM which could differ from the instance's configured
        // parallelism, causing verify/seal mismatch on vaults created with p≠default.
        const master = await argon2idDerive(pin, saltBytes, this.memoryKib, this.iterations, this.parallelism);
        const verifyKey = deriveSubkey(master, PURPOSE_VERIFY, saltBytes, 32);
        master.fill(0);
        const hex = bytesToHex(verifyKey);
        verifyKey.fill(0);
        return hex;
    }

    /**
     * Verify a PIN against a stored verification hash.
     * @param {string} pin
     * @param {string} salt
     * @param {string} storedHash - Hex-encoded verification token
     * @returns {Promise<boolean>}
     */
    async verifyPin(pin, salt, storedHash) {
        const computed = await this.generateVerifyHash(pin, salt);
        // Constant-time comparison (hex strings)
        if (computed.length !== storedHash.length) return false;
        let diff = 0;
        for (let i = 0; i < computed.length; i++) {
            diff |= computed.charCodeAt(i) ^ storedHash.charCodeAt(i);
        }
        return diff === 0;
    }

    // ── Low-level encrypt / decrypt (bytes-first) ────

    /**
     * Encrypt bytes with a raw key.
     * @param {Uint8Array} key - 32-byte key
     * @param {Uint8Array} plaintext
     * @param {Uint8Array} [aad]
     * @returns {Uint8Array} nonce ‖ commitment ‖ ciphertext ‖ tag
     * @private
     */
    _encryptBytes(key, plaintext, aad) {
        return chachaEncrypt(key, plaintext, aad);
    }

    /**
     * Decrypt bytes with a raw key.
     * @param {Uint8Array} key
     * @param {Uint8Array} data - nonce ‖ commitment ‖ ciphertext ‖ tag
     * @param {Uint8Array} [aad]
     * @returns {Uint8Array} plaintext
     * @private
     */
    _decryptBytes(key, data, aad) {
        return chachaDecrypt(key, data, aad);
    }

    /**
     * Encrypt a string with a hex-encoded key.
     * @param {string} keyHex - Hex-encoded 32-byte key
     * @param {string} plaintext
     * @param {string} [aad]
     * @returns {string} Base64-encoded ciphertext
     */
    encrypt(keyHex, plaintext, aad) {
        const key = hexToBytes(keyHex);
        const pt = utf8ToBytes(plaintext);
        const aadBytes = aad ? utf8ToBytes(aad) : undefined;
        const ct = this._encryptBytes(key, pt, aadBytes);
        key.fill(0); // FIX (v4.4): Zero key bytes after use
        return toBase64(ct);
    }

    /**
     * Decrypt a base64 ciphertext with a hex-encoded key.
     * @param {string} keyHex
     * @param {string} ciphertextB64
     * @param {string} [aad]
     * @returns {string} Plaintext
     */
    decrypt(keyHex, ciphertextB64, aad) {
        const key = hexToBytes(keyHex);
        const data = fromBase64(ciphertextB64);
        const aadBytes = aad ? utf8ToBytes(aad) : undefined;
        const pt = this._decryptBytes(key, data, aadBytes);
        key.fill(0); // FIX (v4.4): Zero key bytes after use
        return new TextDecoder().decode(pt);
    }

    // ── High-level vault operations ──────────────────

    /**
     * Seal a single secret.
     * @param {string} pin
     * @param {string} salt
     * @param {string} account
     * @param {string} plaintext
     * @returns {Promise<object>} SealedRecord
     */
    async sealSecret(pin, salt, account, plaintext) {
        const encKey = await this._deriveEncKey(pin, salt);
        const pt = utf8ToBytes(plaintext);
        const aadBytes = utf8ToBytes(account);
        const ct = this._encryptBytes(encKey, pt, aadBytes);
        const fingerprint = bytesToHex(blake3(encKey));
        encKey.fill(0);
        return {
            version: VAULT_VERSION,
            ciphertext: toBase64(ct),
            aad_account: account,
            key_fingerprint: fingerprint,
            created_at: Date.now(),
        };
    }

    /**
     * Unseal a single secret.
     * @param {string} pin
     * @param {string} salt
     * @param {object} sealedRecord
     * @returns {Promise<string>} Plaintext
     */
    async unsealSecret(pin, salt, sealedRecord) {
        const encKey = await this._deriveEncKey(pin, salt);
        const data = fromBase64(sealedRecord.ciphertext);
        const aadBytes = utf8ToBytes(sealedRecord.aad_account);
        const pt = this._decryptBytes(encKey, data, aadBytes);
        encKey.fill(0);
        return new TextDecoder().decode(pt);
    }

    /**
     * Seal multiple keys (posting, active, memo, owner).
     * Each key type gets AAD = `account:type`.
     *
     * @param {string} pin
     * @param {string} salt
     * @param {string} account
     * @param {object} keys - { posting: 'WIF', active: 'WIF', ... }
     * @returns {Promise<string>} Sealed JSON blob
     */
    async sealKeys(pin, salt, account, keys) {
        const encKey = await this._deriveEncKey(pin, salt);
        const fingerprint = bytesToHex(blake3(encKey));
        const now = Date.now();
        const sealed = {};

        for (const [type, value] of Object.entries(keys)) {
            const aad = `${account}:${type}`;
            const aadBytes = utf8ToBytes(aad);
            const pt = utf8ToBytes(value);
            const ct = this._encryptBytes(encKey, pt, aadBytes);
            sealed[type] = {
                version: VAULT_VERSION,
                ciphertext: toBase64(ct),
                aad_account: aad,
                key_fingerprint: fingerprint,
                created_at: now,
            };
        }

        encKey.fill(0);
        return JSON.stringify(sealed);
    }

    /**
     * Unseal multiple keys from a sealed JSON blob.
     * @param {string} pin
     * @param {string} salt
     * @param {string} sealedJson
     * @returns {Promise<object>} { posting: 'WIF', active: 'WIF', ... }
     */
    async unsealKeys(pin, salt, sealedJson) {
        const encKey = await this._deriveEncKey(pin, salt);
        const sealed = JSON.parse(sealedJson);
        const result = {};

        for (const [type, record] of Object.entries(sealed)) {
            const data = fromBase64(record.ciphertext);
            const aadBytes = utf8ToBytes(record.aad_account);
            const pt = this._decryptBytes(encKey, data, aadBytes);
            result[type] = new TextDecoder().decode(pt);
        }

        encKey.fill(0);
        return result;
    }

    // ── Byte-level seal/unseal (v4.4) ───────────────

    /**
     * Seal raw key bytes (no WIF string intermediary).
     *
     * Used by v4.4 cold storage: keys are stored as PQ-sealed ciphertext
     * blobs in LacertaDB, never as plaintext WIF strings.
     *
     * @param {string} pin
     * @param {string} salt
     * @param {string} account — AAD binding
     * @param {string} keyType — e.g. 'posting', 'active' (AAD = account:type)
     * @param {Uint8Array} keyBytes — Raw key bytes to seal. ZEROED after sealing.
     * @returns {Promise<object>} Sealed record (version, ciphertext, aad, fingerprint, created_at)
     */
    async sealBytes(pin, salt, account, keyType, keyBytes) {
        const encKey = await this._deriveEncKey(pin, salt);
        const aad = `${account}:${keyType}`;
        const aadBytes = utf8ToBytes(aad);
        const ct = this._encryptBytes(encKey, keyBytes, aadBytes);
        const fingerprint = bytesToHex(blake3(encKey));
        encKey.fill(0);
        keyBytes.fill(0); // Zero the input — caller should not reuse
        return {
            version: VAULT_VERSION,
            ciphertext: toBase64(ct),
            aad_account: aad,
            key_fingerprint: fingerprint,
            created_at: Date.now(),
        };
    }

    /**
     * Unseal raw key bytes from a sealed record.
     *
     * Returns a fresh Uint8Array — caller is responsible for zeroing it
     * after use (or wrapping in YOLOBuffer).
     *
     * @param {string} pin
     * @param {string} salt
     * @param {object} sealedRecord — Output of sealBytes()
     * @returns {Promise<Uint8Array>} Raw key bytes (caller must zero)
     */
    async unsealBytes(pin, salt, sealedRecord) {
        const encKey = await this._deriveEncKey(pin, salt);
        const data = fromBase64(sealedRecord.ciphertext);
        const aadBytes = utf8ToBytes(sealedRecord.aad_account);
        const pt = this._decryptBytes(encKey, data, aadBytes);
        encKey.fill(0);
        return pt; // Uint8Array — caller owns it
    }

    /**
     * Seal multiple keys as raw bytes.
     *
     * @param {string} pin
     * @param {string} salt
     * @param {string} account
     * @param {object} keyMap — { posting: Uint8Array, active: Uint8Array, ... }
     *                          Each Uint8Array is ZEROED after sealing.
     * @returns {Promise<string>} Sealed JSON blob
     */
    async sealKeysBytes(pin, salt, account, keyMap) {
        const encKey = await this._deriveEncKey(pin, salt);
        const fingerprint = bytesToHex(blake3(encKey));
        const now = Date.now();
        const sealed = {};

        for (const [type, keyBytes] of Object.entries(keyMap)) {
            if (!(keyBytes instanceof Uint8Array)) continue;
            const aad = `${account}:${type}`;
            const aadBytes = utf8ToBytes(aad);
            const ct = this._encryptBytes(encKey, keyBytes, aadBytes);
            sealed[type] = {
                version: VAULT_VERSION,
                ciphertext: toBase64(ct),
                aad_account: aad,
                key_fingerprint: fingerprint,
                created_at: now,
            };
            keyBytes.fill(0); // Zero input
        }

        encKey.fill(0);
        return JSON.stringify(sealed);
    }

    /**
     * Unseal multiple keys as raw bytes.
     *
     * @param {string} pin
     * @param {string} salt
     * @param {string} sealedJson
     * @returns {Promise<object>} { posting: Uint8Array, active: Uint8Array, ... }
     *                            Caller must zero each Uint8Array after use.
     */
    async unsealKeysBytes(pin, salt, sealedJson) {
        const encKey = await this._deriveEncKey(pin, salt);
        const sealed = JSON.parse(sealedJson);
        const result = {};

        for (const [type, record] of Object.entries(sealed)) {
            const data = fromBase64(record.ciphertext);
            const aadBytes = utf8ToBytes(record.aad_account);
            result[type] = this._decryptBytes(encKey, data, aadBytes);
        }

        encKey.fill(0);
        return result;
    }

    // ── Session management ───────────────────────────

    /**
     * Derive + cache the encryption key for fast repeated operations.
     * This is the ONLY method that caches. One-shot operations (sealSecret,
     * unsealSecret, etc.) derive and immediately zeroize.
     *
     * @param {string} pin
     * @param {string} salt
     * @returns {Promise<void>}
     */
    async unlockSession(pin, salt) {
        this.lock(); // Wipe any existing cached key
        this._cachedEncKey = await this._deriveEncKey(pin, salt);
        this._cachedSaltBytes = hexToBytes(salt);
    }

    isUnlocked() {
        return this._cachedEncKey !== null;
    }

    /**
     * Encrypt using the cached session key. Avoids re-derivation.
     * @param {string} plaintext
     * @param {string} [aad]
     * @returns {string} Base64-encoded ciphertext
     */
    sessionEncrypt(plaintext, aad) {
        if (!this._cachedEncKey) throw new Error('Vault not unlocked. Call unlockSession() first.');
        const pt = utf8ToBytes(plaintext);
        const aadBytes = aad ? utf8ToBytes(aad) : undefined;
        const ct = this._encryptBytes(this._cachedEncKey, pt, aadBytes);
        return toBase64(ct);
    }

    /**
     * Decrypt using the cached session key.
     * @param {string} ciphertextB64
     * @param {string} [aad]
     * @returns {string} Plaintext
     */
    sessionDecrypt(ciphertextB64, aad) {
        if (!this._cachedEncKey) throw new Error('Vault not unlocked. Call unlockSession() first.');
        const data = fromBase64(ciphertextB64);
        const aadBytes = aad ? utf8ToBytes(aad) : undefined;
        const pt = this._decryptBytes(this._cachedEncKey, data, aadBytes);
        return new TextDecoder().decode(pt);
    }

    /**
     * Zeroize cached key material. Safe to call multiple times.
     */
    lock() {
        if (this._cachedEncKey) {
            this._cachedEncKey.fill(0);
            this._cachedEncKey = null;
        }
        if (this._cachedSaltBytes) {
            this._cachedSaltBytes.fill(0);
            this._cachedSaltBytes = null;
        }
    }

    // ── Utility ──────────────────────────────────────

    /**
     * Return the current Argon2id parameters.
     *
     * IMPORTANT (v4.4 — P2): These MUST be persisted alongside sealed vault
     * metadata. When unsealing on a different device (or after autoTune
     * changes params), the exact same memoryKib/iterations/parallelism
     * are required to derive the correct key.
     *
     * @returns {{ memoryKib: number, iterations: number, parallelism: number, version: number }}
     */
    getParams() {
        return {
            memoryKib: this.memoryKib,
            iterations: this.iterations,
            parallelism: this.parallelism,
            version: VAULT_VERSION,
        };
    }

    getInfo() {
        return {
            version: VAULT_VERSION,
            kdf: 'argon2id',
            cipher: 'chacha20-poly1305 (key-committing)',
            hash: 'blake3',
            domain_sep: 'hkdf-sha-512',
            default_memory_kib: DEFAULT_MEMORY_KIB,
            default_iterations: DEFAULT_ITERATIONS,
            key_size_bits: 256,
            nonce_size_bits: 96,
            tag_size_bits: 128,
            commitment: 'blake3(key ‖ nonce)',
            runtime: 'hash-wasm + @noble/ciphers',
        };
    }

    blake3(data) {
        const bytes = typeof data === 'string' ? utf8ToBytes(data) : data;
        return bytesToHex(blake3(bytes));
    }

    /**
     * Auto-tune Argon2id params for this device.
     *
     * Profiles are memory-first: memory is the strongest lever against GPU
     * attackers because each Argon2id lane needs its own dedicated allocation.
     * A 128 MiB requirement means a GPU with 16 GB VRAM can only run ~120
     * parallel lanes, making brute-force impractical even for short PINs.
     *
     * Walks from heaviest to lightest. First profile that completes within
     * targetMs × 1.5 wins (headroom accounts for benchmark noise vs real-world
     * load during actual login).
     *
     * @param {number} [targetMs=2500] — Target wall-clock time for one derivation
     * @returns {Promise<{ memoryKib, iterations, label, measuredMs }>}
     */
    async autoTuneParams(targetMs = 1000) {
        // FIX (v4.4 — P2): Each profile now includes parallelism so that
        // the benchmark actually tests the same parameters that will be used
        // for sealing. Also persists parallelism via this.parallelism.
        const p = this.parallelism;
        const i = this.iterations;
        const profiles = [
            { memoryKib: 131072, iterations: i, parallelism: p, label: 'ultra' },    // 128 MiB — modern desktop
            { memoryKib: 65536,  iterations: i, parallelism: p, label: 'high' },     //  64 MiB — high-end mobile / modest desktop
            { memoryKib: 32768,  iterations: i, parallelism: p, label: 'standard' }, //  32 MiB — mid-range mobile
            { memoryKib: 19456,  iterations: i, parallelism: p, label: 'low' },      //  19 MiB — OWASP minimum, extra t compensates
        ];

        const testSalt = randomBytes(16);
        // SECURITY (v4.3 — L2): Random benchmark password instead of fixed 'bench1'
        const testPassword = randomBytes(8);

        for (const profile of profiles) {
            try {
                const start = performance.now();
                await argon2idDerive(testPassword, testSalt, profile.memoryKib, profile.iterations, profile.parallelism);
                const elapsed = performance.now() - start;

                if (elapsed <= targetMs * 1.5) {
                    this.memoryKib = profile.memoryKib;
                    this.iterations = profile.iterations;
                    this.parallelism = profile.parallelism;
                    return { ...profile, measuredMs: Math.round(elapsed) };
                }
            } catch (e) {
                // WASM memory allocation can fail on high profiles — step down
                console.warn(`[SecureVault] autoTune: ${profile.label} failed:`, e.message || e);
                continue;
            }
        }

        const fallback = profiles[profiles.length - 1];
        this.memoryKib = fallback.memoryKib;
        this.iterations = fallback.iterations;
        this.parallelism = fallback.parallelism;
        return { ...fallback, measuredMs: -1 };
    }
}

// Backward-compatible alias
export { SecureVault as PQSecureVault };

export default SecureVault;