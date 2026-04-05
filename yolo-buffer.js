/**
 * YOLOBuffer — You Only Look Once.
 *
 * A self-zeroing buffer for sensitive cryptographic key material.
 * Designed to minimize the lifetime of plaintext secrets in memory.
 *
 * Principles:
 *   1. The internal buffer is the ONLY copy — no intermediate strings.
 *   2. On consume (getter `.bytes`), the internal reference is released
 *      and the caller receives ownership. The buffer is then zeroed
 *      internally — the caller's copy is the sole survivor.
 *   3. On `.destroy()`, the buffer is filled with zeros unconditionally.
 *   4. If neither is called, the FinalizationRegistry callback zeros
 *      the buffer when the YOLOBuffer is garbage-collected (best-effort).
 *   5. A YOLOBuffer can only be consumed ONCE. Subsequent reads throw.
 *
 * Usage in the signing path:
 *
 *   // Pattern A: Manual lifecycle
 *   const yolo = await keyManager.requestKeyBuffer(account, 'posting');
 *   const raw  = yolo.bytes;                         // ① internal zeroed
 *   const pk   = PrivateKey.fromBuffer(Buffer.from(raw));
 *   raw.fill(0);                                     // ② caller copy zeroed
 *   pk.key?.fill?.(0);                               // ③ PrivateKey internal
 *
 *   // Pattern B: Scoped (preferred — automatic cleanup)
 *   const result = await YOLOBuffer.use(yolo, async (bytes) => {
 *       const pk = PrivateKey.fromBuffer(Buffer.from(bytes));
 *       return await client.broadcast.vote(op, pk);
 *   });
 *
 * @version 2.0.0
 * @module YOLOBuffer
 */

// ============================================
// YOLOBuffer Class
// ============================================

export class YOLOBuffer {

    // ── Private instance fields ─────────────────────

    /** @type {Uint8Array|null} — the secret bytes (nulled after consume/destroy) */
    #buffer;
    /** @type {boolean} — whether bytes have been consumed or destroyed */
    #consumed;
    /** @type {number} — original byte length (preserved for introspection) */
    #originalLength;

    // ── GC safety net (class-level singleton) ───────

    /** @type {FinalizationRegistry|null} */
    static #registry = typeof FinalizationRegistry !== 'undefined'
        ? new FinalizationRegistry((arrayBuffer) => {
            try {
                if (arrayBuffer?.byteLength > 0) {
                    new Uint8Array(arrayBuffer).fill(0);
                }
            } catch { /* ArrayBuffer may already be detached */ }
        })
        : null;

    // ── Constructor ─────────────────────────────────

    /**
     * Create a YOLOBuffer from raw bytes.
     *
     * IMPORTANT: The input Uint8Array is NOT copied — YOLOBuffer takes
     * ownership. The caller MUST NOT retain or reuse the input array.
     *
     * For string inputs, use the static factories instead:
     *   YOLOBuffer.fromString(wif)
     *   YOLOBuffer.fromHex(hex)
     *
     * @param {Uint8Array} data — Raw key bytes. Ownership is transferred.
     * @throws {TypeError} If data is not a Uint8Array
     * @throws {RangeError} If data is empty
     */
    constructor(data) {
        if (!(data instanceof Uint8Array)) {
            throw new TypeError('YOLOBuffer requires Uint8Array — use .fromString() or .fromHex() for strings');
        }
        if (data.length === 0) {
            throw new RangeError('YOLOBuffer cannot wrap an empty buffer');
        }

        this.#buffer = data;
        this.#consumed = false;
        this.#originalLength = data.length;

        YOLOBuffer.#registry?.register(this, data.buffer, this);
    }

    // ── Static factories ────────────────────────────

    /**
     * Create from a JS string (e.g. WIF key).
     *
     * The source string cannot be zeroed (JS string immutability),
     * but the YOLOBuffer owns a mutable byte copy that CAN be zeroed.
     *
     * @param {string} str — Sensitive string to wrap
     * @returns {YOLOBuffer}
     */
    static fromString(str) {
        if (typeof str !== 'string' || str.length === 0) {
            throw new TypeError('YOLOBuffer.fromString requires a non-empty string');
        }
        return new YOLOBuffer(new TextEncoder().encode(str));
    }

    /**
     * Create from a hex-encoded string.
     *
     * @param {string} hex — Hex-encoded key material (even length)
     * @returns {YOLOBuffer}
     */
    static fromHex(hex) {
        if (typeof hex !== 'string' || hex.length === 0 || hex.length % 2 !== 0) {
            throw new TypeError('YOLOBuffer.fromHex requires a valid even-length hex string');
        }
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i >> 1] = parseInt(hex.substring(i, i + 2), 16);
        }
        return new YOLOBuffer(bytes);
    }

    /**
     * Create filled with cryptographically random bytes.
     *
     * @param {number} length — Number of random bytes
     * @returns {YOLOBuffer}
     */
    static random(length) {
        if (length <= 0) throw new RangeError('Length must be positive');

        const bytes = new Uint8Array(length);
        if (globalThis.crypto?.getRandomValues) {
            globalThis.crypto.getRandomValues(bytes);
        } else {
            const nodeCrypto = require('crypto');
            bytes.set(nodeCrypto.randomBytes(length));
        }
        return new YOLOBuffer(bytes);
    }

    // ── Core API ────────────────────────────────────

    /**
     * Consume the buffer — one-shot read.
     *
     * Returns the internal Uint8Array and surrenders ownership.
     * The caller receives the only live copy and MUST zero it after use.
     *
     * @returns {Uint8Array} Raw key bytes (caller owns this reference)
     * @throws {Error} If already consumed or destroyed
     */
    get bytes() {
        if (this.#consumed) {
            throw new Error('YOLOBuffer: already consumed — key material is gone');
        }

        this.#consumed = true;
        const out = this.#buffer;
        this.#buffer = null;

        YOLOBuffer.#registry?.unregister(this);
        return out;
    }

    /**
     * Explicitly zero and release the buffer without reading it.
     *
     * Use when an operation is aborted or an error occurs before
     * the key is needed. Safe to call multiple times.
     */
    destroy() {
        if (this.#buffer) {
            this.#buffer.fill(0);
            this.#buffer = null;
        }
        this.#consumed = true;
        YOLOBuffer.#registry?.unregister(this);
    }

    // ── Introspection (no key material exposed) ─────

    /** Whether the buffer has been consumed or destroyed. */
    get isConsumed() {
        return this.#consumed;
    }

    /** Whether the buffer still holds live key material. */
    get isLive() {
        return !this.#consumed && this.#buffer !== null;
    }

    /** Original byte length (available even after consumption). */
    get length() {
        return this.#originalLength;
    }

    // ── Serialization guards ────────────────────────

    /** Prevent accidental JSON serialization of key material. */
    toJSON() {
        return { consumed: this.#consumed, length: this.#originalLength };
    }

    /** Prevent accidental string coercion of key material. */
    toString() {
        return `[YOLOBuffer ${this.#consumed ? 'consumed' : 'live'} ${this.#originalLength}B]`;
    }

    /** Prevent key leakage via Node.js console.log / util.inspect. */
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return this.toString();
    }

    // ── Scoped access (static) ──────────────────────

    /**
     * Execute a callback with the raw bytes and guarantee cleanup.
     *
     * This is the preferred usage pattern — it ensures the byte array
     * is zeroed even if the callback throws.
     *
     * @template T
     * @param {YOLOBuffer} yoloBuf — Buffer to consume
     * @param {function(Uint8Array): Promise<T>|T} fn — Callback receiving raw bytes
     * @returns {Promise<T>} Result of the callback
     */
    static async use(yoloBuf, fn) {
        const raw = yoloBuf.bytes;
        try {
            return await fn(raw);
        } finally {
            raw.fill(0);
        }
    }
}

export default YOLOBuffer;
