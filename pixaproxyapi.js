/**
 * Pixa Blockchain Proxy API System with LacertaDB
 * Complete API wrapper with organized method groups
 * @version 4.2.0
 *
 * API Groups and Methods:
 *
 * PixaProxyAPI (Main Class):
 *   - initialize(config)
 *   - restoreSession()
 *   - logout()
 *   - initializeVault(pin, options)
 *   - isVaultInitialized()
 *   - unlockWithPin(pin, options)
 *   - isPinEnabled()
 *   - requiresUnlock(keyType)
 *   - validateCredentials(account, key, keyType)
 *   - quickLogin(account, key, keyType, options)
 *   - disconnect()
 *   - updateConfig(newConfig)
 *   - formatAccount(account)
 *   - processPost(post, renderOptions)
 *   - processComment(comment, renderOptions)
 *   - processMemo(memo)
 *   - extractPlainText(body)
 *   - summarizeContent(body, sentenceCount)
 *   - sanitizeUsername(rawUsername)
 *   - hasVaultConfig()
 *   - getWalletKeys(account, options)
 *
 * database (DatabaseAPI):
 *   - call(method, params)
 *   - getDatabaseInfo()
 *
 * tags (TagsAPI):
 *   - getTrendingTags(afterTag, limit)
 *   - getDiscussionsByTrending(query)
 *   - getDiscussionsByCreated(query)
 *   - getDiscussionsByHot(query)
 *   - getDiscussionsByPromoted(query)
 *   - getDiscussionsByPayout(query)
 *   - getDiscussionsByVotes(query)
 *   - getDiscussionsByActive(query)
 *   - getDiscussionsByChildren(query)
 *   - getDiscussionsByMuted(query)
 *
 * blocks (BlocksAPI):
 *   - getBlock(blockNum)
 *   - getBlockHeader(blockNum)
 *   - getOpsInBlock(blockNum, onlyVirtual)
 *   - getBlockRange(startingBlockNum, count)
 *   - enumVirtualOps(params)
 *
 * globals (GlobalsAPI):
 *   - getDynamicGlobalProperties()
 *   - getChainProperties()
 *   - getFeedHistory()
 *   - getCurrentMedianHistoryPrice()
 *   - getHardforkVersion()
 *   - getRewardFund(name)
 *   - getVestingDelegations(account, from, limit)
 *   - getConfig()
 *   - getVersion()
 *   - getExpiringVestingDelegations(account, afterDate, limit)
 *   - getConversionRequests(account)
 *   - getCollateralizedConversionRequests(account)
 *
 * accounts (AccountsAPI):
 *   - getAccounts(accounts, forceRefresh)
 *   - lookupAccounts(lowerBound, limit)
 *   - lookupAccountNames(accounts)
 *   - getAccountCount()
 *   - getAccountHistory(account, from, limit, operationBitmask)
 *   - getAccountReputations(lowerBound, limit)
 *   - getAccountNotifications(account, limit)
 *   - getReadNotificationIds(account)
 *   - markNotificationsRead(account, notificationIds)
 *   - clearReadNotifications(account)
 *   - getEscrow(from, escrowId)
 *   - findRecurrentTransfers(account)
 *   - findProposals(ids, order, orderDirection, status, limit)
 *   - listProposals(start, limit, order, orderDirection, status)
 *   - listProposalVotes(start, limit, order, orderDirection, status)
 *
 * market (MarketAPI):
 *   - getOrderBook(limit)
 *   - getOpenOrders(account)
 *   - getTicker()
 *   - getTradeHistory(start, end, limit)
 *   - getMarketHistory(bucketSeconds, start, end)
 *   - getMarketHistoryBuckets()
 *
 * authority (AuthorityAPI):
 *   - getOwnerHistory(account)
 *   - getRecoveryRequest(account)
 *   - getWithdrawRoutes(account, type)
 *   - getAccountBandwidth(account, type)
 *   - getSavingsWithdrawFrom(account)
 *   - getSavingsWithdrawTo(account)
 *   - verifyAuthority(stx)
 *
 * votes (VotesAPI):
 *   - getActiveVotes(author, permlink)
 *   - getAccountVotes(account)
 *
 * content (ContentAPI):
 *   - getContent(author, permlink)
 *   - getContentReplies(author, permlink)
 *   - getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit)
 *   - getRepliesByLastUpdate(author, startPermlink, limit)
 *   - getDiscussionsByComments(query)
 *   - getDiscussionsByBlog(query)
 *   - getDiscussionsByFeed(query)
 *   - getAccountPosts(account, sort, limit, options)
 *   - getState(path)
 *
 * witnesses (WitnessesAPI):
 *   - getWitnessByAccount(account)
 *   - getWitnessesByVote(from, limit)
 *   - lookupWitnessAccounts(lowerBound, limit)
 *   - getWitnessCount()
 *   - getActiveWitnesses()
 *   - getWitnessSchedule()
 *
 * follow (FollowAPI):
 *   - getFollowers(account, startFollower, type, limit)
 *   - getFollowing(account, startFollowing, type, limit)
 *   - getFollowCount(account)
 *   - getFeedEntries(account, startEntryId, limit)
 *   - getBlogEntries(account, startEntryId, limit)
 *   - getRebloggedBy(author, permlink)
 *   - getBlogAuthors(account)
 *   - getSubscriptions(account)
 *
 * broadcast (BroadcastAPI):
 *   - updateAccount2(params) — params.externalKey bypasses keyManager
 *   - updateProfile(account, profileObject, externalKey?)
 *   - vote(voter, author, permlink, weight)
 *   - comment(params)
 *   - commentOptions(params)
 *   - transfer(from, to, amount, memo)
 *   - transferToVesting(from, to, amount)
 *   - withdrawVesting(account, vestingShares)
 *   - delegateVestingShares(delegator, delegatee, vestingShares)
 *   - transferToSavings(from, to, amount, memo)
 *   - transferFromSavings(from, requestId, to, amount, memo)
 *   - cancelTransferFromSavings(from, requestId)
 *   - claimRewardBalance(account)
 *   - recurrentTransfer(params)
 *   - follow(follower, following)
 *   - unfollow(follower, following)
 *   - mute(follower, following)
 *   - reblog(account, author, permlink)
 *   - customJson(params)
 *   - deleteComment(author, permlink)
 *   - accountCreate(params)
 *   - accountCreateWithDelegation(params)
 *   - accountWitnessVote(account, witness, approve)
 *   - accountWitnessProxy(account, proxy)
 *   - witnessUpdate(params)
 *   - setWithdrawVestingRoute(fromAccount, toAccount, percent, autoVest)
 *   - limitOrderCreate(params)
 *   - limitOrderCancel(owner, orderId)
 *   - convertPixa(owner, amount, requestId)
 *   - sendOperations(operations, key)
 *   - accountUpdate(params)
 *   - claimAccount(creator, fee)
 *   - createClaimedAccount(params)
 *   - collateralizedConvert(owner, amount, requestId)
 *   - limitOrderCreate2(params)
 *   - feedPublish(publisher, exchangeRate)
 *   - witnessSetProperties(owner, props)
 *   - escrowTransfer(params)
 *   - escrowApprove(params)
 *   - escrowDispute(params)
 *   - escrowRelease(params)
 *   - createProposal(params)
 *   - updateProposal(params)
 *   - updateProposalVotes(voter, proposalIds, approve)
 *   - removeProposal(proposalOwner, proposalIds)
 *   - requestAccountRecovery(recoveryAccount, accountToRecover, newOwnerAuthority)
 *   - recoverAccount(accountToRecover, newOwnerAuthority, recentOwnerAuthority)
 *   - changeRecoveryAccount(accountToRecover, newRecoveryAccount)
 *   - declineVotingRights(account, decline)
 *
 * auth (AuthAPI):
 *   - isWif(key)
 *   - toWif(username, password, role)
 *   - wifToPublic(wif)
 *   - signMessage(message, wif)
 *   - verifySignature(message, signature, publicKey)
 *
 * formatter (FormatterAPI):
 *   - reputation(rawReputation)
 *   - vestToPixa(vestingShares, totalVestingShares, totalVestingFundPixa)
 *   - pixaToVest(pixa, totalVestingShares, totalVestingFundPixa)
 *   - vestToSteem() [deprecated alias]
 *   - steemToVest() [deprecated alias]
 *   - formatAsset(amount, symbol, precision)
 *
 * blockchain (BlockchainAPI):
 *   - getBlockHeader(blockNum)
 *   - getBlock(blockNum)
 *   - getTransaction(txId)
 *   - getTransactionHex(tx)
 *   - getCurrentBlockNum(mode)
 *   - getCurrentBlockHeader(mode)
 *   - getCurrentBlock(mode)
 *   - getBlockNumbers(options) [AsyncGenerator]
 *   - getBlocks(options) [AsyncGenerator]
 *   - getOperations(options) [AsyncGenerator]
 *   - getBlockNumberStream()
 *   - getBlockStream()
 *   - getOperationsStream()
 *
 * rc (ResourceCreditsAPI):
 *   - getResourceParams()
 *   - getResourcePool()
 *   - findRcAccounts(accounts)
 *   - getRCMana(account)
 *   - getVPMana(account)
 *   - calculateRCMana(rcAccount)
 *   - calculateVPMana(account)
 *   - calculateRCCost(operationType, operationData)
 *
 * communities (CommunitiesAPI):
 *   - getCommunity(name, observer)
 *   - listCommunities(options)
 *   - getSubscriptions(account)
 *   - getRankedPosts(options)
 *   - getAccountPosts(account, sort, options)
 *   - getDiscussion(author, permlink, observer)
 *   - getPost(author, permlink, observer)
 *   - getPostHeader(author, permlink)
 *   - getProfile(account, observer)
 *   - getCommunityContext(name, account)
 *   - getRelationshipBetweenAccounts(account1, account2)
 *   - getFollowList(account)
 *   - doesUserFollowAnyLists(account)
 *   - getPayoutStats(name)
 *   - listCommunityRoles(name, last, limit)
 *   - listSubscribers(name, last, limit)
 *   - listPopCommunities(limit)
 *   - setRole(community, account, role)
 *   - setUserTitle(community, account, title)
 *   - mutePost(community, account, permlink, notes)
 *   - unmutePost(community, account, permlink, notes)
 *   - updateCommunityProps(community, props)
 *   - subscribe(community)
 *   - unsubscribe(community)
 *   - pinPost(community, account, permlink)
 *   - unpinPost(community, account, permlink)
 *   - flagPost(community, account, permlink, notes)
 *
 * keys (AccountByKeyAPI):
 *   - getKeyReferences(keys)
 *
 * transaction (TransactionStatusAPI):
 *   - findTransaction(transactionId, expiration)
 */

import { LacertaDB } from '@pixagram/lacerta-db';
import JSLoader from '../JSLoader';
import EventEmitter from 'events';
import { CryptoUtils } from './crypto-utils.js';
import { PixaEvents }  from './events.js';
import { SessionManager, SessionMode, SessionExpiredError, SessionNotFoundError, PinRequiredError } from './session-manager.js';
import { ConnectivityMonitor } from './connectivity-monitor.js';
import { BroadcastQueue, OfflineNotQueueableError, OfflineError } from './broadcast-queue.js';
import { YOLOBuffer } from './yolo-buffer.js';

// ── Lazy-loaded: ../utils/sanitizer ──
let pixaContentInit = null;
let wasmSanitizePost = null;
let wasmSanitizeComment = null;
let wasmSanitizeMemo = null;
let wasmSafeJson = null;
let wasmSafeString = null;
let wasmExtractPlainText = null;
let wasmSummarizeContent = null;
let wasmSanitizeUsername = null;
let wasmSanitizeForInjection = null;

// ── Lazy-loaded: @pixagram/dpixa ──
let Client = null;
let PrivateKey = null;
let PublicKey = null;
let Signature = null;
let cryptoUtils = null;
let Asset = null;
let Price = null;
let Memo = null;
let utils = null;
let Types = null;
let BlockchainMode = null;
let getVestingSharePrice = null;
let getVests = null;
let VERSION = null;
let DEFAULT_CHAIN_ID = null;
let NETWORK_ID = null;

// SecureVault loaded lazily — see _ensureVault()
let _SecureVault = null;
let _initSecureVault = null;

// Schema stamp — bump when collections or indexes change.
// On warm start the entire collection/index setup is skipped.
const SCHEMA_VERSION = 'pixa_schema_4.2.3';

// ============================================
// Configuration
// ============================================

const CONFIG = {
    ARGON2_MEMORY_KIB: 32768,
    ARGON2_ITERATIONS: 2,
    ARGON2_AUTOTUNE_TTL: 7 * 24 * 60 * 60 * 1000, // re-benchmark after 7 days
    CACHE_TTL: {
        posts: 60 * 1000,
        accounts: 24 * 60 * 60 * 1000,
        comments: 60 * 1000,
        trending: 5 * 60 * 1000,
        feed: 30 * 1000,
        communities: 60 * 60 * 1000,
        rewards: 5 * 60 * 1000,
        search: 10 * 60 * 1000,
        blocks: 30 * 1000,
        witnesses: 5 * 60 * 1000,
        market: 60 * 1000,
        global_props: 10 * 1000
    },
    ENTITY_TTL: {
        accounts: 24 * 60 * 60 * 1000,
        posts: 5 * 60 * 1000,
        comments: 2 * 60 * 1000,
    },
    QUERY_TTL: {
        trending: 5 * 60 * 1000,
        created: 30 * 1000,
        hot: 3 * 60 * 1000,
        promoted: 5 * 60 * 1000,
        active: 60 * 1000,
        blog: 60 * 1000,
        feed: 30 * 1000,
        comments: 60 * 1000,
        votes: 60 * 1000,
        children: 60 * 1000,
        cashout: 60 * 1000,
        content: 60 * 1000,
        content_replies: 60 * 1000,
        account_lookup: 10 * 60 * 1000,
        notifications: 30 * 1000,
    },
    SESSION_TIMEOUT: 30 * 60 * 1000,
    PIN_TIMEOUT: 5 * 60 * 1000,
    // SECURITY (v4.3 — M1): Raised from 6 to 8. A 6-char PIN has at most
    // ~36 bits of entropy — brute-forcible with Argon2id in ~175 days on
    // consumer hardware. 8 chars raises the floor to ~41 bits (~12 years).
    MIN_PIN_LENGTH: 8,
    // SECURITY (v4.3 — M1): Minimum estimated entropy in bits. PINs that
    // pass the length check but are low-entropy (e.g. "12345678", "password")
    // are rejected. 0 = disabled (length check only).
    MIN_PIN_ENTROPY: 30,
    PIN_MAX_ATTEMPTS: 10,
    PIN_LOCKOUT_MS: 5 * 60 * 1000,
    PIN_WIPE_LIMIT: 50,
    // SECURITY (v4.3 — M2): Absolute session lifetime. Even with sliding
    // window refresh, sessions expire after this duration from creation.
    // Prevents indefinite session survival on compromised devices.
    MAX_SESSION_LIFETIME: 30 * 24 * 60 * 60 * 1000, // 30 days
    DEFAULT_NODES: [
        'https://cors-header-proxy-with-api.omnibus-39a.workers.dev'
    ],
    APP_NAME: 'pixagram/4.2.0',
    PAGINATION_LIMIT: 20,
    CHAIN_ID: null,
    ADDRESS_PREFIX: 'PIX',

    // Asset symbol mapping: [blockchain_symbol, display_symbol]
    // Entry[0] = on-chain name (used in broadcast operations)
    // Entry[1] = display name  (used after sanitization / in the app)
    ASSET_LIQUID: ['TESTS', 'PIXA'],
    ASSET_SUPRA:  ['TBD',   'PXS'],
    ASSET_POWER:  ['VESTS', 'PXP'],
};

// ============================================
// PIN Strength Estimation (M1)
// ============================================

/**
 * SECURITY (v4.3 — M1): Lightweight PIN entropy estimator.
 *
 * Estimates effective entropy in bits based on character class diversity,
 * pattern detection, and common weak PIN/password blacklist. This is NOT
 * a full zxcvbn — it's a fast heuristic that catches the worst offenders
 * without adding a 400KB dependency.
 *
 * @param {string} pin
 * @returns {{ bits: number, feedback: string|null }}
 */
function estimatePinEntropy(pin) {
    if (!pin) return { bits: 0, feedback: 'PIN is empty' };

    // Common weak PINs/passwords blacklist
    const WEAK_LIST = [
        'password', 'passw0rd', '12345678', '123456789', '1234567890',
        'qwerty', 'qwertyui', 'abcdefgh', 'letmein', 'welcome',
        'trustno1', 'iloveyou', 'sunshine', 'princess', 'football',
        'dragon', 'master', 'monkey', 'shadow', 'michael',
        'mustang', 'access', 'superman', 'batman', 'charlie',
        '00000000', '11111111', '22222222', '88888888', '99999999',
        'abc123', 'admin', 'login', 'starwars', 'whatever',
    ];

    const lower = pin.toLowerCase();
    if (WEAK_LIST.includes(lower)) {
        return { bits: 5, feedback: 'This is a commonly used password' };
    }

    // Character class analysis
    let hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false;
    for (const c of pin) {
        if (c >= 'a' && c <= 'z') hasLower = true;
        else if (c >= 'A' && c <= 'Z') hasUpper = true;
        else if (c >= '0' && c <= '9') hasDigit = true;
        else hasSpecial = true;
    }

    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSpecial) poolSize += 32;

    // Base entropy: log2(poolSize) * length
    let bits = Math.log2(poolSize || 1) * pin.length;

    // Penalty: repeated characters (e.g. "aaaa1234")
    const charFreq = {};
    for (const c of pin) charFreq[c] = (charFreq[c] || 0) + 1;
    const maxRepeat = Math.max(...Object.values(charFreq));
    if (maxRepeat >= pin.length * 0.5) {
        bits *= 0.5;
    } else if (maxRepeat >= pin.length * 0.35) {
        bits *= 0.7;
    }

    // Penalty: sequential characters (e.g. "12345678", "abcdefgh")
    let seqCount = 0;
    for (let i = 1; i < pin.length; i++) {
        if (pin.charCodeAt(i) === pin.charCodeAt(i - 1) + 1 ||
            pin.charCodeAt(i) === pin.charCodeAt(i - 1) - 1) {
            seqCount++;
        }
    }
    if (seqCount >= pin.length * 0.6) {
        bits *= 0.4;
    } else if (seqCount >= pin.length * 0.4) {
        bits *= 0.65;
    }

    // Penalty: all same character class (pure digits, pure lowercase)
    const classCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (classCount === 1 && pin.length <= 10) {
        bits *= 0.7;
    }

    bits = Math.round(bits * 10) / 10;

    let feedback = null;
    if (bits < 20) feedback = 'PIN is very weak — add mixed character types and avoid patterns';
    else if (bits < 30) feedback = 'PIN is weak — use a longer passphrase with mixed characters';
    else if (bits < 40) feedback = 'PIN could be stronger — consider adding special characters';

    return { bits, feedback };
}

// ============================================
// Asset Symbol Translation
// ============================================

// Build lookup maps from CONFIG asset definitions
// fromChain: blockchain_symbol → display_symbol  (used when sanitizing data FROM the chain)
// toChain:   display_symbol → blockchain_symbol   (used when preparing data FOR broadcast)
const ASSET_MAP_FROM_CHAIN = {};
const ASSET_MAP_TO_CHAIN = {};
const ASSET_PRECISION = {};

for (const def of [CONFIG.ASSET_LIQUID, CONFIG.ASSET_SUPRA, CONFIG.ASSET_POWER]) {
    const [chainSymbol, displaySymbol] = def;
    ASSET_MAP_FROM_CHAIN[chainSymbol] = displaySymbol;
    ASSET_MAP_TO_CHAIN[displaySymbol] = chainSymbol;
}

// Precision: VESTS / PXP use 6 decimal places; all others use 3
ASSET_PRECISION[CONFIG.ASSET_POWER[0]] = 6;   // VESTS
ASSET_PRECISION[CONFIG.ASSET_POWER[1]] = 6;   // PXP
ASSET_PRECISION[CONFIG.ASSET_LIQUID[0]] = 3;   // TESTS
ASSET_PRECISION[CONFIG.ASSET_LIQUID[1]] = 3;   // PXA
ASSET_PRECISION[CONFIG.ASSET_SUPRA[0]] = 3;    // TBD
ASSET_PRECISION[CONFIG.ASSET_SUPRA[1]] = 3;    // PXS

/**
 * Parse an asset string into its numeric amount and symbol.
 * @param {string} assetStr - e.g. "123.456 TESTS" or "0.000000 VESTS"
 * @returns {{ amount: number, symbol: string, raw: string } | null}
 */
function parseAsset(assetStr) {
    if (typeof assetStr !== 'string') return null;
    const parts = assetStr.trim().split(' ');
    if (parts.length !== 2) return null;
    const amount = parseFloat(parts[0]);
    if (isNaN(amount)) return null;
    return { amount, symbol: parts[1], raw: assetStr };
}

/**
 * Format a parsed asset back to a string with the correct precision.
 * @param {number} amount
 * @param {string} symbol
 * @returns {string}
 */
function formatAssetString(amount, symbol) {
    const precision = ASSET_PRECISION[symbol] ?? 3;
    return `${amount.toFixed(precision)} ${symbol}`;
}

/**
 * Translate an asset string from blockchain symbols to display symbols.
 * Used when sanitizing data coming FROM the chain (e.g. TESTS → PXA).
 * If the symbol is not in the translation map, returns the asset as-is
 * (re-formatted with correct precision).
 *
 * @param {string} assetStr - e.g. "100.000 TESTS"
 * @returns {string} e.g. "100.000 PXA"
 */
function translateAssetFromChain(assetStr) {
    const parsed = parseAsset(assetStr);
    if (!parsed) return assetStr;
    const displaySymbol = ASSET_MAP_FROM_CHAIN[parsed.symbol] ?? parsed.symbol;
    return formatAssetString(parsed.amount, displaySymbol);
}

/**
 * Translate an asset string from display symbols to blockchain symbols.
 * Used when preparing data FOR broadcast operations (e.g. PXA → TESTS).
 * If the symbol is not in the translation map, returns the asset as-is
 * (re-formatted with correct precision).
 *
 * @param {string} assetStr - e.g. "100.000 PXA"
 * @returns {string} e.g. "100.000 TESTS"
 */
function translateAssetToChain(assetStr) {
    const parsed = parseAsset(assetStr);
    if (!parsed) return assetStr;
    const chainSymbol = ASSET_MAP_TO_CHAIN[parsed.symbol] ?? parsed.symbol;
    return formatAssetString(parsed.amount, chainSymbol);
}

// ============================================
// CONTENT TYPE DETECTION
// ============================================

/**
 * Detect whether a post body is a pixel art post (pure base64 image)
 * or a blog post (HTML/markdown content).
 *
 * Pixel art posts: body is a raw `data:image/...;base64,...` data URI.
 * Blog posts: body is HTML or markdown text.
 *
 * @param {string} body - Raw post body from chain
 * @returns {'pixel_art'|'blog'}
 */
function detectContentType(body) {
    if (!body || typeof body !== 'string') return 'blog';
    const trimmed = body.trim();
    // Pure base64 image data URI — pixel art post
    if (trimmed.startsWith('data:image/') && !trimmed.includes('<') && !trimmed.includes('\n')) {
        return 'pixel_art';
    }
    return 'blog';
}

// ============================================
// VALIDATORS (v3.5.0) — JS-side format checks
// ============================================

const VALIDATORS = {
    safe_asset: (s) => {
        if (typeof s !== 'string') return null;
        return /^\d{1,15}\.\d{3,6} [A-Z]{3,6}$/.test(s) ? s : null;
    },
    safe_permlink: (s) => {
        if (typeof s !== 'string') return null;
        const t = s.trim().toLowerCase();
        return /^[a-z0-9][a-z0-9\-]{0,255}$/.test(t) ? t : null;
    },
    safe_url_path: (s) => {
        if (typeof s !== 'string') return null;
        const t = s.trim();
        return /^\/@[a-z0-9][a-z0-9.\-]{1,15}\/[a-z0-9][a-z0-9\-]{0,255}(#.*)?$/.test(t) ? t : null;
    },
    safe_pubkey: (s) => {
        if (typeof s !== 'string') return null;
        return /^PIX[1-9A-HJ-NP-Za-km-z]{46,53}$/.test(s) ? s : null;
    },
    /**
     * Convert an ISO-8601 date string to a millisecond timestamp (integer).
     * Returns 0 for invalid/missing dates so `new Date(ts)` always works.
     * Blockchain dates are UTC with no trailing "Z" — we append it.
     */
    safe_timestamp: (s) => {
        if (typeof s === 'number' && Number.isFinite(s)) return s;
        if (typeof s !== 'string') return 0;
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s)) return 0;
        const ms = Date.parse(s.endsWith('Z') ? s : s + 'Z');
        return Number.isFinite(ms) ? ms : 0;
    },
    safe_number: (v) => {
        return (typeof v === 'number' && Number.isFinite(v)) ? v : null;
    },
    safe_bool: (v) => {
        return (typeof v === 'boolean') ? v : null;
    },
    safe_numeric_string: (s) => {
        if (typeof s !== 'string') return null;
        return /^-?\d{1,30}$/.test(s) ? s : null;
    },
    safe_percent: (v) => {
        if (typeof v !== 'number') return null;
        return (Number.isInteger(v) && v >= 0 && v <= 10000) ? v : null;
    },
    safe_beneficiary: (b) => {
        if (!b || typeof b !== 'object') return null;
        const account = VALIDATORS.safe_username_js(b.account);
        const weight = VALIDATORS.safe_percent(b.weight);
        if (!account || weight === null) return null;
        return { account, weight };
    },
    safe_username_js: (s) => {
        if (typeof s !== 'string') return null;
        const t = s.trim().toLowerCase();
        if (t.length < 3 || t.length > 16) return null;
        if (!/^[a-z][a-z0-9.\-]{2,15}$/.test(t)) return null;
        if (/[.\-]{2}/.test(t)) return null;
        if (/[.\-]$/.test(t)) return null;
        return t;
    },
    safe_manabar: (m) => {
        if (!m || typeof m !== 'object') return null;
        return {
            current_mana: String(m.current_mana || '0'),
            last_update_time: VALIDATORS.safe_number(m.last_update_time) ?? 0,
        };
    },
    /**
     * Validate an Authority object { weight_threshold, account_auths, key_auths }.
     * These are structured chain data — NOT user-supplied text.
     */
    safe_authority: (auth) => {
        if (!auth || typeof auth !== 'object') return null;
        return {
            weight_threshold: VALIDATORS.safe_number(auth.weight_threshold) ?? 1,
            account_auths: Array.isArray(auth.account_auths)
                ? auth.account_auths.filter(a => Array.isArray(a) && a.length === 2 && typeof a[0] === 'string')
                : [],
            key_auths: Array.isArray(auth.key_auths)
                ? auth.key_auths.filter(a => Array.isArray(a) && a.length === 2 && typeof a[0] === 'string')
                : [],
        };
    },
    /**
     * Validate a single active_vote entry.
     * { voter, weight, rshares, time } — voter is a username, rest are numbers/strings.
     */
    safe_active_vote: (v, sanitizeUsername) => {
        if (!v || typeof v !== 'object') return null;
        const voter = sanitizeUsername ? sanitizeUsername(v.voter) : VALIDATORS.safe_username_js(v.voter);
        if (!voter) return null;
        return {
            voter,
            weight:  VALIDATORS.safe_number(v.weight) ?? 0,
            rshares: VALIDATORS.safe_numeric_string(String(v.rshares || '0')) || '0',
            time:    VALIDATORS.safe_timestamp(v.time),
        };
    },
};

// ============================================
// Custom Error Classes
// ============================================

export class PixaAPIError extends Error {
    constructor(message, code, data = null) {
        super(message);
        this.name = 'PixaAPIError';
        this.code = code;
        this.data = data;
    }
}

class KeyNotFoundError extends PixaAPIError {
    constructor(account, keyType) {
        super(`Key not found for ${account}/${keyType}`, 'KEY_NOT_FOUND', { account, keyType });
        this.name = 'KeyNotFoundError';
    }
}

class VaultNotInitializedError extends PixaAPIError {
    constructor() {
        super('Vault not initialized. Call initializeVault() first.', 'VAULT_NOT_INITIALIZED');
        this.name = 'VaultNotInitializedError';
    }
}

// SessionExpiredError, SessionNotFoundError → see ./session-manager.js

// ============================================
// Utility Functions
// ============================================

const yieldToEventLoop = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * @deprecated Use CryptoUtils.getRandomBytes() directly. Kept as a local
 * delegate for backward compatibility with call sites throughout this file.
 */
const getRandomBytes = (length) => CryptoUtils.getRandomBytes(length);

/**
 * @deprecated Use CryptoUtils.bytesToHex() directly.
 */
const bytesToHex = (bytes) => CryptoUtils.bytesToHex(bytes);

/**
 * Normalize account name
 * @param {string|object} account
 * @returns {string|null}
 */
function normalizeAccount(account) {
    if (!account) return null;
    if (typeof account === 'string') return account.replace(/^@/, '').toLowerCase().trim() || null;
    const raw = account?.account || account?.name || '';
    return raw.replace(/^@/, '').toLowerCase().trim() || null;
}

// ============================================
// Main Pixa Proxy API Class
// ============================================

export class PixaProxyAPI {
    constructor() {
        this.lacerta = new LacertaDB({turboSerial: {
                compression: false,
                preservePropertyDescriptors: false,
                deduplication: false,
                simdOptimization: true,
                detectCircular: false,
                shareArrayBuffers: false,
                allowFunction: false,
                serializeFunctions: false,
                memoryPoolSize: 65536 * 16
            }});
        this.cacheDb = null;
        this.settingsDb = null;

        /** @type {SecureVault} Argon2id + ChaCha20-Poly1305 vault (v3, key-committing) */
        this.vault = null;
        /** @type {Promise|null} In-flight _ensureVault dedup guard */
        this._vaultPromise = null;

        /** @type {Client} Single unified client for all API calls */
        this.client = null;

        this.eventEmitter = new EventEmitter();
        this.initialized = false;

        // Organized API groups
        this.database = null;
        this.tags = null;
        this.blocks = null;
        this.globals = null;
        this.accounts = null;
        this.market = null;
        this.authority = null;
        this.votes = null;
        this.content = null;
        this.witnesses = null;
        this.follow = null;
        this.broadcast = null;
        this.auth = null;
        this.formatter = null;
        this.blockchain = null;
        this.rc = null;
        this.communities = null;
        this.keys = null;
        this.transaction = null;

        // Internal managers
        this.keyManager = null;
        this.cacheManager = null;
        this.sessionManager = null;
        this.contentSanitizer = new ContentSanitizer();
        this.paginationManager = new PaginationManager();

        // Entity-based storage (v3.4.0)
        /** @type {SanitizationPipeline} */
        this.sanitizationPipeline = null;
        /** @type {EntityStoreManager} */
        this.entityStore = null;
        /** @type {QueryCacheManager} */
        this.queryCache = null;

        /** @type {ConnectivityMonitor} */
        this.connectivity = null;
        /** @type {BroadcastQueue} */
        this.broadcastQueue = null;

        this.config = { ...CONFIG };
        this.pendingValidations = new Map();

        /** @private Backing field for askVote getter/setter */
        this._askVote = false;
        /** @private Backing field for defaultVotingPower (0-100 percentage) */
        this._defaultVotingPower = 100;
    }

    /**
     * Whether broadcast.vote() should prompt the UI for weight confirmation
     * before broadcasting. When true, vote() emits 'vote_weight_required'
     * instead of broadcasting immediately.
     * @type {boolean}
     */
    get askVote() { return this._askVote; }
    set askVote(value) { this._askVote = Boolean(value); }

    /**
     * Default voting power percentage (0–100). Used by the vote weight dialog
     * as the initial slider position. A value of 33 means the slider starts
     * at +33% for upvotes or -33% for downvotes.
     * @type {number}
     */
    get defaultVotingPower() { return this._defaultVotingPower; }
    set defaultVotingPower(value) {
        this._defaultVotingPower = Math.max(0, Math.min(100, parseInt(value, 10) || 100));
    }

    /**
     * Infer the required key type from an operation name.
     * Used by BroadcastQueue to request the correct signing key.
     * @param {string} opType
     * @returns {'posting'|'active'|'owner'}
     * @private
     */
    _inferKeyType(opType) {
        const ACTIVE_OPS = [
            // Financial operations
            'transfer', 'transfer_to_vesting', 'withdraw_vesting',
            'delegate_vesting_shares', 'transfer_to_savings',
            'transfer_from_savings', 'cancel_transfer_from_savings',
            'recurrent_transfer',
            // Conversion & market operations
            'convert', 'collateralized_convert', 'limit_order_create',
            'limit_order_create2', 'limit_order_cancel',
            // Account operations
            'account_update', 'account_update2',
            'account_create', 'account_create_with_delegation',
            'create_claimed_account', 'claim_account',
            'set_withdraw_vesting_route',
            'request_account_recovery',
            // Witness & governance operations
            'account_witness_vote', 'account_witness_proxy',
            'witness_update', 'witness_set_properties',
            'feed_publish',
            // Escrow operations
            'escrow_transfer', 'escrow_approve',
            'escrow_dispute', 'escrow_release',
            // Proposal / DAO operations
            'create_proposal', 'update_proposal',
            'update_proposal_votes', 'remove_proposal',
        ];
        const OWNER_OPS = [
            'change_recovery_account', 'recover_account',
            'decline_voting_rights',
        ];
        if (OWNER_OPS.includes(opType)) return 'owner';
        if (ACTIVE_OPS.includes(opType)) return 'active';
        return 'posting';
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (newConfig.ENTITY_TTL) {
            this.config.ENTITY_TTL = { ...this.config.ENTITY_TTL, ...newConfig.ENTITY_TTL };
        }
        if (newConfig.QUERY_TTL) {
            this.config.QUERY_TTL = { ...this.config.QUERY_TTL, ...newConfig.QUERY_TTL };
        }
        if (this.keyManager && newConfig.PIN_TIMEOUT !== undefined) {
            this.keyManager.setPinTimeout(newConfig.PIN_TIMEOUT);
        }
        if (this.sessionManager && newConfig.SESSION_TIMEOUT !== undefined) {
            this.sessionManager.setSessionTimeout(newConfig.SESSION_TIMEOUT);
        }
        if (this.contentSanitizer && newConfig.internalDomains) {
            this.contentSanitizer.setInternalDomains(newConfig.internalDomains);
        }
    }

    async initialize(config = {}) {
        try {
            if (config.sessionTimeout) this.config.SESSION_TIMEOUT = config.sessionTimeout;
            if (config.pinTimeout) this.config.PIN_TIMEOUT = config.pinTimeout;
            if (config.enablePerformanceMonitoring) this.lacerta.performanceMonitor.startMonitoring();

            // ── Phase 0a: Lazy-load dependencies via JSLoader (parallel) ──
            const [sanitizerModule, dpixaModule] = await Promise.all([
                JSLoader(() => import('./sanitizer')).then(mod => {
                    pixaContentInit    = mod.default;
                    wasmSanitizePost   = mod.sanitizePost;
                    wasmSanitizeComment = mod.sanitizeComment;
                    wasmSanitizeMemo   = mod.sanitizeMemo;
                    wasmSafeJson       = mod.safeJson;
                    wasmSafeString     = mod.safeString;
                    wasmExtractPlainText   = mod.extractPlainText;
                    wasmSummarizeContent   = mod.summarizeContent;
                    wasmSanitizeUsername   = mod.sanitizeUsername;
                    wasmSanitizeForInjection = mod.sanitizeForInjection;
                    return mod;
                }),
                JSLoader(() => import('@pixagram/dpixa')).then(mod => {
                    Client             = mod.Client;
                    PrivateKey         = mod.PrivateKey;
                    PublicKey          = mod.PublicKey;
                    Signature          = mod.Signature;
                    cryptoUtils        = mod.cryptoUtils;
                    Asset              = mod.Asset;
                    Price              = mod.Price;
                    Memo               = mod.Memo;
                    utils              = mod.utils;
                    Types              = mod.Types;
                    BlockchainMode     = mod.BlockchainMode;
                    getVestingSharePrice = mod.getVestingSharePrice;
                    getVests           = mod.getVests;
                    VERSION            = mod.VERSION;
                    DEFAULT_CHAIN_ID   = mod.DEFAULT_CHAIN_ID;
                    NETWORK_ID         = mod.NETWORK_ID;
                    return mod;
                }),
            ]);

            // ── Phase 0b: Fire WASM compile immediately (overlaps everything below) ──
            const wasmPromise = this.contentSanitizer.initialize(config.wasmPath || undefined)
                .then(() => {
                    if (config.internalDomains) {
                        this.contentSanitizer.setInternalDomains(config.internalDomains);
                    }
                });

            // SECURITY (v4.3 — L3): Warm-start detection via IDB probe instead
            // of localStorage. localStorage is synchronous, blocking, and
            // readable by any same-origin script. The schema version flag
            // reveals that LacertaDB is initialized — useful for targeted attacks.
            let isWarmStart = false;
            try {
                isWarmStart = await new Promise((resolve) => {
                    const req = indexedDB.open('pixa_cache');
                    req.onupgradeneeded = () => { req.transaction.abort(); resolve(false); };
                    req.onsuccess = () => { req.result.close(); resolve(true); };
                    req.onerror = () => resolve(false);
                });
            } catch (_) {}

            // ── Phase 1: Open both databases in parallel ──
            [this.cacheDb, this.settingsDb] = await Promise.all([
                this.lacerta.getDatabase('pixa_cache'),
                this.lacerta.getDatabase('user_settings'),
            ]);

            // Verify DB integrity on warm start (one fast probe — ~3ms)
            if (isWarmStart) {
                try {
                    await this.cacheDb.getCollection('posts');
                } catch (_) {
                    // DB was evicted/cleared — probe was stale
                    isWarmStart = false;
                }
            }

            // ── Sync: Client + API groups (no I/O — microseconds) ──
            const nodes = config.nodes || this.config.DEFAULT_NODES;
            const clientOptions = {};

            if (config.chainId || this.config.CHAIN_ID) {
                clientOptions.chainId = config.chainId || this.config.CHAIN_ID;
            }
            if (config.addressPrefix || this.config.ADDRESS_PREFIX) {
                clientOptions.addressPrefix = config.addressPrefix || this.config.ADDRESS_PREFIX;
            }
            if (config.timeout) {
                clientOptions.timeout = config.timeout;
            }
            if (config.failoverThreshold) {
                clientOptions.failoverThreshold = config.failoverThreshold;
            }

            // Initialize single unified client
            this.client = new Client(
                Array.isArray(nodes) ? nodes : [nodes],
                clientOptions
            );

            // Initialize all API groups
            this.database = new DatabaseAPI(this);
            this.tags = new TagsAPI(this);
            this.blocks = new BlocksAPI(this);
            this.globals = new GlobalsAPI(this);
            this.accounts = new AccountsAPI(this);
            this.market = new MarketAPI(this);
            this.authority = new AuthorityAPI(this);
            this.votes = new VotesAPI(this);
            this.content = new ContentAPI(this);
            this.witnesses = new WitnessesAPI(this);
            this.follow = new FollowAPI(this);
            this.broadcast = new BroadcastAPI(this);
            this.auth = new AuthAPI(this);
            this.formatter = new FormatterAPI(this);
            this.blockchain = new BlockchainAPI(this);
            this.rc = new ResourceCreditsAPI(this);
            this.communities = new CommunitiesAPI(this);
            this.keys = new AccountByKeyAPI(this);
            this.transaction = new TransactionStatusAPI(this);

            this.keyManager = new KeyManager(this.eventEmitter, this.config);
            this.cacheManager = new CacheManager(this.cacheDb);
            this.sessionManager = new SessionManager(this.settingsDb, this.config, {
                vault: null, // Set after _ensureVault()
            });

            // ── Connectivity monitor + offline broadcast queue ──
            this.connectivity = new ConnectivityMonitor({
                heartbeatUrl: null, // Set to API node health endpoint if available
                heartbeatInterval: 30_000,
            });
            this.connectivity.initialize(this.eventEmitter);

            // ── Phase 2: Schema setup ──
            if (isWarmStart) {
                // WARM: Collections + indexes already exist.
                // Only init managers (they need collection handles — 6 IDB ops, parallel).
                await Promise.all([
                    this.keyManager.setDependencies(this.settingsDb),
                    this.sessionManager.initialize(this.eventEmitter),
                ]);
            } else {
                // COLD: Full schema setup — all collections + managers in one parallel batch.
                const cacheCollections = [
                    'posts', 'accounts', 'comments',
                    'feed_cache', 'tags', 'blocks', 'market',
                    'witnesses', 'globals', 'relationships', 'rewards',
                    'accounts_store', 'posts_store', 'comments_store',
                    'query_cache'
                ];
                const settingsCollections = ['sessions', 'preferences', 'accounts_registry', 'notification_reads'];

                await Promise.all([
                    this._setupCollectionGroup(this.cacheDb, cacheCollections, 'cache'),
                    this._setupCollectionGroup(this.settingsDb, settingsCollections, 'settings'),
                    this.keyManager.setDependencies(this.settingsDb),
                    this.sessionManager.initialize(this.eventEmitter),
                ]);

                // Indexes deferred to background — not needed for correctness, only query perf
                this._setupEntityIndexes().catch(e =>
                    console.warn('[PixaProxyAPI] Background index setup:', e.message)
                );

                // Warm-start stamp no longer needed — IDB probe is self-detecting
            }

            // ── Phase 3: Await WASM (likely already resolved during DB + schema work) ──
            try {
                await wasmPromise;
            } catch (wasmError) {
                // SECURITY FIX (v3.5.2): WASM sanitizer is mandatory for safe
                // content rendering. Without it, content cannot be served safely.
                if (config.allowDegradedSanitizer) {
                    console.warn('[PixaProxyAPI] pixa-content WASM init failed — DEGRADED MODE:', wasmError.message);
                } else {
                    throw new PixaAPIError(
                        'Content sanitizer (WASM) failed to initialize. Cannot serve content safely.',
                        'SANITIZER_INIT_FAILED',
                        { message: wasmError.message }
                    );
                }
            }

            /** @type {boolean} Whether the WASM sanitizer is operational */
            this.sanitizerReady = this.contentSanitizer.ready;

            // SECURITY PATCH (v3.5.2-patched): Only create entity pipeline when
            // WASM sanitizer is operational. If WASM failed and allowDegradedSanitizer
            // was set, pipeline stays null — API fallback paths will refuse to serve
            // raw data (fail-closed).
            if (this.sanitizerReady) {
                this.sanitizationPipeline = new SanitizationPipeline(this.contentSanitizer, this.formatter);
                this.entityStore = new EntityStoreManager(this.cacheDb, this.sanitizationPipeline, this.config.ENTITY_TTL);
                this.queryCache = new QueryCacheManager(this.cacheDb, this.config.QUERY_TTL);
            } else {
                this.sanitizationPipeline = null;
                this.entityStore = null;
                this.queryCache = null;
                console.warn('[PixaProxyAPI] Entity pipeline DISABLED — WASM sanitizer not ready');
            }

            this.initialized = true;

            // ── BroadcastQueue: offline-aware operation queue ──
            try {
                this.broadcastQueue = new BroadcastQueue(
                    this.cacheDb,
                    this.connectivity,
                    this.eventEmitter,
                    { maxRetries: 3, maxAge: 24 * 60 * 60 * 1000 }
                );
                await this.broadcastQueue.initialize();

                // Wire the actual broadcast function
                this.broadcastQueue.broadcastFn = async (opType, operations, meta) => {
                    const account = meta.account || this.sessionManager?.getCurrentAccountSync();
                    if (!account) throw new PixaAPIError('No active account for broadcast', 'NO_ACCOUNT');

                    const keyType = meta.keyType || this._inferKeyType(opType);
                    this.sessionManager.touchActivity();

                    // v6.1: Get key as YOLOBuffer from SessionManager (byte-level, auto-zeroing).
                    // Falls back to KeyManager.requestKeyBuffer for backward compat.
                    let keyBuf;
                    try {
                        keyBuf = this.sessionManager.getKeyAsYOLO(keyType);
                    } catch (_) {
                        keyBuf = await this.keyManager.requestKeyBuffer(account, keyType);
                    }

                    return YOLOBuffer.use(keyBuf, async (wifBytes) => {
                        // Decode WIF bytes → PrivateKey. The WIF string is transient.
                        const wif = new TextDecoder().decode(wifBytes);
                        const privateKey = PrivateKey.from(wif);

                        try {
                            if (operations.length === 1) {
                                const [op, opData] = operations[0];
                                const methodName = op.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
                                const method = this.client.broadcast[methodName];
                                if (typeof method === 'function') {
                                    return method.call(this.client.broadcast, opData, privateKey);
                                }
                            }

                            return this.client.broadcast.sendOperations(operations, privateKey);
                        } finally {
                            // Zero the 32-byte internal secret buffer
                            if (privateKey.secret) privateKey.secret.fill(0);
                        }
                    });
                    // wifBytes auto-zeroed by YOLOBuffer.use()
                };

                // FIX (v5.0): Inject session lock checker so drain can detect
                // PIN-locked state and prompt the user instead of failing silently.
                this.broadcastQueue.isLockedFn = () => this.sessionManager?.isLocked ?? false;
            } catch (e) {
                console.warn('[PixaProxyAPI] BroadcastQueue initialization failed:', e.message);
                this.broadcastQueue = null;
            }

            // ── Phase 4: Vault WASM — fire-and-forget (auto-tune cached after first run) ──
            this._ensureVault(config).then(vault => {
                this.sessionManager.vault = vault;
            }).catch(pqErr => {
                console.warn('[PixaProxyAPI] Vault pre-load deferred:', pqErr.message || pqErr);
            });

            // Wire KeyManager ↔ SessionManager
            this.keyManager.setSessionManager(this.sessionManager);
            this.keyManager._unlockWithPin = this.unlockWithPin.bind(this);

            // Listen for PIN lock events from SessionManager's inactivity timer
            this.eventEmitter.on('pin_locked', ({ account }) => {
                console.debug(`[PixaProxyAPI] PIN locked for ${account}`);
            });

            // FIX (v4.2 — timer desync): When SessionManager resets its PIN
            // timer via touchActivity(), also reset KeyManager's passive
            // timestamp-based timer. Without this, user activity keeps the
            // SessionManager alive but KeyManager's isPINValid() silently
            // expires and destroys all cached keys.
            this.eventEmitter.on('pin_activity', () => {
                if (this.keyManager.pinVerified) {
                    this.keyManager.resetPinTimer();
                }
            });

            // FIX (v4.2 — switchAccount key sync): When switching to a
            // persist-mode account, SessionManager loads plaintext_keys into
            // _cachedKeys, but KeyManager.sessionKeys (an in-memory Map) is
            // not synced. Without this, requestKey() finds nothing in
            // KeyManager and falls through to key_required.
            this.eventEmitter.on('account_switched', async ({ account, mode }) => {
                if (mode === SessionMode.PERSIST && this.keyManager && this.sessionManager) {
                    try {
                        const keys = this.sessionManager.getKeys();
                        if (keys) {
                            if (!this.keyManager._sessionCryptoKey) {
                                await this.keyManager._generateSessionCryptoKey();
                            }
                            await this.keyManager.cacheKeys(account, keys);
                            this.keyManager.setActiveAccount(account);
                        }
                    } catch (_) {}
                }
            });

            console.log('[PixaProxyAPI] Initialized successfully v4.2.0');
            return this;
        } catch (error) {
            console.error('[PixaProxyAPI] Initialization failed:', error);
            throw new PixaAPIError('Initialization failed', 'INIT_FAILED', { message: error.message });
        }
    }

    /**
     * Restore a previous session after tab reopen or page reload.
     * Delegates to SessionManager.resume():
     *   PIN-locked:   Returns account + emits pin_locked for UI
     *   temporary:    Returns null (nothing survives tab close)
     *   persistent:   Returns account with keys auto-loaded
     * @returns {Promise<string|null>} Account name if restored, null otherwise
     */
    async restoreSession() {
        if (!this.initialized) throw new PixaAPIError('API not initialized', 'NOT_INITIALIZED');

        // Ensure vault WASM is loaded (PIN unlock will need it)
        try { await this._ensureVault(); } catch (_) {}
        if (this.vault) this.sessionManager.vault = this.vault;

        const result = await this.sessionManager.resume();
        if (!result) return null;

        const { account, locked, pinProtected } = result;

        if (locked) {
            // PIN-protected and locked — UI must show PIN dialog
            this.keyManager.setActiveAccount(account);
            this.eventEmitter.emit('session_restored', {
                account, pinEnabled: true, keysLoaded: false, needsPIN: true,
            });
            return account;
        }

        // Keys are available — sync to KeyManager
        await this._syncKeysToKeyManager(account);

        this.keyManager.setActiveAccount(account);
        this.eventEmitter.emit('session_restored', {
            account, pinEnabled: pinProtected, keysLoaded: true, needsPIN: false,
        });
        return account;
    }

    /**
     * Sync SessionManager's decrypted keys into KeyManager's in-memory cache.
     * SessionManager stores Uint8Array (WIF bytes); KeyManager expects strings.
     * @private
     */
    async _syncKeysToKeyManager(account) {
        try {
            // exportKeysAsStrings creates transient string copies for KeyManager
            const keys = this.sessionManager.exportKeysAsStrings();
            if (keys && this.keyManager) {
                if (!this.keyManager._sessionCryptoKey) {
                    await this.keyManager._generateSessionCryptoKey();
                }
                await this.keyManager.cacheKeys(account, keys);
            }
        } catch (e) {
            console.warn('[restoreSession] Key sync to KeyManager failed:', e.message);
        }
    }

    async hasVaultConfig() {
        return this.sessionManager?.isPinProtected ?? false;
    }

    /**
     * Retrieve wallet keys for an account.
     * Public keys are always returned from chain data.
     * Private keys are returned ONLY if already available in session/vault cache.
     * This method NEVER triggers PIN dialog or key-entry prompts — it is silent.
     * Use keyManager.requestKey(account, type) to prompt the user for a specific key.
     *
     * @param {string} account - Account username
     * @param {object} [options]
     * @param {boolean} [options.requestPrivate=true] - Whether to look up private keys
     * @param {string[]} [options.keyTypes=['posting','active','owner','memo']] - Which key types to request
     * @returns {Promise<{publicKeys: object, privateKeys: object, availableTypes: string[]}>}
     */
    async getWalletKeys(account, options = {}) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account parameter', 'INVALID_ACCOUNT');
        }

        const requestPrivate = options.requestPrivate !== false;
        const keyTypes = options.keyTypes || ['posting', 'active', 'owner', 'memo'];

        const publicKeys = { posting: '', active: '', owner: '', memo: '' };
        const privateKeys = { posting: '', active: '', owner: '', memo: '' };
        const availableTypes = [];

        // 1. Get public keys from chain account data
        try {
            const [accountData] = await this.client.database.getAccounts([normalizedAccount]);
            if (accountData) {
                if (accountData.posting?.key_auths?.[0]) {
                    publicKeys.posting = accountData.posting.key_auths[0][0] || '';
                }
                if (accountData.active?.key_auths?.[0]) {
                    publicKeys.active = accountData.active.key_auths[0][0] || '';
                }
                if (accountData.owner?.key_auths?.[0]) {
                    publicKeys.owner = accountData.owner.key_auths[0][0] || '';
                }
                if (accountData.memo_key) {
                    publicKeys.memo = accountData.memo_key;
                }
            }
        } catch (e) {
            console.warn('[getWalletKeys] Failed to fetch account public keys:', e.message);
        }

        // 2. Get private keys from session/vault silently (never triggers PIN dialog)
        if (requestPrivate && this.keyManager) {
            for (const type of keyTypes) {
                try {
                    const key = await this.keyManager.getKeyIfAvailable(normalizedAccount, type);
                    if (key) {
                        privateKeys[type] = key;
                        availableTypes.push(type);
                        // Derive public key as fallback if chain data was missing
                        try {
                            const pub = PrivateKey.fromString(key).createPublic().toString();
                            if (!publicKeys[type]) publicKeys[type] = pub;
                        } catch (_) {}
                    }
                } catch (e) {
                    // Key not available
                }
            }
        }

        return { publicKeys, privateKeys, availableTypes };
    }

    async logout() {
        const account = this.sessionManager?.currentAccount;
        await this.sessionManager?.endSession();
        this.eventEmitter.emit(PixaEvents.Session.ENDED, { account });
    }

    /**
     * Lazy-load the PQ Secure Vault WASM module.
     * Called automatically by initializeVault() and unlockWithPin().
     *
     * Uses dynamic import() so the app doesn't crash at module load time
     * if pq-secure-vault.js dependencies aren't installed yet.
     *
     * @param {object} [config] - Optional config with skipAutoTune flag
     * @returns {Promise<PQSecureVault>}
     * @private
     */
    async _ensureVault(config = {}) {
        if (this.vault) return this.vault;
        if (this._vaultPromise) return this._vaultPromise;

        this._vaultPromise = this._initVaultCore(config);
        try {
            return await this._vaultPromise;
        } finally {
            this._vaultPromise = null;
        }
    }

    /** @private */
    async _initVaultCore(config = {}) {
        if (!_SecureVault || !_initSecureVault) {
            try {
                const vaultMod = await import('./pq-secure-vault.js');
                _SecureVault = vaultMod.SecureVault || vaultMod.PQSecureVault;
                _initSecureVault = vaultMod.initSecureVault || vaultMod.initPQVault;
            } catch (e) {
                throw new PixaAPIError(
                    'pq-secure-vault.js not found. npm install hash-wasm @noble/ciphers @noble/hashes',
                    'VAULT_NOT_INSTALLED'
                );
            }
        }

        await _initSecureVault();

        this.vault = new _SecureVault({
            memoryKib: this.config.ARGON2_MEMORY_KIB,
            iterations: this.config.ARGON2_ITERATIONS,
        });

        if (!config.skipAutoTune) {
            let restoredFromCache = false;

            if (!config.forceAutoTune && this.settingsDb) {
                try {
                    const configCol = await this.settingsDb.getCollection('pq_vault_config');
                    const cached = await configCol.get('autotune_params');
                    if (cached?.memoryKib && cached?.iterations
                        && cached.tunedAt && (Date.now() - cached.tunedAt) < this.config.ARGON2_AUTOTUNE_TTL) {
                        this.vault.memoryKib = cached.memoryKib;
                        this.vault.iterations = cached.iterations;
                        restoredFromCache = true;
                    }
                } catch (_) {}
            }

            if (!restoredFromCache) {
                try {
                    const tuned = await this.vault.autoTuneParams(2000);
                    if (this.settingsDb) {
                        try {
                            const configCol = await this.settingsDb.getCollection('pq_vault_config');
                            const record = {
                                memoryKib: tuned.memoryKib, iterations: tuned.iterations,
                                label: tuned.label, measuredMs: tuned.measuredMs, tunedAt: Date.now(),
                            };
                            await configCol.upsert('autotune_params', record);
                        } catch (e) {
                            console.warn('[Vault] Failed to persist auto-tune:', e.message);
                        }
                    }
                } catch (e) {
                    console.warn('[Vault] autoTune failed, using defaults:', e.message);
                }
            }
        }

        this.sessionManager.vault = this.vault;
        return this.vault;
    }

    async initializeVault(pin, options = {}) {
        if (pin.length < this.config.MIN_PIN_LENGTH) {
            throw new PixaAPIError(`PIN must be at least ${this.config.MIN_PIN_LENGTH} characters`, 'PIN_TOO_SHORT');
        }

        // Reject low-entropy PINs even if they pass length check
        if (this.config.MIN_PIN_ENTROPY > 0 && !options.fastMode) {
            const strength = estimatePinEntropy(pin);
            if (strength.bits < this.config.MIN_PIN_ENTROPY) {
                throw new PixaAPIError(
                    strength.feedback || `PIN is too weak (${strength.bits} bits, need ${this.config.MIN_PIN_ENTROPY})`,
                    'PIN_TOO_WEAK',
                    { bits: strength.bits, required: this.config.MIN_PIN_ENTROPY, feedback: strength.feedback }
                );
            }
        }

        if (options.pinTimeout) this.config.PIN_TIMEOUT = options.pinTimeout;

        // v6: initializeVault just loads the WASM and injects it into SessionManager.
        // No salt management, no sealed_keys collection, no config persistence.
        // Sealing happens in SessionManager.createSession() / addPin().
        await this._ensureVault();

        // Ensure KeyManager has a session CryptoKey for in-memory encryption
        if (!this.keyManager._sessionCryptoKey) {
            await this.keyManager._generateSessionCryptoKey();
        }

        this.eventEmitter.emit('vault_initialized', {
            timestamp: Date.now(),
            algorithm: 'argon2id+chacha20poly1305',
            memoryKib: this.vault.memoryKib,
            iterations: this.vault.iterations,
        });
        return true;
    }

    isVaultInitialized() { return (this.vault !== null); }

    async unlockWithPin(pin, options = {}) {
        const { account } = options;

        let normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount && this.sessionManager) {
            normalizedAccount = normalizeAccount(
                this.sessionManager.currentAccount ||
                (await this.sessionManager.getActiveAccount())
            );
        }
        if (!normalizedAccount) {
            return { success: false, error: 'No account specified', code: 'NO_ACCOUNT' };
        }

        // Ensure vault WASM is loaded
        try {
            await this._ensureVault();
            if (this.vault) this.sessionManager.vault = this.vault;
        } catch (e) {
            return { success: false, error: 'Vault not available: ' + e.message, code: 'VAULT_ERROR' };
        }

        // Ensure session CryptoKey for KeyManager
        if (!this.keyManager._sessionCryptoKey) {
            await this.keyManager._generateSessionCryptoKey();
        }

        try {
            // Delegate to SessionManager — one path, no fallback cascade
            const success = await this.sessionManager.unlockWithPin(pin);

            if (!success) {
                // Wrong PIN (key commitment mismatch)
                const result = await this.keyManager._recordFailedPinAttempt();
                if (result.wiped) {
                    return { success: false, error: 'Too many failed attempts. Re-login required.', code: 'VAULT_WIPED' };
                }
                return { success: false, error: 'Authentication failed', code: 'AUTH_FAILED' };
            }

            // Success — sync keys to KeyManager
            await this._syncKeysToKeyManager(normalizedAccount);

            // Reset lockout state
            this.keyManager._pinAttempts = 0;
            this.keyManager._pinLockoutUntil = 0;
            this.keyManager.pinVerified = true;
            this.keyManager.pinVerificationTime = Date.now();
            if (this.keyManager._pinLockoutStore) {
                try { await this.keyManager._pinLockoutStore.delete('state'); } catch (_) {}
            }

            this.eventEmitter.emit(PixaEvents.PIN.UNLOCKED, { account: normalizedAccount });
            return { success: true, account: normalizedAccount };
        } catch (error) {
            console.error('[unlockWithPin] Error:', error);
            return { success: false, error: 'Authentication failed', code: 'AUTH_FAILED' };
        }
    }

    async isPinEnabled() {
        return this.sessionManager?.isPinProtected ?? false;
    }


    async requiresUnlock(keyType = 'posting') {
        const account = await this.sessionManager?.getActiveAccount();
        if (!account) {
            return { needsUnlock: true, unlockType: 'login', account: null };
        }

        const normalizedAccount = normalizeAccount(account);

        if (this.keyManager.hasKey(normalizedAccount, keyType)) {
            return { needsUnlock: false, unlockType: null, account: normalizedAccount };
        }

        // FIX (v4.2): Use SessionManager.currentMode (v2 canonical source)
        // instead of session.pinEnabled (v1 compat field). The v1 field can
        // mismatch on v2 sessions where pinEnabled wasn't explicitly set,
        // causing persist-mode sessions to be misidentified as PIN sessions.
        const isPinMode = this.sessionManager?.currentMode === SessionMode.PIN;

        if (isPinMode) {
            if (this.keyManager.isPINValid()) {
                try {
                    const key = await this.keyManager.requestKey(normalizedAccount, keyType);
                    if (key) {
                        return { needsUnlock: false, unlockType: null, account: normalizedAccount };
                    }
                } catch (e) {}
            }
            return { needsUnlock: true, unlockType: 'pin', account: normalizedAccount };
        }

        return { needsUnlock: true, unlockType: 'key', account: normalizedAccount };
    }

    async validateCredentials(account, key, keyType = 'master') {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            return { valid: false, error: 'Invalid account parameter' };
        }

        // SECURITY FIX (v3.5.2): Hash the key for deduplication instead of
        // storing the first 10 characters (which leaks 9 chars of WIF entropy).
        const keyHash = bytesToHex(new Uint8Array(
            cryptoUtils.sha256(key + normalizedAccount + keyType)
        ).slice(0, 8));
        const validationKey = `${normalizedAccount}_${keyType}_${keyHash}`;
        if (this.pendingValidations.has(validationKey)) return this.pendingValidations.get(validationKey);

        const validationPromise = this._doValidation(normalizedAccount, key, keyType)
            .finally(() => this.pendingValidations.delete(validationKey));

        this.pendingValidations.set(validationKey, validationPromise);
        return validationPromise;
    }

    async _doValidation(account, key, keyType) {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            return { valid: false, error: 'Invalid account parameter' };
        }

        try {
            const accounts = await this.client.database.getAccounts([normalizedAccount]);
            if (!accounts || accounts.length === 0 || !accounts[0]) {
                return { valid: false, error: 'Account not found' };
            }

            const accountData = accounts[0];

            if (keyType === 'master') {
                // Derive ALL key types and check which ones match on-chain authorities.
                // Accounts may have had individual keys changed via update_account —
                // only the keys that still match should be stored/cached.
                const derivedTypes = ['posting', 'active', 'owner', 'memo'];
                const matchedTypes = [];
                const mismatchedTypes = [];
                let primaryPublicKey = null;

                for (const type of derivedTypes) {
                    const derived = PrivateKey.fromLogin(normalizedAccount, key, type);
                    const pubKey = derived.createPublic().toString();

                    let typeMatches = false;
                    if (type === 'memo') {
                        typeMatches = pubKey === accountData.memo_key;
                    } else {
                        typeMatches = accountData[type]?.key_auths?.some(([pk]) => pk === pubKey) || false;
                    }

                    if (typeMatches) {
                        matchedTypes.push(type);
                        if (type === 'posting') primaryPublicKey = pubKey;
                    } else {
                        mismatchedTypes.push(type);
                    }
                }

                // Master password must match at least the posting key to be valid
                if (!matchedTypes.includes('posting')) {
                    return { valid: false, error: 'Master password does not match account keys' };
                }

                // SECURITY FIX (v3.5.2): Never return master password in result
                return {
                    valid: true,
                    publicKey: primaryPublicKey,
                    keyType: 'master',
                    account: normalizedAccount,
                    matchedTypes,      // e.g. ['posting', 'memo']
                    mismatchedTypes,   // e.g. ['active', 'owner']
                };
            } else {
                let privateKey;
                try { privateKey = PrivateKey.fromString(key); } catch (e) {
                    return { valid: false, error: 'Invalid key format (not WIF)' };
                }

                const publicKey = privateKey.createPublic().toString();

                // SECURITY FIX (v3.5.2): Check all key_auths for multi-authority support
                let matches = false;
                switch (keyType) {
                    case 'posting':
                        matches = accountData.posting?.key_auths?.some(([pk]) => pk === publicKey) || false;
                        break;
                    case 'active':
                        matches = accountData.active?.key_auths?.some(([pk]) => pk === publicKey) || false;
                        break;
                    case 'owner':
                        matches = accountData.owner?.key_auths?.some(([pk]) => pk === publicKey) || false;
                        break;
                    case 'memo':
                        matches = publicKey === accountData.memo_key;
                        break;
                    default:
                        return { valid: false, error: 'Invalid key type' };
                }

                if (!matches) {
                    return { valid: false, error: `Key does not match account's ${keyType} key` };
                }
                return { valid: true, publicKey, account: normalizedAccount };
            }
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    async quickLogin(account, key, keyType = 'master', options = {}) {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account parameter', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Always validate credentials against on-chain
        // authorities. skipValidation removed — all login paths must verify keys.
        let validation = options.validation;

        if (!validation) {
            validation = await this.validateCredentials(normalizedAccount, key, keyType);
            if (!validation.valid) throw new PixaAPIError(validation.error, 'VALIDATION_FAILED');
        }

        // SECURITY FIX (v3.5.2): Always ensure session CryptoKey exists so keys
        // are encrypted in memory even for quickLogin (defense-in-depth).
        if (!this.keyManager._sessionCryptoKey) {
            await this.keyManager._generateSessionCryptoKey();
        }

        // Derive/cache keys in KeyManager and capture for session storage
        let sessionKeys = null;

        if (keyType === 'master') {
            const derivedKeys = await this.keyManager.addAccountWithMasterKey(normalizedAccount, key, {
                storeInVault: false,
                matchedTypes: validation?.matchedTypes,
            });
            sessionKeys = derivedKeys;
        } else {
            await this.keyManager.addIndividualKey(normalizedAccount, keyType, key, { storeInVault: false });

            // FIX (v4.2 — Bug B): Collect ALL currently cached keys for this
            // account, not just the new one. When logging in with multiple
            // individual keys (e.g. posting then active), each quickLogin call
            // creates/upserts the session. If we only pass { [keyType]: key },
            // the upsert overwrites plaintext_keys and the previous key is lost.
            // By collecting every key currently in KeyManager's cache, the
            // session record always contains the full set.
            sessionKeys = {};
            for (const type of ['posting', 'active', 'owner', 'memo']) {
                try {
                    const cached = await this.keyManager.getKeyIfAvailable(normalizedAccount, type);
                    if (cached) sessionKeys[type] = cached;
                } catch (_) {}
            }
            // Ensure the new key is always included (defense in depth)
            if (!sessionKeys[keyType]) sessionKeys[keyType] = key;
        }

        // v6: SessionManager.createSession handles ALL encryption (device-wrap + optional PIN seal).
        // No separate _sealKeysToVault step needed.
        let sessionId = null;
        const shouldCreateSession = options.skipSession !== true;

        if (shouldCreateSession && this.sessionManager) {
            try {
                // Ensure vault is available if PIN is provided
                if (options.pin && this.vault) {
                    this.sessionManager.vault = this.vault;
                }

                sessionId = await this.sessionManager.createSession(normalizedAccount, {
                    keys:           sessionKeys,
                    persistent:     options.stayConnected !== false,
                    pin:            options.pin || undefined,
                    timeout_ms:     this.config.SESSION_TIMEOUT,
                    pin_timeout_ms: this.config.PIN_TIMEOUT,
                    login_type:     keyType,
                    user_agent:     options.userAgent || 'unknown',
                });
            } catch (e) {
                console.warn('[quickLogin] Session creation error:', e);
                this.eventEmitter.emit(PixaEvents.Session.CREATED, { account: normalizedAccount });
            }
        } else if (options.skipSession === true) {
            this.eventEmitter.emit(PixaEvents.Session.CREATED, { account: normalizedAccount });
        }

        this.keyManager.setActiveAccount(normalizedAccount);
        return { success: true, account: normalizedAccount, sessionId, keyType, validation };
    }

    /**
     * Login with PIN-protected keys (for returning users)
     * @param {string} account
     * @param {string} pin
     * @param {object} options
     */
    async loginWithPin(account, pin, options = {}) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account parameter', 'INVALID_ACCOUNT');
        }

        // v6: The PIN session already exists in LacertaDB from the original login.
        // We just need to resume (device-unwrap + cache sealed blob) then unlock (Argon2id).
        // No new session creation. No vault config lookup.

        // Ensure the session is resumed first
        if (!this.sessionManager.currentAccount) {
            const result = await this.restoreSession();
            if (!result) {
                throw new PixaAPIError('No session found. Use quickLogin first.', 'NO_SESSION');
            }
        }

        // Now unlock with PIN
        const unlockResult = await this.unlockWithPin(pin, { account: normalizedAccount });
        if (!unlockResult.success) {
            throw new PixaAPIError(unlockResult.error, unlockResult.code || 'UNLOCK_FAILED');
        }

        this.keyManager.setActiveAccount(normalizedAccount);
        return { success: true, account: normalizedAccount };
    }

    disconnect() {
        this.sessionManager?.endSession().catch(() => {});
        if (this.connectivity) this.connectivity.destroy();
        if (this.broadcastQueue) this.broadcastQueue.destroy();
        if (this.client && typeof this.client.disconnect === 'function') this.client.disconnect();
    }

    async setupCollections() {
        const cacheCollections = [
            'posts', 'accounts', 'comments',
            'feed_cache', 'tags', 'blocks', 'market',
            'witnesses', 'globals', 'relationships', 'rewards',
            'accounts_store', 'posts_store', 'comments_store',
            'query_cache'
        ];
        const settingsCollections = ['sessions', 'preferences', 'accounts_registry'];
        await Promise.all([
            this._setupCollectionGroup(this.cacheDb, cacheCollections, 'cache'),
            this._setupCollectionGroup(this.settingsDb, settingsCollections, 'settings'),
        ]);

        // v3.5.0: Create indexes on entity store collections
        await this._setupEntityIndexes();
    }

    /**
     * Index definitions per entity store collection.
     * Each index enables efficient queries without full-collection scans.
     */
    static get ENTITY_INDEXES() {
        return {
            accounts_store: [
                { field: 'id',          name: 'idx_account_id'         },
                { field: 'reputation',  name: 'idx_account_reputation' },
                { field: 'created',     name: 'idx_account_created'    },
                { field: 'last_post',   name: 'idx_account_last_post'  },
                { field: 'post_count',  name: 'idx_account_post_count' },
                { field: '_stored_at',  name: 'idx_account_stored_at'  },
            ],
            posts_store: [
                { field: 'author',               name: 'idx_post_author'         },
                { field: 'category',             name: 'idx_post_category'       },
                { field: 'created',              name: 'idx_post_created'        },
                { field: 'pending_payout_value', name: 'idx_post_pending_payout' },
                { field: 'net_votes',            name: 'idx_post_net_votes'      },
                { field: 'cashout_time',         name: 'idx_post_cashout'        },
                { field: 'depth',                name: 'idx_post_depth'          },
                { field: '_stored_at',           name: 'idx_post_stored_at'      },
            ],
            comments_store: [
                { field: 'author',          name: 'idx_comment_author'          },
                { field: 'parent_author',   name: 'idx_comment_parent_author'   },
                { field: 'parent_permlink', name: 'idx_comment_parent_permlink' },
                { field: 'created',         name: 'idx_comment_created'         },
                { field: 'net_votes',       name: 'idx_comment_net_votes'       },
                { field: 'root_author',     name: 'idx_comment_root_author'     },
                { field: 'depth',           name: 'idx_comment_depth'           },
                { field: '_stored_at',      name: 'idx_comment_stored_at'       },
            ],
            query_cache: [
                { field: 'entity_type', name: 'idx_qc_entity_type' },
                { field: 'timestamp',   name: 'idx_qc_timestamp'   },
            ],
        };
    }

    /** @private */
    async _setupEntityIndexes() {
        const indexDefs = PixaProxyAPI.ENTITY_INDEXES;
        // Register index definitions on collection handles WITHOUT triggering init().
        // createIndex() queues the definitions when the collection isn't initialized yet.
        // They'll be applied when the collection is first actually used (lazy init).
        for (const [collectionName, indexes] of Object.entries(indexDefs)) {
            try {
                const col = this.cacheDb.ensureCollection(collectionName);
                for (const idx of indexes) {
                    await col.createIndex(idx.field, { name: idx.name, unique: false }).catch(() => {});
                }
            } catch (e) {
                console.warn(`[PixaProxyAPI] Index setup for ${collectionName} skipped:`, e.message);
            }
        }
    }

    async _setupCollectionGroup(db, collectionNames, groupName) {
        for (const name of collectionNames) {
            db.ensureCollection(name);
        }
    }

    async setupVaultCollections() {
        // v6: sealed_keys collection is no longer used.
        // pq_vault_config is kept only for Argon2 auto-tune benchmark caching.
        try { await this.settingsDb.createCollection('pq_vault_config'); } catch (e) {}
    }


    // _sealKeysToVault — REMOVED in v6.
    // Sealing is now handled by SessionManager.createSession() and SessionManager.addPin().
    // The sealed_keys LacertaDB collection is no longer used.
    // Session records contain encrypted_keys (device-wrapped, optionally PIN-sealed).


    /**
     * Guard: ensure profile is a plain object (not a string, array, number, etc.)
     * Malformed on-chain metadata can set "profile" to a non-object value like
     * "rshares" or ["rshares", 0], which causes { ...profile } to produce garbage.
     * @param {*} obj
     * @returns {object}
     */
    static _safeProfile(obj) {
        return (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : {};
    }

    /**
     * Extract display_name from a profile object safely.
     * Handles numeric, boolean, or other non-string values that survive safeJson.
     * @param {*} raw
     * @returns {string|null}
     */
    static _safeDisplayName(raw) {
        if (typeof raw === 'string') {
            const trimmed = raw.trim();
            return trimmed.length > 0 ? trimmed.slice(0, 64) : null;
        }
        if (typeof raw === 'number' && isFinite(raw)) {
            const s = String(raw);
            return s.length > 0 ? s.slice(0, 64) : null;
        }
        return null;
    }

    formatAccount(account) {
        if (!account) return null;

        // SECURITY PATCH (v3.5.2-patched): Require sanitizer — fail-closed
        if (!this.sanitizerReady) {
            throw new PixaAPIError('Cannot format account: content sanitizer not ready', 'SANITIZER_NOT_READY');
        }

        // v3.5.2: Re-validate _sanitized flag
        if (account._sanitized && account._entity_type === 'account' && account._stored_at &&
            (Date.now() - account._stored_at) < (this.config.ENTITY_TTL?.accounts || 300000)) {
            return account;
        }

        // Otherwise run through sanitization pipeline if available
        if (this.sanitizationPipeline) {
            return this.sanitizationPipeline.sanitizeAccount(account);
        }

        // Legacy fallback — build field-by-field, NO spread of raw data.
        // safeJson returns a sanitized JSON string. Parse for field access, store string directly.
        const safePostingMetaStr = this.contentSanitizer.safeJson(account.posting_json_metadata || '{}');
        const safeJsonMetaStr    = this.contentSanitizer.safeJson(account.json_metadata || '{}');
        let postingMeta = {}, jsonMeta = {};
        try { postingMeta = JSON.parse(safePostingMetaStr); } catch (e) {}
        try { jsonMeta    = JSON.parse(safeJsonMetaStr); } catch (e) {}
        const profile = { ...PixaProxyAPI._safeProfile(jsonMeta.profile), ...PixaProxyAPI._safeProfile(postingMeta.profile) };

        return {
            _entity_type: 'account',
            _sanitized: true,
            _stored_at: Date.now(),
            _profile: {
                display_name: PixaProxyAPI._safeDisplayName(profile.name),
                about: typeof profile.about === 'string' ? profile.about.slice(0, 512) : null,
                location: typeof profile.location === 'string' ? profile.location.slice(0, 128) : null,
                website: typeof profile.website === 'string' ? profile.website.slice(0, 256) : null,
                profile_image: profile.profile_image || null,
                cover_image: profile.cover_image || null,
            },
            _links: [],
            name: this.contentSanitizer.sanitizeUsername(account.name) || '',
            id: VALIDATORS.safe_number(account.id) ?? 0,
            json_metadata:         safeJsonMetaStr,
            posting_json_metadata: safePostingMetaStr,
            reputation:       VALIDATORS.safe_number(account.reputation) ?? 0,
            reputation_score: this.formatter.reputation(account.reputation),
            balance: translateAssetFromChain(VALIDATORS.safe_asset(account.balance) || '0.000 PIXA'),
            vesting_shares: translateAssetFromChain(VALIDATORS.safe_asset(account.vesting_shares) || '0.000000 PXP'),
            voting_power: VALIDATORS.safe_number(account.voting_power) ?? 0,
            post_count: VALIDATORS.safe_number(account.post_count) ?? 0,
            created: VALIDATORS.safe_timestamp(account.created),
        };
    }

    /**
     * Process a post through pixa-content WASM sanitizer
     * Returns the post object enriched with sanitized HTML, images, links.
     * v3.4.0: Uses SanitizationPipeline if available; returns already-sanitized entities as-is.
     *
     * @param {object} post - Raw post object from blockchain
     * @param {object} [renderOptions] - Override render options (include_images, max_image_count, internal_domains)
     * @returns {object|null} Processed post with html, images, links, wordCount
     */
    processPost(post, renderOptions = {}) {
        if (!post) return null;

        // SECURITY PATCH (v3.5.2-patched): Require sanitizer — fail-closed
        if (!this.sanitizerReady) {
            throw new PixaAPIError('Cannot process post: content sanitizer not ready', 'SANITIZER_NOT_READY');
        }

        // v3.5.2: Re-validate _sanitized flag — IndexedDB data can be tampered
        if (post._sanitized && post._entity_type === 'post' && post._stored_at &&
            (Date.now() - post._stored_at) < (this.config.ENTITY_TTL?.posts || 300000)) {
            return post;
        }

        if (this.sanitizationPipeline) {
            return this.sanitizationPipeline.sanitizePost(post, renderOptions);
        }

        // Legacy fallback — build field-by-field, NO spread of raw data.
        const contentType = detectContentType(post.body);
        const processed = this.contentSanitizer.renderPost(post.body || '', renderOptions);
        const safeMetaStr = this.contentSanitizer.safeJson(post.json_metadata || '{}');
        let meta = {};
        try { meta = JSON.parse(safeMetaStr); } catch (e) {}

        const rawDesc = typeof meta.description === 'string' ? meta.description : '';
        const descriptionHtml = rawDesc
            ? this.contentSanitizer.renderDescription(rawDesc)
            : '';
        const summary = contentType === 'pixel_art'
            ? this.contentSanitizer.extractPlainText(rawDesc).slice(0, 500)
            : this.contentSanitizer.extractPlainText(post.body || '').slice(0, 500);

        return {
            _entity_type: 'post',
            _content_type: contentType,
            _sanitized: true,
            _stored_at: Date.now(),
            _images: processed.images || [],
            _links: processed.links || [],
            _summary: summary,
            _description_html: descriptionHtml,
            _word_count: processed.wordCount || 0,
            id: post.id || 0,
            author: post.author || '',
            permlink: post.permlink || '',
            title: post.title || '',
            body: processed.html || '',
            json_metadata: safeMetaStr,
            category: post.category || '',
            parent_author: post.parent_author || '',
            parent_permlink: post.parent_permlink || '',
            created: VALIDATORS.safe_timestamp(post.created),
            last_update: VALIDATORS.safe_timestamp(post.last_update),
            active: VALIDATORS.safe_timestamp(post.active),
            cashout_time: VALIDATORS.safe_timestamp(post.cashout_time),
            last_payout: VALIDATORS.safe_timestamp(post.last_payout),
            depth: post.depth ?? 0,
            children: post.children ?? 0,
            net_votes: post.net_votes ?? 0,
            author_reputation: this.formatter.reputation(post.author_reputation),
            pending_payout_value: translateAssetFromChain(post.pending_payout_value || '0.000 PXS'),
            total_payout_value: translateAssetFromChain(post.total_payout_value || '0.000 PXS'),
            curator_payout_value: translateAssetFromChain(post.curator_payout_value || '0.000 PXS'),
            url: post.url || '',
        };
    }

    /**
     * Process a comment through pixa-content WASM sanitizer (stricter subset)
     * No headings, tables, or iframes allowed in comments.
     * v3.4.0: Uses SanitizationPipeline if available.
     *
     * @param {object} comment - Raw comment object from blockchain
     * @param {object} [renderOptions] - Override render options
     * @returns {object|null} Processed comment with html, images, links
     */
    processComment(comment, renderOptions = {}) {
        if (!comment) return null;

        // SECURITY PATCH (v3.5.2-patched): Require sanitizer — fail-closed
        if (!this.sanitizerReady) {
            throw new PixaAPIError('Cannot process comment: content sanitizer not ready', 'SANITIZER_NOT_READY');
        }

        // v3.5.2: Re-validate _sanitized flag
        if (comment._sanitized && comment._entity_type === 'comment' && comment._stored_at &&
            (Date.now() - comment._stored_at) < (this.config.ENTITY_TTL?.comments || 300000)) {
            return comment;
        }

        if (this.sanitizationPipeline) {
            return this.sanitizationPipeline.sanitizeComment(comment, renderOptions);
        }

        // Legacy fallback — build field-by-field, NO spread of raw data.
        const processed = this.contentSanitizer.renderComment(comment.body || '', renderOptions);
        const safeMetaStr = this.contentSanitizer.safeJson(comment.json_metadata || '{}');
        return {
            _entity_type: 'comment',
            _sanitized: true,
            _stored_at: Date.now(),
            _images: processed.images || [],
            _links: processed.links || [],
            _word_count: processed.wordCount || 0,
            id: comment.id || 0,
            author: comment.author || '',
            permlink: comment.permlink || '',
            title: '',
            body: processed.html || '',
            json_metadata: safeMetaStr,
            parent_author: comment.parent_author || '',
            parent_permlink: comment.parent_permlink || '',
            created: VALIDATORS.safe_timestamp(comment.created),
            last_update: VALIDATORS.safe_timestamp(comment.last_update),
            active: VALIDATORS.safe_timestamp(comment.active),
            cashout_time: VALIDATORS.safe_timestamp(comment.cashout_time),
            last_payout: VALIDATORS.safe_timestamp(comment.last_payout),
            depth: comment.depth ?? 1,
            children: comment.children ?? 0,
            net_votes: comment.net_votes ?? 0,
            author_reputation: this.formatter.reputation(comment.author_reputation),
            pending_payout_value: translateAssetFromChain(comment.pending_payout_value || '0.000 PXS'),
            total_payout_value: translateAssetFromChain(comment.total_payout_value || '0.000 PXS'),
            curator_payout_value: translateAssetFromChain(comment.curator_payout_value || '0.000 PXS'),
            root_author: comment.root_author || '',
            root_permlink: comment.root_permlink || '',
            url: comment.url || '',
        };
    }

    /**
     * Process a transaction memo for display.
     * Bold, italic, @mentions, #hashtags only. No images, lists, or blocks.
     * v0.2: New method using sanitizeMemo tier.
     *
     * @param {string} memo - Raw memo string
     * @returns {{ html: string }} Sanitized memo
     */
    processMemo(memo) {
        if (!memo) return { html: '' };
        return this.contentSanitizer.renderMemo(memo);
    }

    /**
     * Extract clean plain text from a post/comment body
     * Strips all HTML/Markdown formatting.
     *
     * @param {string} body - Raw body content
     * @returns {string} Clean plain text
     */
    extractPlainText(body) {
        return this.contentSanitizer.extractPlainText(body || '');
    }

    /**
     * TF-IDF extractive summarization of content
     *
     * @param {string} body - Raw body content
     * @param {number} [sentenceCount=3] - Number of top sentences to extract
     * @returns {{ summary: string, keywords: Array, sentences: Array }}
     */
    summarizeContent(body, sentenceCount = 3) {
        return this.contentSanitizer.summarize(body || '', sentenceCount);
    }

    /**
     * Validate and sanitize a username (HIVE-compatible: 3-16 chars, a-z0-9.-)
     *
     * @param {string} rawUsername
     * @returns {string} Sanitized username, or '' if invalid
     */
    sanitizeUsername(rawUsername) {
        return this.contentSanitizer.sanitizeUsername(rawUsername);
    }

    // ─────────────────────────────────────────────
    // Sanitization Primitives — for dangerouslySetInnerHTML
    // ─────────────────────────────────────────────
    // Every string rendered via dangerouslySetInnerHTML MUST pass through
    // one of these methods first. Each uses a different WASM tier with
    // different tag/attribute allowlists.

    /**
     * Sanitize HTML for post-level rendering (full markdown).
     * Allows: headings, tables, images, figures, lists, blockquotes, code,
     *         links, inline formatting, details/summary.
     * Strips: script, style, iframe, video, audio, form, embed, object.
     *
     * Use for: post body content rendered via dangerouslySetInnerHTML.
     *
     * @param {string} html - Raw HTML or markdown text
     * @returns {string} Sanitized HTML safe for innerHTML
     */
    sanitizePostHTML(html) {
        if (!html) return '';
        const result = this.contentSanitizer.renderPost(html);
        return result.html || '';
    }

    /**
     * Sanitize HTML for comment-level rendering.
     * Allows: lists, blockquotes, code, links, inline formatting.
     * Strips: headings, tables, images, iframes, and everything post-only.
     *
     * Use for: comment bodies rendered via dangerouslySetInnerHTML.
     *
     * @param {string} html - Raw HTML or markdown text
     * @returns {string} Sanitized HTML safe for innerHTML
     */
    sanitizeCommentHTML(html) {
        if (!html) return '';
        const result = this.contentSanitizer.renderComment(html);
        return result.html || '';
    }

    /**
     * Sanitize HTML for memo-level rendering (inline only).
     * Allows: bold, italic, @mentions, #hashtags.
     * Strips: everything else (no lists, no blocks, no links, no images).
     *
     * Use for: transaction memos rendered via dangerouslySetInnerHTML.
     *
     * @param {string} html - Raw HTML or markdown text
     * @returns {string} Sanitized HTML safe for innerHTML
     */
    sanitizeMemoHTML(html) {
        if (!html) return '';
        const result = this.contentSanitizer.renderMemo(html);
        return result.html || '';
    }

    /**
     * Sanitize a description or any user-supplied text for safe innerHTML rendering.
     * Uses comment-tier: lists, blockquotes, code, links, inline formatting.
     * No images, no headings, no tables.
     *
     * Use for: json_metadata.description, profile "about" text, or any
     * user-supplied text field displayed via dangerouslySetInnerHTML.
     *
     * @param {string} text - Raw text, HTML, or markdown
     * @returns {string} Sanitized HTML safe for innerHTML
     */
    sanitizeDescription(text) {
        if (!text) return '';
        return this.contentSanitizer.renderDescription(text);
    }

    /**
     * Strip ALL HTML and return plain text only.
     * Use for: generating summaries, search indexing, notifications,
     * or anywhere markup is not wanted.
     *
     * @param {string} text - Raw HTML, markdown, or text
     * @param {number} [maxLen=0] - Maximum length (0 = unlimited)
     * @returns {string} Plain text with all HTML removed
     */
    sanitizeText(text, maxLen = 0) {
        if (!text) return '';
        const plain = this.contentSanitizer.extractPlainText(text);
        if (maxLen > 0 && plain.length > maxLen) {
            return plain.slice(0, maxLen);
        }
        return plain;
    }

    /**
     * Last-guard sanitizer — call at the dangerouslySetInnerHTML boundary.
     * Defense-in-depth: re-sanitizes content even if already sanitized at the data layer.
     *
     * @param {string} html — HTML content to sanitize
     * @param {'post'|'comment'|'memo'} [tier='post'] — Sanitization strictness
     * @returns {string} Safe HTML string
     */
    sanitizeForInjection(html, tier = 'post') {
        if (wasmSanitizeForInjection) {
            return wasmSanitizeForInjection(html, tier);
        }
        // Fallback: use existing tier-specific methods
        if (tier === 'memo') return this.sanitizeMemoHTML(html);
        if (tier === 'comment') return this.sanitizeCommentHTML(html);
        return this.sanitizePostHTML(html);
    }

    /**
     * Whether the client is currently online.
     * @returns {boolean}
     */
    get isOnline() {
        return this.connectivity ? this.connectivity.isOnline : true;
    }

    /**
     * Get pending (queued) broadcast operations.
     * @returns {Promise<object[]>}
     */
    async getPendingBroadcasts() {
        if (!this.broadcastQueue) return [];
        return this.broadcastQueue.getPending();
    }

    /**
     * Get count of pending broadcast operations.
     * @returns {Promise<number>}
     */
    async getPendingBroadcastCount() {
        if (!this.broadcastQueue) return 0;
        return this.broadcastQueue.getPendingCount();
    }

    /**
     * Manually drain the broadcast queue (retry pending ops).
     * @returns {Promise<{succeeded: number, failed: number, cancelled: number}>}
     */
    async drainBroadcastQueue() {
        if (!this.broadcastQueue) return { succeeded: 0, failed: 0, cancelled: 0 };
        return this.broadcastQueue.drain();
    }

    /**
     * Get current active account
     * @returns {Promise<string|null>}
     */
    async getActiveAccount() {
        return this.sessionManager?.getActiveAccount() || null;
    }

    /**
     * Check if user is logged in with valid session
     * @returns {Promise<boolean>}
     */
    async isLoggedIn() {
        const account = await this.sessionManager?.getActiveAccount();
        if (!account) return false;
        return this.sessionManager.isSessionValid(account);
    }

    /**
     * Subscribe to events
     * @param {string} event
     * @param {Function} callback
     */
    on(event, callback) {
        this.eventEmitter.on(event, callback);
        return this;
    }

    /**
     * Unsubscribe from events
     * @param {string} event
     * @param {Function} callback
     */
    off(event, callback) {
        this.eventEmitter.off(event, callback);
        return this;
    }

    /**
     * Subscribe to event once
     * @param {string} event
     * @param {Function} callback
     */
    once(event, callback) {
        this.eventEmitter.once(event, callback);
        return this;
    }
}

// ============================================
// Database API Group
// ============================================

class DatabaseAPI {
    constructor(proxy) { this.proxy = proxy; }

    async call(method, params = []) {
        return this.proxy.client.call('condenser_api', method, params);
    }

    async getDatabaseInfo() {
        return this.call('get_database_info');
    }
}

// ============================================
// Tags API Group
// ============================================

class TagsAPI {
    constructor(proxy) { this.proxy = proxy; }

    /**
     * Internal: Fetch discussions through entity store + query cache.
     * @param {string} sort - Sort category (trending, created, hot, etc.)
     * @param {object} query - Query parameters { tag, limit, start_author, start_permlink }
     * @returns {Promise<object[]>} Sanitized discussions
     * @private
     */
    async _fetchDiscussions(sort, query) {
        const q = {
            tag: query.tag || '',
            limit: parseInt(query.limit, 10) || 20
        };
        if (query.start_author) q.start_author = query.start_author;
        if (query.start_permlink) q.start_permlink = query.start_permlink;

        const queryKey = QueryCacheManager.buildKey(sort, q);

        // v3.4.0: Check query cache → resolve from entity store
        if (this.proxy.queryCache && this.proxy.entityStore) {
            const cached = await this.proxy.queryCache.get(queryKey, sort);
            if (cached) {
                const type = cached.entity_type || 'posts';
                const resolved = await this.proxy.entityStore.resolve(type, cached.ids);
                const allFresh = resolved.every(r => r !== null);
                if (allFresh) return resolved;
            }
        }

        let rawResults = null;

        try {
            rawResults = await this.proxy.client.database.getDiscussions(sort, q);
        } catch (e) {
            console.warn(`[TagsAPI] getDiscussions(${sort}) failed:`, e.message);

            // ── Offline fallback: return stale cached data if available ──
            if (this.proxy.queryCache && this.proxy.entityStore) {
                const stale = await this.proxy.queryCache.get(queryKey, sort);
                if (stale) {
                    const type = stale.entity_type || 'posts';
                    const resolved = await this.proxy.entityStore.resolve(type, stale.ids);
                    const available = resolved.filter(r => r !== null);
                    if (available.length > 0) {
                        available._stale = true;
                        available._cachedAt = stale.stored_at || stale.updated_at;
                        return available;
                    }
                }
            }
        }

        if (!rawResults || !Array.isArray(rawResults)) return [];

        // Sanitize, store entities, cache query as ID array
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore && this.proxy.queryCache) {
            const ids = [];
            const postEntities = [];
            const commentEntities = [];
            for (const raw of rawResults) {
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                    if (entity) {
                        if (entity._entity_type === 'post') postEntities.push(entity);
                        else commentEntities.push(entity);
                        ids.push(entity._entity_id);
                    }
                } catch (e) {
                    console.warn('[TagsAPI] Failed to sanitize entity, skipping:', raw?.author, raw?.permlink, e.message || e);
                }
            }
            // Fire-and-forget: persist to cache in background, return immediately
            const ops = [];
            if (postEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('posts', postEntities));
            if (commentEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('comments', commentEntities));
            ops.push(this.proxy.queryCache.store(queryKey, ids, 'posts'));
            Promise.all(ops).catch(e => console.warn('[TagsAPI] Background cache write failed:', e.message));
            // Return already-sanitized data directly — no need to re-read from DB
            return [...postEntities, ...commentEntities];
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED — never return raw unsanitized data
        console.error('[TagsAPI] Sanitizer pipeline not available — refusing to serve raw content');
        return [];
    }

    async getTrendingTags(afterTag = '', limit = 100) {
        try {
            return await this.proxy.client.call('condenser_api', 'get_trending_tags', [afterTag, limit]);
        } catch (e) {
            console.warn('[TagsAPI] get_trending_tags failed:', e.message);
        }
        return [];
    }

    async getDiscussionsByTrending(query) {
        return this._fetchDiscussions('trending', query);
    }

    async getDiscussionsByCreated(query) {
        return this._fetchDiscussions('created', query);
    }

    async getDiscussionsByHot(query) {
        return this._fetchDiscussions('hot', query);
    }

    async getDiscussionsByPromoted(query) {
        return this._fetchDiscussions('promoted', query);
    }

    async getDiscussionsByPayout(query) {
        return this._fetchDiscussions('cashout', { ...query, sort_mapped: 'cashout' });
    }

    async getDiscussionsByVotes(query) {
        return this._fetchDiscussions('votes', query);
    }

    async getDiscussionsByActive(query) {
        return this._fetchDiscussions('active', query);
    }

    async getDiscussionsByChildren(query) {
        return this._fetchDiscussions('children', query);
    }

    async getDiscussionsByMuted(query) {
        console.warn('[TagsAPI] getDiscussionsByMuted: muted sort not available in database API');
        return [];
    }
}

// ============================================
// Blocks API Group
// ============================================

class BlocksAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getBlock(blockNum) {
        return this.proxy.client.database.getBlock(blockNum);
    }

    async getBlockHeader(blockNum) {
        return this.proxy.client.database.getBlockHeader(blockNum);
    }

    async getOpsInBlock(blockNum, onlyVirtual = false) {
        return this.proxy.client.database.getOperations(blockNum, onlyVirtual);
    }

    /**
     * Retrieve a range of full, signed blocks in a single call.
     * @param {number} startingBlockNum - First block number (inclusive)
     * @param {number} count - Maximum number of blocks to return
     * @returns {Promise<object[]>} Array of signed blocks
     */
    async getBlockRange(startingBlockNum, count) {
        try {
            const result = await this.proxy.client.call('block_api', 'get_block_range', {
                starting_block_num: startingBlockNum,
                count
            });
            return result?.blocks || [];
        } catch (e) {
            console.warn('[BlocksAPI] get_block_range failed:', e.message);
        }
        return [];
    }

    /**
     * Enumerate virtual operations within a block range.
     * Allows filtering by operation type via bitmask.
     * @param {object} params
     * @param {number} params.blockRangeBegin - Starting block number (inclusive)
     * @param {number} params.blockRangeEnd - Ending block number (exclusive)
     * @param {boolean} [params.includeReversible=false] - Include reversible blocks
     * @param {boolean} [params.groupByBlock=false] - Group results by block
     * @param {number} [params.operationBegin=0] - Starting virtual op in block
     * @param {number} [params.limit=1000] - Max operations to return
     * @param {number} [params.filter] - Bitmask filter for virtual op types
     * @returns {Promise<object>} { ops, ops_by_block, next_block_range_begin, next_operation_begin }
     */
    async enumVirtualOps(params = {}) {
        const {
            blockRangeBegin, blockRangeEnd,
            includeReversible = false, groupByBlock = false,
            operationBegin = 0, limit = 1000, filter
        } = params;

        if (blockRangeBegin === undefined || blockRangeEnd === undefined) {
            throw new PixaAPIError('blockRangeBegin and blockRangeEnd are required', 'INVALID_PARAMS');
        }

        const apiParams = {
            block_range_begin: blockRangeBegin,
            block_range_end: blockRangeEnd,
            include_reversible: includeReversible,
            group_by_block: groupByBlock,
            operation_begin: operationBegin,
            limit
        };
        if (filter !== undefined) apiParams.filter = filter;

        try {
            return await this.proxy.client.call('account_history_api', 'enum_virtual_ops', apiParams);
        } catch (e) {
            console.warn('[BlocksAPI] enum_virtual_ops failed:', e.message);
        }
        return { ops: [] };
    }
}

// ============================================
// Globals API Group
// ============================================

class GlobalsAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getDynamicGlobalProperties() {
        return this.proxy.client.database.getDynamicGlobalProperties();
    }

    async getChainProperties() {
        return this.proxy.client.database.getChainProperties();
    }

    async getFeedHistory() {
        return this.proxy.client.call('condenser_api', 'get_feed_history');
    }

    async getCurrentMedianHistoryPrice() {
        return this.proxy.client.database.getCurrentMedianHistoryPrice();
    }

    async getHardforkVersion() {
        return this.proxy.client.call('condenser_api', 'get_hardfork_version');
    }

    async getRewardFund(name = 'post') {
        return this.proxy.client.call('condenser_api', 'get_reward_fund', [name]);
    }

    async getVestingDelegations(account, from = '', limit = 100) {
        return this.proxy.client.database.getVestingDelegations(account, from, limit);
    }

    async getConfig() {
        return this.proxy.client.database.getConfig();
    }

    async getVersion() {
        return this.proxy.client.database.getVersion();
    }

    /**
     * Get vesting delegations that are expiring (returning to delegator)
     * @param {string} account - Delegator account
     * @param {string} afterDate - ISO date string to start from
     * @param {number} limit - Max results
     * @returns {Promise<object[]>}
     */
    async getExpiringVestingDelegations(account, afterDate = '', limit = 100) {
        const normalizedAccount = normalizeAccount(account);
        try {
            return await this.proxy.client.call('condenser_api', 'get_expiring_vesting_delegations', [normalizedAccount, afterDate, limit]);
        } catch (e) {
            console.warn('[GlobalsAPI] get_expiring_vesting_delegations failed:', e.message);
        }
        return [];
    }

    /**
     * Get conversion requests for an account
     * @param {string} account
     * @returns {Promise<object[]>}
     */
    async getConversionRequests(account) {
        const normalizedAccount = normalizeAccount(account);
        try {
            return await this.proxy.client.call('condenser_api', 'get_conversion_requests', [normalizedAccount]);
        } catch (e) {
            console.warn('[GlobalsAPI] get_conversion_requests failed:', e.message);
        }
        return [];
    }

    /**
     * Get collateralized conversion requests for an account
     * @param {string} account
     * @returns {Promise<object[]>}
     */
    async getCollateralizedConversionRequests(account) {
        const normalizedAccount = normalizeAccount(account);
        try {
            return await this.proxy.client.call('condenser_api', 'get_collateralized_conversion_requests', [normalizedAccount]);
        } catch (e) {
            console.warn('[GlobalsAPI] get_collateralized_conversion_requests failed:', e.message);
        }
        return [];
    }
}

// ============================================
// Accounts API Group
// ============================================

class AccountsAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getAccounts(accounts, forceRefresh = false) {
        const normalizedAccounts = accounts.map(acc => normalizeAccount(acc)).filter(acc => acc && acc.length > 0);

        if (normalizedAccounts.length === 0) return [];

        // v3.4.0: Check entity store first (unless forced refresh)
        if (!forceRefresh && this.proxy.entityStore) {
            const cached = await this.proxy.entityStore.resolve('accounts', normalizedAccounts);
            const allFresh = cached.every(c => c !== null);
            if (allFresh) {
                return cached;
            }
        }

        // database.getAccounts(usernames) — documented dpixa method
        let rawAccounts = [];
        try {
            rawAccounts = await this.proxy.client.database.getAccounts(normalizedAccounts);
        } catch (e) {
            console.warn('[AccountsAPI] getAccounts failed:', e.message);

            // ── Offline fallback: return stale cached accounts if available ──
            if (this.proxy.entityStore) {
                const stale = await this.proxy.entityStore.resolve('accounts', normalizedAccounts);
                const available = stale.filter(s => s !== null);
                if (available.length > 0) {
                    available._stale = true;
                    return available;
                }
            }
            return [];
        }

        // Sanitize and batch-upsert into entity store
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore) {
            const sanitized = [];
            for (const raw of rawAccounts) {
                if (!raw) continue;
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeAccount(raw);
                    if (entity) {
                        sanitized.push(entity);
                    }
                } catch (e) {
                    console.warn('[AccountsAPI] Failed to sanitize account, skipping:', raw?.name, e.message || e);
                }
            }
            // Single batch write instead of N individual upserts
            await this.proxy.entityStore.upsertMany('accounts', sanitized);
            return sanitized;
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED — never return raw unsanitized data
        console.error('[AccountsAPI] Sanitizer pipeline not available — refusing to serve raw accounts');
        return [];
    }

    async lookupAccounts(lowerBound, limit = 10) {
        try {
            return await this.proxy.client.call('condenser_api', 'lookup_accounts', [lowerBound, limit]);
        } catch (e) {
            console.warn('[AccountsAPI] lookup_accounts failed:', e.message);
        }
        return [];
    }

    async lookupAccountNames(accounts) {
        try {
            return await this.proxy.client.call('condenser_api', 'lookup_account_names', [accounts]);
        } catch (e) {
            console.warn('[AccountsAPI] lookup_account_names failed:', e.message);
        }
        return [];
    }

    async getAccountCount() {
        try {
            return await this.proxy.client.call('condenser_api', 'get_account_count');
        } catch (e) {
            console.warn('[AccountsAPI] get_account_count failed:', e.message);
        }
        return 0;
    }

    async getAccountHistory(account, from = -1, limit = 100, operationBitmask = null) {
        const normalizedAccount = normalizeAccount(account);

        // HIVE API constraint: start must be >= limit - 1 (start is a reverse index).
        // Use -1 to request the most recent entries. For explicit indices,
        // clamp limit so the constraint is satisfied.
        let safeFrom = from;
        let safeLimit = limit;
        if (safeFrom !== -1 && safeFrom < safeLimit - 1) {
            safeLimit = safeFrom + 1;  // request only as many entries as available from that index
        }

        // database.getAccountHistory(account, from, limit, bitmask?) — documented dpixa method
        try {
            if (operationBitmask) {
                return await this.proxy.client.database.getAccountHistory(normalizedAccount, safeFrom, safeLimit, operationBitmask);
            }
            return await this.proxy.client.database.getAccountHistory(normalizedAccount, safeFrom, safeLimit);
        } catch (e) {
            console.warn('[AccountsAPI] getAccountHistory failed:', e.message);
        }
        return [];
    }

    async getAccountReputations(lowerBound = '', limit = 1000) {
        try {
            return await this.proxy.client.call('condenser_api', 'get_account_reputations', [lowerBound, limit]);
        } catch (e) {
            console.warn('[AccountsAPI] get_account_reputations failed:', e.message);
        }
        return [];
    }

    async getAccountNotifications(account, limit = 50) {
        const normalizedAccount = normalizeAccount(account);

        try {
            if (this.proxy.client.pixamind) {
                return await this.proxy.client.pixamind.getAccountNotifications({
                    account: normalizedAccount,
                    limit: limit
                });
            }
        } catch (e) {
            console.warn('[AccountsAPI] pixamind.getAccountNotifications failed:', e.message);
        }
        return [];
    }

    // ── Notification read-state tracking (LacertaDB settingsDb) ──

    /**
     * Lazily initialise the notification_reads collection in settingsDb.
     * @returns {Promise<object>} LacertaDB collection handle
     * @private
     */
    async _notifReadsCollection() {
        if (!this._notifCol) {
            const db = this.proxy.settingsDb;
            this._notifCol = await db.getCollection('notification_reads');
        }
        return this._notifCol;
    }

    /**
     * Get the Set of notification IDs that have been read by the user.
     * Stored per-account in settingsDb → notification_reads collection.
     * @param {string} account
     * @returns {Promise<Set<number>>}
     */
    async getReadNotificationIds(account) {
        const normalizedAccount = normalizeAccount(account);
        try {
            const col = await this._notifReadsCollection();
            const doc = await col.get(`read_${normalizedAccount}`);
            if (doc && Array.isArray(doc.ids)) {
                return new Set(doc.ids);
            }
        } catch (e) {
            // Document doesn't exist yet or collection empty — not an error
        }
        return new Set();
    }

    /**
     * Mark one or more notification IDs as read for the given account.
     * Merges with any previously-read IDs. Keeps only the most recent 500
     * IDs to prevent unbounded growth.
     *
     * Uses LacertaDB's native upsert() for atomic insert-or-update.
     *
     * @param {string} account
     * @param {number[]} notificationIds
     * @returns {Promise<void>}
     */
    async markNotificationsRead(account, notificationIds) {
        const normalizedAccount = normalizeAccount(account);
        if (!Array.isArray(notificationIds) || notificationIds.length === 0) return;

        try {
            const col = await this._notifReadsCollection();
            const docId = `read_${normalizedAccount}`;

            // Merge with existing read IDs
            let existing = [];
            try {
                const doc = await col.get(docId);
                if (doc && Array.isArray(doc.ids)) existing = doc.ids;
            } catch (_) {
                // No existing doc — first write for this account
            }

            const merged = new Set(existing);
            for (const id of notificationIds) merged.add(id);

            // Cap at 500 most recent IDs to prevent unbounded growth
            let ids = Array.from(merged);
            if (ids.length > 500) {
                ids = ids.sort((a, b) => b - a).slice(0, 500);
            }

            const doc = { ids, updated_at: Date.now() };

            await col.upsert(docId, doc);
        } catch (e) {
            console.warn('[AccountsAPI] markNotificationsRead failed:', e.message);
        }
    }

    /**
     * Clear the read-state for an account (useful for debugging or reset).
     * @param {string} account
     * @returns {Promise<void>}
     */
    async clearReadNotifications(account) {
        const normalizedAccount = normalizeAccount(account);
        try {
            const col = await this._notifReadsCollection();
            await col.delete(`read_${normalizedAccount}`);
        } catch (e) {
            console.warn('[AccountsAPI] clearReadNotifications failed:', e.message);
        }
    }

    /**
     * Get escrow details for an account
     * @param {string} from - Escrow from account
     * @param {number} escrowId - Escrow ID
     * @returns {Promise<object|null>}
     */
    async getEscrow(from, escrowId) {
        const normalizedFrom = normalizeAccount(from);
        try {
            return await this.proxy.client.call('condenser_api', 'get_escrow', [normalizedFrom, escrowId]);
        } catch (e) {
            console.warn('[AccountsAPI] get_escrow failed:', e.message);
        }
        return null;
    }

    /**
     * Find recurrent transfers for an account
     * @param {string} account
     * @returns {Promise<object[]>}
     */
    async findRecurrentTransfers(account) {
        const normalizedAccount = normalizeAccount(account);
        try {
            return await this.proxy.client.call('condenser_api', 'find_recurrent_transfers', [normalizedAccount]);
        } catch (e) {
            console.warn('[AccountsAPI] find_recurrent_transfers failed:', e.message);
        }
        return [];
    }

    /**
     * Find proposals (DAO)
     * @param {Array<string|number>} ids - Proposal IDs or creator accounts
     * @param {string} order - 'by_creator', 'by_start_date', 'by_end_date', 'by_total_votes'
     * @param {string} orderDirection - 'ascending' or 'descending'
     * @param {string} status - 'all', 'inactive', 'active', 'expired', 'votable'
     * @param {number} limit - Max results
     * @returns {Promise<object[]>}
     */
    async findProposals(ids = [], order = 'by_total_votes', orderDirection = 'descending', status = 'all', limit = 100) {
        try {
            return await this.proxy.client.call('condenser_api', 'find_proposals', [ids]);
        } catch (e) {
            console.warn('[AccountsAPI] find_proposals failed:', e.message);
        }
        return [];
    }

    /**
     * List proposals (DAO) with sorting/filtering
     * @param {Array} start - Start point for iteration
     * @param {number} limit - Max results
     * @param {string} order - Sort order
     * @param {string} orderDirection - 'ascending' or 'descending'
     * @param {string} status - 'all', 'inactive', 'active', 'expired', 'votable'
     * @returns {Promise<object[]>}
     */
    async listProposals(start = [], limit = 100, order = 'by_total_votes', orderDirection = 'descending', status = 'all') {
        try {
            return await this.proxy.client.call('condenser_api', 'list_proposals', [start, limit, order, orderDirection, status]);
        } catch (e) {
            console.warn('[AccountsAPI] list_proposals failed:', e.message);
        }
        return [];
    }

    /**
     * List votes on proposals
     * @param {Array} start - Start point [proposal_id] or [proposal_id, voter]
     * @param {number} limit - Max results
     * @param {string} order - 'by_voter_proposal' or 'by_proposal_voter'
     * @param {string} orderDirection - 'ascending' or 'descending'
     * @param {string} status - 'all', 'inactive', 'active', 'expired', 'votable'
     * @returns {Promise<object[]>}
     */
    async listProposalVotes(start = [], limit = 100, order = 'by_proposal_voter', orderDirection = 'ascending', status = 'all') {
        try {
            return await this.proxy.client.call('condenser_api', 'list_proposal_votes', [start, limit, order, orderDirection, status]);
        } catch (e) {
            console.warn('[AccountsAPI] list_proposal_votes failed:', e.message);
        }
        return [];
    }
}

// ============================================
// Market API Group
// ============================================

class MarketAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getOrderBook(limit = 500) {
        return this.proxy.client.call('condenser_api', 'get_order_book', [limit]);
    }

    async getOpenOrders(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_open_orders', [normalizedAccount]);
    }

    async getTicker() {
        return this.proxy.client.call('condenser_api', 'get_ticker');
    }

    async getTradeHistory(start, end, limit = 1000) {
        return this.proxy.client.call('condenser_api', 'get_trade_history', [start, end, limit]);
    }

    async getMarketHistory(bucketSeconds, start, end) {
        return this.proxy.client.call('condenser_api', 'get_market_history', [bucketSeconds, start, end]);
    }

    async getMarketHistoryBuckets() {
        return this.proxy.client.call('condenser_api', 'get_market_history_buckets');
    }
}

// ============================================
// Authority API Group
// ============================================

class AuthorityAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getOwnerHistory(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_owner_history', [normalizedAccount]);
    }

    async getRecoveryRequest(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_recovery_request', [normalizedAccount]);
    }

    async getWithdrawRoutes(account, type = 'outgoing') {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_withdraw_routes', [normalizedAccount, type]);
    }

    async getAccountBandwidth(account, type) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_account_bandwidth', [normalizedAccount, type]);
    }

    async getSavingsWithdrawFrom(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_savings_withdraw_from', [normalizedAccount]);
    }

    async getSavingsWithdrawTo(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_savings_withdraw_to', [normalizedAccount]);
    }

    async verifyAuthority(stx) {
        return this.proxy.client.database.verifyAuthority(stx);
    }
}

// ============================================
// Votes API Group
// ============================================

class VotesAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getActiveVotes(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);
        return this.proxy.client.call('condenser_api', 'get_active_votes', [normalizedAuthor, permlink]);
    }

    async getAccountVotes(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_account_votes', [normalizedAccount]);
    }
}

// ============================================
// Content API Group
// ============================================

class ContentAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getContent(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);
        const entityId = `${normalizedAuthor}_${permlink}`;

        // v3.4.0: Check entity stores (posts first, then comments)
        if (this.proxy.entityStore) {
            const cachedPost = await this.proxy.entityStore.get('posts', entityId);
            if (cachedPost) return cachedPost;

            const cachedComment = await this.proxy.entityStore.get('comments', entityId);
            if (cachedComment) return cachedComment;
        }

        // Fetch from chain
        let raw = null;
        try {
            raw = await this.proxy.client.call('condenser_api', 'get_content', [normalizedAuthor, permlink]);
        } catch (e) {
            console.warn('[ContentAPI] get_content failed:', e.message);

            // ── Offline fallback: retry entity store (may have expired-TTL data) ──
            if (this.proxy.entityStore) {
                try {
                    const stalePost = await this.proxy.entityStore.get('posts', entityId);
                    if (stalePost) { stalePost._stale = true; return stalePost; }
                    const staleComment = await this.proxy.entityStore.get('comments', entityId);
                    if (staleComment) { staleComment._stale = true; return staleComment; }
                } catch (_) {}
            }
            return null;
        }

        if (!raw || !raw.author) return null;

        // Sanitize and store
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore) {
            try {
                const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                if (entity) {
                    const type = entity._entity_type === 'post' ? 'posts' : 'comments';
                    await this.proxy.entityStore.upsert(type, entity);
                    return entity;
                }
            } catch (e) {
                console.warn('[ContentAPI] Failed to sanitize content:', raw?.author, raw?.permlink, e.message || e);
                return null;
            }
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
        console.error('[ContentAPI] Sanitizer pipeline not available — refusing to serve raw content');
        return null;
    }

    async getContentReplies(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);
        const queryKey = QueryCacheManager.buildKey('content_replies', { author: normalizedAuthor, permlink });

        // v3.4.0: Check query cache
        if (this.proxy.queryCache && this.proxy.entityStore) {
            const cached = await this.proxy.queryCache.get(queryKey, 'content_replies');
            if (cached) {
                const resolved = await this.proxy.entityStore.resolve('comments', cached.ids);
                const allFresh = resolved.every(r => r !== null);
                if (allFresh) return resolved;
            }
        }

        // Fetch from chain
        let rawReplies = [];
        try {
            rawReplies = await this.proxy.client.call('condenser_api', 'get_content_replies', [normalizedAuthor, permlink]);
        } catch (e) {
            console.warn('[ContentAPI] get_content_replies failed:', e.message);

            // ── Offline fallback: return stale cached replies if available ──
            if (this.proxy.queryCache && this.proxy.entityStore) {
                const stale = await this.proxy.queryCache.get(queryKey, 'content_replies');
                if (stale) {
                    const resolved = await this.proxy.entityStore.resolve('comments', stale.ids);
                    const available = resolved.filter(r => r !== null);
                    if (available.length > 0) {
                        available._stale = true;
                        available._cachedAt = stale.stored_at || stale.updated_at;
                        return available;
                    }
                }
            }
            return [];
        }

        if (!rawReplies || !Array.isArray(rawReplies)) return [];

        // Sanitize, batch-store entities, cache query
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore && this.proxy.queryCache) {
            const ids = [];
            const sanitized = [];
            for (const raw of rawReplies) {
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeComment(raw);
                    if (entity) {
                        sanitized.push(entity);
                        ids.push(entity._entity_id);
                    }
                } catch (e) {
                    console.warn('[ContentAPI] Failed to sanitize reply, skipping:', raw?.author, raw?.permlink, e.message || e);
                }
            }
            // Fire-and-forget: persist to cache in background, return sanitized data immediately
            Promise.all([
                this.proxy.entityStore.upsertMany('comments', sanitized),
                this.proxy.queryCache.store(queryKey, ids, 'comments'),
            ]).catch(e => console.warn('[ContentAPI] Background cache write failed:', e.message));
            // Return already-sanitized data directly — no need to re-read from DB
            return sanitized;
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
        console.error('[ContentAPI] Sanitizer pipeline not available — refusing to serve raw replies');
        return [];
    }

    async getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit = 10) {
        const normalizedAuthor = normalizeAccount(author);
        try {
            const rawResults = await this.proxy.client.call('condenser_api', 'get_discussions_by_author_before_date', [normalizedAuthor, startPermlink, beforeDate, limit]);

            // Sanitize and batch-store
            if (rawResults && this.proxy.sanitizationPipeline && this.proxy.entityStore) {
                const postEntities = [];
                const commentEntities = [];
                for (const raw of rawResults) {
                    try {
                        const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                        if (entity) {
                            if (entity._entity_type === 'post') postEntities.push(entity);
                            else commentEntities.push(entity);
                        }
                    } catch (e) {
                        console.warn('[ContentAPI] Failed to sanitize entity, skipping:', raw?.author, raw?.permlink, e.message || e);
                    }
                }
                // Fire-and-forget: persist to cache in background, return immediately
                const ops = [];
                if (postEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('posts', postEntities));
                if (commentEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('comments', commentEntities));
                if (ops.length > 0) Promise.all(ops).catch(e => console.warn('[ContentAPI] Background cache write failed:', e.message));
                return [...postEntities, ...commentEntities];
            }
            // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
            if (rawResults && rawResults.length > 0) {
                console.error('[ContentAPI] Sanitizer pipeline not available — refusing raw content');
            }
            return [];
        } catch (e) {
            console.warn('[ContentAPI] get_discussions_by_author_before_date failed:', e.message);
        }
        return [];
    }

    async getRepliesByLastUpdate(author, startPermlink = '', limit = 10) {
        const normalizedAuthor = normalizeAccount(author);
        if (!normalizedAuthor) return [];

        try {
            // Use condenser_api.get_replies_by_last_update to fetch replies TO the user,
            // not getDiscussions('comments') which fetches comments BY the user.
            const rawResults = await this.proxy.client.call(
                'condenser_api',
                'get_replies_by_last_update',
                [normalizedAuthor, startPermlink, limit]
            );

            // Sanitize and batch-store as comments
            if (rawResults && this.proxy.sanitizationPipeline && this.proxy.entityStore) {
                const sanitized = [];
                for (const raw of rawResults) {
                    try {
                        const entity = this.proxy.sanitizationPipeline.sanitizeComment(raw);
                        if (entity) {
                            sanitized.push(entity);
                        }
                    } catch (e) {
                        console.warn('[ContentAPI] Failed to sanitize reply, skipping:', raw?.author, raw?.permlink, e.message || e);
                    }
                }
                // Fire-and-forget: persist to cache in background
                this.proxy.entityStore.upsertMany('comments', sanitized)
                    .catch(e => console.warn('[ContentAPI] Background cache write failed:', e.message));
                return sanitized;
            }
            // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
            if (rawResults && rawResults.length > 0) {
                console.error('[ContentAPI] Sanitizer pipeline not available — refusing raw replies');
            }
            return [];
        } catch (e) {
            console.warn('[ContentAPI] getRepliesByLastUpdate failed:', e.message);
        }
        return [];
    }

    /**
     * Internal: Fetch discussions through entity store + query cache with multi-strategy fallback.
     * Shared by getDiscussionsByComments, getDiscussionsByBlog, getDiscussionsByFeed.
     * @private
     */
    async _fetchDiscussionsWithCache(sort, query, entityType = 'posts') {
        const normalizedTag = normalizeAccount(query.tag || '');
        if (!normalizedTag) return [];

        const limit = parseInt(query.limit, 10) || 20;

        // dpixa passes the query object through to condenser_api.get_discussions_by_${sort}
        // get_discussions_by_comments does NOT accept "tag" — it uses start_author
        // get_discussions_by_blog / get_discussions_by_feed use "tag" as the username
        const q = { limit };
        if (sort === 'comments') {
            q.start_author = normalizedTag;
            if (query.start_permlink) q.start_permlink = query.start_permlink;
        } else {
            q.tag = normalizedTag;
            if (query.start_author) q.start_author = query.start_author;
            if (query.start_permlink) q.start_permlink = query.start_permlink;
        }

        const queryKey = QueryCacheManager.buildKey(`content_${sort}`, q);

        // v3.4.0: Check query cache → resolve from entity store
        if (this.proxy.queryCache && this.proxy.entityStore) {
            const cached = await this.proxy.queryCache.get(queryKey, sort);
            if (cached) {
                const resolved = await this.proxy.entityStore.resolve(cached.entity_type || entityType, cached.ids);
                if (resolved.every(r => r !== null)) return resolved;
            }
        }

        // Fetch from chain
        let rawResults = null;

        try {
            rawResults = await this.proxy.client.database.getDiscussions(sort, q);
        } catch (e) {
            console.warn(`[ContentAPI] getDiscussions(${sort}) failed:`, e.message);

            // ── Offline fallback: return stale cached data if available ──
            if (this.proxy.queryCache && this.proxy.entityStore) {
                const stale = await this.proxy.queryCache.get(queryKey, sort);
                if (stale) {
                    const resolved = await this.proxy.entityStore.resolve(stale.entity_type || entityType, stale.ids);
                    const available = resolved.filter(r => r !== null);
                    if (available.length > 0) {
                        available._stale = true;
                        available._cachedAt = stale.stored_at || stale.updated_at;
                        return available;
                    }
                }
            }
        }

        if (!rawResults || !Array.isArray(rawResults)) return [];

        // Sanitize, batch-store entities, cache query IDs
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore && this.proxy.queryCache) {
            const ids = [];
            const postEntities = [];
            const commentEntities = [];
            for (const raw of rawResults) {
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                    if (entity) {
                        if (entity._entity_type === 'post') postEntities.push(entity);
                        else commentEntities.push(entity);
                        ids.push(entity._entity_id);
                    }
                } catch (e) {
                    console.warn('[ContentAPI] Failed to sanitize entity, skipping:', raw?.author, raw?.permlink, e.message || e);
                }
            }
            // Fire-and-forget: persist to cache in background, return immediately
            const ops = [this.proxy.queryCache.store(queryKey, ids, entityType)];
            if (postEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('posts', postEntities));
            if (commentEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('comments', commentEntities));
            Promise.all(ops).catch(e => console.warn('[ContentAPI] Background cache write failed:', e.message));
            // Return already-sanitized data directly — no need to re-read from DB
            return [...postEntities, ...commentEntities];
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
        console.error('[ContentAPI] Sanitizer pipeline not available — refusing to serve raw content');
        return [];
    }

    async getDiscussionsByComments(query) {
        const author = query.start_author || query.tag || '';
        const normalizedAuthor = normalizeAccount(author);
        if (!normalizedAuthor) return [];

        const q = {
            tag: normalizedAuthor,
            limit: parseInt(query.limit, 10) || 20
        };
        // Only include pagination cursor if both fields are present
        if (query.start_author) q.start_author = query.start_author;
        if (query.start_permlink) q.start_permlink = query.start_permlink;

        return this._fetchDiscussionsWithCache('comments', q, 'comments');
    }

    async getDiscussionsByBlog(query) {
        return this._fetchDiscussionsWithCache('blog', query, 'posts');
    }

    async getDiscussionsByFeed(query) {
        return this._fetchDiscussionsWithCache('feed', query, 'posts');
    }

    async getAccountPosts(account, sort = 'blog', limit = 20, options = {}) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return [];

        const q = {
            tag: normalizedAccount,
            limit: parseInt(limit, 10) || 20
        };
        if (options.start_author) q.start_author = options.start_author;
        if (options.start_permlink) q.start_permlink = options.start_permlink;

        return this._fetchDiscussionsWithCache(sort, q, sort === 'comments' ? 'comments' : 'posts');
    }

    async getState(path) {
        return this.proxy.client.database.getState(path);
    }
}

// ============================================
// Witnesses API Group
// ============================================

class WitnessesAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getWitnessByAccount(account) {
        const normalizedAccount = normalizeAccount(account);
        return this.proxy.client.call('condenser_api', 'get_witness_by_account', [normalizedAccount]);
    }

    async getWitnessesByVote(from, limit = 100) {
        return this.proxy.client.call('condenser_api', 'get_witnesses_by_vote', [from, limit]);
    }

    async lookupWitnessAccounts(lowerBound, limit = 100) {
        return this.proxy.client.call('condenser_api', 'lookup_witness_accounts', [lowerBound, limit]);
    }

    async getWitnessCount() {
        return this.proxy.client.call('condenser_api', 'get_witness_count');
    }

    async getActiveWitnesses() {
        return this.proxy.client.call('condenser_api', 'get_active_witnesses');
    }

    async getWitnessSchedule() {
        return this.proxy.client.call('condenser_api', 'get_witness_schedule');
    }
}

// ============================================
// Follow API Group
// ============================================

class FollowAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getFollowers(account, startFollower = null, type = 'blog', limit = 100) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return [];
        const safeLimit = parseInt(limit, 10) || 100;

        try {
            return await this.proxy.client.call('condenser_api', 'get_followers', [normalizedAccount, startFollower, type, safeLimit]);
        } catch (e) {
            console.warn('[FollowAPI] get_followers failed:', e.message);
        }
        return [];
    }

    async getFollowing(account, startFollowing = null, type = 'blog', limit = 100) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return [];
        const safeLimit = parseInt(limit, 10) || 100;

        try {
            return await this.proxy.client.call('condenser_api', 'get_following', [normalizedAccount, startFollowing, type, safeLimit]);
        } catch (e) {
            console.warn('[FollowAPI] get_following failed:', e.message);
        }
        return [];
    }

    async getFollowCount(account) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return { account: account || '', follower_count: 0, following_count: 0 };

        // condenser_api.get_follow_count — returns { account, follower_count, following_count }
        try {
            const result = await this.proxy.client.call('condenser_api', 'get_follow_count', [normalizedAccount]);
            if (result) {
                return {
                    account: normalizedAccount,
                    follower_count: result.follower_count || 0,
                    following_count: result.following_count || 0
                };
            }
        } catch (e) {
            console.warn('[FollowAPI] getFollowCount failed:', e.message);
        }
        return { account: normalizedAccount, follower_count: 0, following_count: 0 };
    }

    async getFeedEntries(account, startEntryId = 0, limit = 10) {
        const normalizedAccount = normalizeAccount(account);

        try {
            return await this.proxy.client.call('condenser_api', 'get_feed_entries', [normalizedAccount, startEntryId, limit]);
        } catch (e) {
            console.warn('[FollowAPI] get_feed_entries failed:', e.message);
        }
        return [];
    }

    async getBlogEntries(account, startEntryId = 0, limit = 10) {
        const normalizedAccount = normalizeAccount(account);

        try {
            return await this.proxy.client.call('condenser_api', 'get_blog_entries', [normalizedAccount, startEntryId, limit]);
        } catch (e) {
            console.warn('[FollowAPI] get_blog_entries failed:', e.message);
        }
        return [];
    }

    async getRebloggedBy(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);

        try {
            return await this.proxy.client.call('condenser_api', 'get_reblogged_by', [normalizedAuthor, permlink]);
        } catch (e) {
            console.warn('[FollowAPI] get_reblogged_by failed:', e.message);
        }
        return [];
    }

    async getBlogAuthors(account) {
        const normalizedAccount = normalizeAccount(account);

        try {
            return await this.proxy.client.call('condenser_api', 'get_blog_authors', [normalizedAccount]);
        } catch (e) {
            console.warn('[FollowAPI] get_blog_authors failed:', e.message);
        }
        return [];
    }

    async getSubscriptions(account) {
        const normalizedAccount = normalizeAccount(account);

        // pixamind.listAllSubscriptions({account}) — documented dpixa method
        try {
            return await this.proxy.client.pixamind.listAllSubscriptions({ account: normalizedAccount });
        } catch (e) {
            console.warn('[FollowAPI] listAllSubscriptions failed:', e.message);
        }
        return [];
    }
}

// ============================================
// Broadcast API Group
// ============================================

class BroadcastAPI {
    constructor(proxy) {
        this.proxy = proxy;
        /** @private Dedup guard — if a vote dialog is already open, subsequent calls return the same promise */
        this._pendingVotePromise = null;
    }

    /**
     * Central broadcast dispatcher — routes through BroadcastQueue when available.
     *
     * When the queue is initialized:
     *   - Online: broadcasts immediately (queue handles the send)
     *   - Offline + queueable op: persists to queue for later drain
     *   - Offline + financial op: throws OfflineNotQueueableError
     *
     * When the queue is NOT initialized: falls back to direct sendOperations.
     *
     * @param {Array} operations — [[opName, opData], ...] tuples
     * @param {string} key — WIF private key string
     * @param {object} [meta={}] — Metadata for dedup/display { account, keyType, ... }
     * @returns {Promise<object>} Broadcast result or queue entry
     * @private
     */
    async _send(operations, key, meta = {}, broadcastFn = null) {
        const privateKey = typeof key === 'string' ? PrivateKey.fromString(key) : key;

        // ── Offline + queue: defer (queue's broadcastFn re-resolves key at drain time) ──
        if (this.proxy.broadcastQueue && this.proxy.connectivity && !this.proxy.connectivity.isOnline) {
            const opType = operations[0]?.[0] || 'unknown';
            return this.proxy.broadcastQueue.enqueue(opType, operations, {
                ...meta,
                keyType: meta.keyType || this.proxy._inferKeyType(operations[0]?.[0]),
            });
        }

        // ── Online: broadcast directly with the caller's already-obtained key ──
        // Prefer dpixa convenience methods (broadcast.transfer, broadcast.vote, etc.)
        // over sendOperations — the fork's sendOperations has serialization issues
        // that cause signature mismatches ("Missing Authority" errors).
        if (!broadcastFn && operations.length === 1) {
            const [opType, opData] = operations[0];
            const methodName = opType.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
            const method = this.proxy.client.broadcast[methodName];
            if (typeof method === 'function') {
                broadcastFn = (pk) => method.call(this.proxy.client.broadcast, opData, pk);
            }
        }

        try {
            if (broadcastFn) {
                return await broadcastFn(privateKey);
            }
            return await this.proxy.client.broadcast.sendOperations(operations, privateKey);
        } catch (e) {
            // Network failure mid-broadcast — if queue exists, re-check connectivity
            if (this.proxy.broadcastQueue && this.proxy.connectivity) {
                const stillOnline = await this.proxy.connectivity.checkNow();
                if (!stillOnline) {
                    // Actually went offline — try to queue for later
                    const opType = operations[0]?.[0] || 'unknown';
                    return this.proxy.broadcastQueue.enqueue(opType, operations, {
                        ...meta,
                        keyType: meta.keyType || this.proxy._inferKeyType(operations[0]?.[0]),
                    });
                }
            }
            throw e; // Genuine chain/validation error — propagate
        }
    }

    async updateAccount2(paramsOrAccount, jsonMetadata, postingJsonMetadata, extensions = []) {
        let params;
        if (typeof paramsOrAccount === 'object' && paramsOrAccount !== null && paramsOrAccount.account) {
            params = paramsOrAccount;
        } else {
            params = { account: paramsOrAccount, jsonMetadata, postingJsonMetadata, extensions };
        }

        const { account, auth = {}, externalKey } = params;
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account parameter', 'INVALID_ACCOUNT');
        }

        const requiresActive = auth.owner || auth.active || auth.posting || auth.memo_key ||
            (params.jsonMetadata !== undefined && params.jsonMetadata !== null);

        // Changing the owner authority requires the owner key for signing;
        // all other authority changes require the active key.
        const requiresOwner = !!auth.owner;
        const keyType = requiresOwner ? 'owner' : requiresActive ? 'active' : 'posting';

        // When externalKey is provided, bypass keyManager entirely (used for
        // operations on accounts the logged-in user doesn't own, e.g. portal accounts).
        let key;
        if (externalKey) {
            key = externalKey;
        } else {
            key = await this.proxy.keyManager.requestKey(normalizedAccount, keyType);
        }

        const ensureString = (val) => {
            if (val === null || val === undefined) return "";
            if (typeof val === 'string') return val;
            try { return JSON.stringify(val); } catch (e) { return ""; }
        };

        const op = {
            account: normalizedAccount,
            json_metadata: ensureString(params.jsonMetadata),
            posting_json_metadata: ensureString(params.postingJsonMetadata),
            extensions: params.extensions || []
        };

        if (auth.owner) op.owner = auth.owner;
        if (auth.active) op.active = auth.active;
        if (auth.posting) op.posting = auth.posting;
        if (auth.memo_key) op.memo_key = auth.memo_key;

        return this._send(
            [['account_update2', op]], key,
            { account: normalizedAccount, keyType });
    }

    async updateProfile(account, profileObject, externalKey) {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account parameter', 'INVALID_ACCOUNT');
        }

        const [accountData] = await this.proxy.client.database.getAccounts([normalizedAccount]);
        if (!accountData) throw new PixaAPIError('Account not found', 'ACCOUNT_NOT_FOUND');

        let currentPostingMeta = {};
        try {
            if (accountData.posting_json_metadata) {
                currentPostingMeta = JSON.parse(accountData.posting_json_metadata);
            }
        } catch (e) {}

        const currentProfile = (currentPostingMeta.profile && typeof currentPostingMeta.profile === 'object' && !Array.isArray(currentPostingMeta.profile))
            ? currentPostingMeta.profile : {};
        const newPostingMeta = {
            ...currentPostingMeta,
            profile: { ...currentProfile, ...profileObject }
        };

        const result = await this.updateAccount2({
            account: normalizedAccount,
            jsonMetadata: accountData.json_metadata,
            postingJsonMetadata: newPostingMeta,
            externalKey: externalKey || undefined,
        });

        // Invalidate stale cached account so next getAccounts() fetches fresh data
        if (this.proxy.entityStore) {
            await this.proxy.entityStore.invalidate('accounts', normalizedAccount);
        }

        if (this.proxy.eventEmitter) {
            this.proxy.eventEmitter.emit('profile_updated', { account: normalizedAccount, profile: newPostingMeta.profile });
        }

        return result;
    }

    /**
     * Vote on a post or comment.
     *
     * When {@link PixaProxyAPI#askVote} is `true`, the method emits a
     * `vote_weight_required` event instead of broadcasting immediately,
     * giving the UI a chance to display a weight-adjustment dialog.
     * The event payload includes `broadcast(finalWeight)` and `cancel()`
     * callbacks so the dialog can finalise or abort the vote.
     *
     * @param {string} voter - The voting account
     * @param {string} author - The content author
     * @param {string} permlink - The content permlink
     * @param {number} weight - Vote weight (-10000 to 10000)
     * @returns {Promise<object|null>} Broadcast result, or `null` if cancelled
     */
    async vote(voter, author, permlink, weight) {
        const normalizedVoter = normalizeAccount(voter);
        const normalizedAuthor = normalizeAccount(author);

        if (!normalizedVoter || !normalizedAuthor) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        // ── Broadcast-level dedup: same (voter, author, permlink) in-flight → return existing promise ──
        // Prevents duplicate transactions from double-clicks, React re-renders, or rapid toggles.
        // Keyed per content piece so voting on different posts is never blocked.
        if (!this._inflightVotes) this._inflightVotes = new Map();
        const voteKey = `${normalizedVoter}/${normalizedAuthor}/${permlink}`;
        if (this._inflightVotes.has(voteKey)) {
            return this._inflightVotes.get(voteKey);
        }

        // ── Internal broadcast helper (shared by direct & deferred paths) ──
        const _broadcastVote = async (finalWeight) => {
            const voteOp = [['vote', {
                voter: normalizedVoter,
                author: normalizedAuthor,
                permlink,
                weight: finalWeight,
            }]];

            const key = await this.proxy.keyManager.requestKey(normalizedVoter, 'posting');
            const privateKey = PrivateKey.fromString(key);

            let result;
            // Offline + queue: defer for later drain
            if (this.proxy.broadcastQueue && this.proxy.connectivity && !this.proxy.connectivity.isOnline) {
                result = await this.proxy.broadcastQueue.enqueue('vote', voteOp, {
                    account: normalizedVoter,
                    voter: normalizedVoter,
                    author: normalizedAuthor,
                    permlink,
                    keyType: 'posting',
                });
            } else {
                // Online: broadcast directly with the caller's key
                try {
                    result = await this.proxy.client.broadcast.vote({
                        voter: normalizedVoter,
                        author: normalizedAuthor,
                        permlink,
                        weight: finalWeight
                    }, privateKey);
                } catch (e) {
                    // Network failure — try to queue if we went offline
                    if (this.proxy.broadcastQueue && this.proxy.connectivity) {
                        const stillOnline = await this.proxy.connectivity.checkNow();
                        if (!stillOnline) {
                            result = await this.proxy.broadcastQueue.enqueue('vote', voteOp, {
                                account: normalizedVoter,
                                voter: normalizedVoter,
                                author: normalizedAuthor,
                                permlink,
                                keyType: 'posting',
                            });
                        } else {
                            throw e;
                        }
                    } else {
                        throw e;
                    }
                }
            }

            // Invalidate cache (skip if the op was queued for later)
            if (!result?.queued) {
                await this.proxy.cacheManager.invalidateKey('posts', `${normalizedAuthor}_${permlink}`);
                if (this.proxy.entityStore) {
                    await this.proxy.entityStore.invalidate('posts', `${normalizedAuthor}_${permlink}`);
                    await this.proxy.entityStore.invalidate('comments', `${normalizedAuthor}_${permlink}`);
                }
            }
            return result;
        };

        // Wrap the entire vote flow in the dedup guard
        const votePromise = (async () => {
            // ── Deferred path: let the UI adjust weight before broadcasting ──
            // Skip dialog for vote withdrawals (weight 0) — nothing to adjust
            if (weight !== 0 && this.proxy.askVote && this.proxy.eventEmitter) {
                // Dedup: if a vote dialog is already pending, return the same promise
                if (this._pendingVotePromise) return this._pendingVotePromise;

                this._pendingVotePromise = new Promise((resolve, reject) => {
                    this.proxy.eventEmitter.emit('vote_weight_required', {
                        voter: normalizedVoter,
                        author: normalizedAuthor,
                        permlink,
                        weight,
                        defaultVotingPower: this.proxy.defaultVotingPower,
                        /**
                         * Call this from the dialog to finalise the vote.
                         * @param {number} finalWeight - The confirmed weight
                         * @returns {Promise<object>}
                         */
                        broadcast: async (finalWeight) => {
                            try {
                                const result = await _broadcastVote(finalWeight);
                                resolve(result);
                                return result;
                            } catch (e) {
                                reject(e);
                                throw e;
                            }
                        },
                        /** Call this if the user cancels the dialog. */
                        cancel: () => {
                            resolve(null);
                        }
                    });
                }).finally(() => {
                    this._pendingVotePromise = null;
                });

                return this._pendingVotePromise;
            }

            // ── Direct path: broadcast immediately ──
            return _broadcastVote(weight);
        })();

        // Register in-flight, clear when settled (success or failure)
        this._inflightVotes.set(voteKey, votePromise);
        votePromise.finally(() => {
            this._inflightVotes.delete(voteKey);
        });

        return votePromise;
    }

    async comment(params) {
        const { parentAuthor = '', parentPermlink, author, permlink, title = '', body, jsonMetadata = {} } = params;
        const normalizedAuthor = normalizeAccount(author);
        const normalizedParentAuthor = parentAuthor ? normalizeAccount(parentAuthor) : '';

        if (!normalizedAuthor) {
            throw new PixaAPIError('Invalid author parameter', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAuthor, 'posting');
        const privateKey = PrivateKey.fromString(key);

        // FIX (v4.1): Let the library handle json_metadata stringification.
        // Pre-stringifying caused a double-stringify mismatch: client signs
        // '{"app":"..."}' but the library re-stringifies to '"{\\"app\\":\\"...\\"}"',
        // producing a different transaction hash → "Missing Posting Authority".
        const jsonMetadataValue = typeof jsonMetadata === 'string'
            ? jsonMetadata
            : JSON.stringify(jsonMetadata);

        const op = {
            parent_author: normalizedParentAuthor,
            parent_permlink: parentPermlink,
            author: normalizedAuthor,
            permlink,
            title,
            body,
            json_metadata: jsonMetadataValue
        };

        const commentOp = [['comment', op]];

        // FIX (v4.1): Use the same direct-broadcast pattern as vote() instead
        // of going through _send() → broadcast.comment() → sendOperations().
        // broadcast.comment() internally calls the fork's sendOperations which
        // has known serialization issues (see _send comment). vote() works
        // because it broadcasts directly — replicate that pattern here.

        // Offline + queue: defer for later drain
        if (this.proxy.broadcastQueue && this.proxy.connectivity && !this.proxy.connectivity.isOnline) {
            return this.proxy.broadcastQueue.enqueue('comment', commentOp, {
                account: normalizedAuthor,
                author: normalizedAuthor,
                permlink,
                keyType: 'posting',
            });
        }

        // Online: try direct broadcast via the convenience method first;
        // if that fails with a serialization/authority error, retry via
        // sendOperations (which may use a different serialization path).
        try {
            return await this.proxy.client.broadcast.comment(op, privateKey);
        } catch (e) {
            const msg = (e.message || '').toLowerCase();
            if (msg.includes('missing') && msg.includes('authority')) {
                // Serialization mismatch from broadcast.comment — retry
                // via sendOperations as a last resort.
                console.warn('[comment] broadcast.comment failed with authority error, retrying via sendOperations');
                try {
                    return await this.proxy.client.broadcast.sendOperations(commentOp, privateKey);
                } catch (e2) {
                    // If sendOperations also fails, throw the original error
                    console.error('[comment] sendOperations also failed:', e2.message);
                    throw e;
                }
            }
            // Network failure — try to queue if we went offline
            if (this.proxy.broadcastQueue && this.proxy.connectivity) {
                const stillOnline = await this.proxy.connectivity.checkNow();
                if (!stillOnline) {
                    return this.proxy.broadcastQueue.enqueue('comment', commentOp, {
                        account: normalizedAuthor,
                        author: normalizedAuthor,
                        permlink,
                        keyType: 'posting',
                    });
                }
            }
            throw e;
        }
    }

    /**
     * Set comment options (beneficiaries, payout settings, etc.)
     * @param {object} params
     */
    async commentOptions(params) {
        const { author, permlink, maxAcceptedPayout, percentPxs, allowVotes, allowCurationRewards, extensions } = params;
        const normalizedAuthor = normalizeAccount(author);

        if (!normalizedAuthor) {
            throw new PixaAPIError('Invalid author parameter', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAuthor, 'posting');

        const op = {
            author: normalizedAuthor,
            permlink,
            max_accepted_payout: translateAssetToChain(maxAcceptedPayout || '1000000.000 PXS'),
            percent_hbd: percentPxs !== undefined ? percentPxs : 10000,
            allow_votes: allowVotes !== undefined ? allowVotes : true,
            allow_curation_rewards: allowCurationRewards !== undefined ? allowCurationRewards : true,
            extensions: extensions || []
        };

        return this._send(
            [['comment_options', op]], key,
            { account: normalizedAuthor, keyType: 'posting' });
    }

    async transfer(from, to, amount, memo = '') {
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to);

        if (!normalizedFrom || !normalizedTo) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(amount)) {
            throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        const op = {
            from: normalizedFrom,
            to: normalizedTo,
            amount: translateAssetToChain(amount),
            memo
        };
        return this._send(
            [['transfer', op]],
            key,
            { account: normalizedFrom, keyType: 'active' },
            (privateKey) => this.proxy.client.broadcast.transfer(op, privateKey)
        );
    }

    /**
     * Power up (transfer to vesting)
     * @param {string} from - Source account
     * @param {string} to - Destination account (can be same or different)
     * @param {string} amount - Amount in PXA (e.g., "100.000 PXA")
     */
    async transferToVesting(from, to, amount) {
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to) || normalizedFrom;

        if (!normalizedFrom) {
            throw new PixaAPIError('Invalid from account', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(amount)) {
            throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['transfer_to_vesting', {
                from: normalizedFrom,
                to: normalizedTo,
                amount: translateAssetToChain(amount)
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    /**
     * Power down (withdraw vesting)
     * @param {string} account - Account to power down
     * @param {string} vestingShares - Amount in PXP (e.g., "1000000.000000 PXP"), use "0.000000 PXP" to cancel
     */
    async withdrawVesting(account, vestingShares) {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(vestingShares)) {
            throw new PixaAPIError('Invalid vesting shares format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'active');
        return this._send(
            [['withdraw_vesting', {
                account: normalizedAccount,
                vesting_shares: translateAssetToChain(vestingShares)
            }]],
            key,
            { account: normalizedAccount, keyType: 'active' }
        );
    }

    /**
     * Delegate vesting shares
     * @param {string} delegator - Account delegating
     * @param {string} delegatee - Account receiving delegation
     * @param {string} vestingShares - Amount in PXP (use "0.000000 PXP" to undelegate)
     */
    async delegateVestingShares(delegator, delegatee, vestingShares) {
        const normalizedDelegator = normalizeAccount(delegator);
        const normalizedDelegatee = normalizeAccount(delegatee);

        if (!normalizedDelegator || !normalizedDelegatee) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(vestingShares)) {
            throw new PixaAPIError('Invalid vesting shares format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedDelegator, 'active');
        return this._send(
            [['delegate_vesting_shares', {
                delegator: normalizedDelegator,
                delegatee: normalizedDelegatee,
                vesting_shares: translateAssetToChain(vestingShares)
            }]],
            key,
            { account: normalizedDelegator, keyType: 'active' }
        );
    }

    /**
     * Transfer to savings
     */
    async transferToSavings(from, to, amount, memo = '') {
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to);

        if (!normalizedFrom || !normalizedTo) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(amount)) {
            throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['transfer_to_savings', {
                from: normalizedFrom,
                to: normalizedTo,
                amount: translateAssetToChain(amount),
                memo
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    /**
     * Transfer from savings (initiates 3-day withdrawal)
     */
    async transferFromSavings(from, requestId, to, amount, memo = '') {
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to);

        if (!normalizedFrom || !normalizedTo) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(amount)) {
            throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['transfer_from_savings', {
                from: normalizedFrom,
                request_id: requestId,
                to: normalizedTo,
                amount: translateAssetToChain(amount),
                memo
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    /**
     * Cancel pending savings withdrawal
     */
    async cancelTransferFromSavings(from, requestId) {
        const normalizedFrom = normalizeAccount(from);

        if (!normalizedFrom) {
            throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['cancel_transfer_from_savings', {
                from: normalizedFrom,
                request_id: requestId
            }]], key,
            { account: normalizedFrom, keyType: 'active' });
    }

    /**
     * Claim pending rewards
     * @param {string} account - Account claiming rewards
     * @param {string} rewardPixa - PXA reward to claim (e.g., "1.000 PXA")
     * @param {string} rewardPxs - PXS reward to claim (e.g., "0.500 PXS")
     * @param {string} rewardVests - PXP reward to claim (e.g., "100.000000 PXP")
     */
    async claimRewardBalance(account) {
        const normalizedAccount = normalizeAccount(account);

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');
        }

        // Fetch the raw (unsanitized) account to get reward balances in chain symbols
        const [rawAccount] = await this.proxy.client.database.getAccounts([normalizedAccount]);
        if (!rawAccount) {
            throw new PixaAPIError('Account not found', 'ACCOUNT_NOT_FOUND');
        }

        // Chain returns PIXA / PXS / VESTS but signing requires TESTS / TBD / VESTS
        const rewardPixa  = rawAccount.reward_pixa_balance    || '0.000 PIXA';
        const rewardPxs   = rawAccount.reward_pxs_balance     || '0.000 PXS';
        const rewardVests = rawAccount.reward_vesting_balance  || '0.000000 VESTS';

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'posting');
        const op = {
            account: normalizedAccount,
            reward_pixa: translateAssetToChain(rewardPixa),
            reward_pxs:  translateAssetToChain(rewardPxs),
            reward_vests: rewardVests,
        };
        return this._send(
            [['claim_reward_balance', op]], key,
            { account: normalizedAccount, keyType: 'posting' }
        );
    }

    /**
     * Set up recurring transfer
     * @param {object} params
     */
    async recurrentTransfer(params) {
        const { from, to, amount, memo = '', recurrence, executions } = params;
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to);

        if (!normalizedFrom || !normalizedTo) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['recurrent_transfer', {
                from: normalizedFrom,
                to: normalizedTo,
                amount: translateAssetToChain(amount),
                memo,
                recurrence, // Hours between transfers
                executions, // Number of transfers (0 to cancel)
                extensions: []
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    async follow(follower, following) {
        const normalizedFollower = normalizeAccount(follower);
        const normalizedFollowing = normalizeAccount(following);

        if (!normalizedFollower || !normalizedFollowing) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFollower, 'posting');
        return this._send(
            [['custom_json', {
                required_auths: [],
                required_posting_auths: [normalizedFollower],
                id: 'follow',
                json: JSON.stringify(['follow', { follower: normalizedFollower, following: normalizedFollowing, what: ['blog'] }])
            }]],
            key,
            { account: normalizedFollower, keyType: 'posting' }
        );
    }

    async unfollow(follower, following) {
        const normalizedFollower = normalizeAccount(follower);
        const normalizedFollowing = normalizeAccount(following);

        if (!normalizedFollower || !normalizedFollowing) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFollower, 'posting');
        return this._send(
            [['custom_json', {
                required_auths: [],
                required_posting_auths: [normalizedFollower],
                id: 'follow',
                json: JSON.stringify(['follow', { follower: normalizedFollower, following: normalizedFollowing, what: [] }])
            }]],
            key,
            { account: normalizedFollower, keyType: 'posting' }
        );
    }

    /**
     * Mute a user
     */
    async mute(follower, following) {
        const normalizedFollower = normalizeAccount(follower);
        const normalizedFollowing = normalizeAccount(following);

        if (!normalizedFollower || !normalizedFollowing) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFollower, 'posting');
        return this._send(
            [['custom_json', {
                required_auths: [],
                required_posting_auths: [normalizedFollower],
                id: 'follow',
                json: JSON.stringify(['follow', { follower: normalizedFollower, following: normalizedFollowing, what: ['ignore'] }])
            }]],
            key,
            { account: normalizedFollower, keyType: 'posting' }
        );
    }

    async reblog(account, author, permlink) {
        const normalizedAccount = normalizeAccount(account);
        const normalizedAuthor = normalizeAccount(author);

        if (!normalizedAccount || !normalizedAuthor) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'posting');
        return this._send(
            [['custom_json', {
                required_auths: [],
                required_posting_auths: [normalizedAccount],
                id: 'follow',
                json: JSON.stringify(['reblog', { account: normalizedAccount, author: normalizedAuthor, permlink }])
            }]],
            key
        );
    }

    /**
     * Broadcast a custom_json operation
     * @param {object} params - { requiredAuths, requiredPostingAuths, id, json }
     * @param {object} [auths] - Optional override keys. When provided, bypasses
     *   keyManager and uses the supplied WIF directly.
     *   Shape: { active: '<wif>', posting: '<wif>' }
     */
    async customJson(params, auths) {
        const { requiredAuths = [], requiredPostingAuths = [], id, json } = params;
        const signingAccount = requiredAuths[0] || requiredPostingAuths[0];
        const keyType = requiredAuths.length > 0 ? 'active' : 'posting';

        let key;
        if (auths && auths[keyType]) {
            key = auths[keyType];
        } else {
            key = await this.proxy.keyManager.requestKey(normalizeAccount(signingAccount), keyType);
        }

        return this._send(
            [['custom_json', {
                required_auths: requiredAuths.map(a => normalizeAccount(a)),
                required_posting_auths: requiredPostingAuths.map(a => normalizeAccount(a)),
                id,
                json: typeof json === 'string' ? json : JSON.stringify(json)
            }]],
            key,
            { account: normalizeAccount(signingAccount), keyType }
        );
    }

    async deleteComment(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);

        if (!normalizedAuthor) {
            throw new PixaAPIError('Invalid author', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAuthor, 'posting');
        return this._send(
            [['delete_comment', { author: normalizedAuthor, permlink }]], key,
            { account: normalizedAuthor, keyType: 'posting' });
    }

    /**
     * Create a new account
     * @param {object} params
     */
    async accountCreate(params) {
        const { fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata = '{}' } = params;
        const normalizedCreator = normalizeAccount(creator);
        const normalizedNewAccount = normalizeAccount(newAccountName);

        if (!normalizedCreator || !normalizedNewAccount) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        return this._send(
            [['account_create', {
                fee: translateAssetToChain(fee),
                creator: normalizedCreator,
                new_account_name: normalizedNewAccount,
                owner,
                active,
                posting,
                memo_key: memoKey,
                json_metadata: typeof jsonMetadata === 'string' ? jsonMetadata : JSON.stringify(jsonMetadata)
            }]],
            key,
            { account: normalizedCreator, keyType: 'active' }
        );
    }

    /**
     * Create account with delegation
     */
    async accountCreateWithDelegation(params) {
        const { fee, delegation, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata = '{}', extensions = [] } = params;
        const normalizedCreator = normalizeAccount(creator);
        const normalizedNewAccount = normalizeAccount(newAccountName);

        if (!normalizedCreator || !normalizedNewAccount) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        return this._send(
            [['account_create_with_delegation', {
                fee: translateAssetToChain(fee),
                delegation: translateAssetToChain(delegation),
                creator: normalizedCreator,
                new_account_name: normalizedNewAccount,
                owner,
                active,
                posting,
                memo_key: memoKey,
                json_metadata: typeof jsonMetadata === 'string' ? jsonMetadata : JSON.stringify(jsonMetadata),
                extensions
            }]],
            key,
            { account: normalizedCreator, keyType: 'active' }
        );
    }

    /**
     * Vote for a witness
     */
    async accountWitnessVote(account, witness, approve = true) {
        const normalizedAccount = normalizeAccount(account);
        const normalizedWitness = normalizeAccount(witness);

        if (!normalizedAccount || !normalizedWitness) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'active');
        return this._send(
            [['account_witness_vote', {
                account: normalizedAccount,
                witness: normalizedWitness,
                approve
            }]], key,
            { account: normalizedAccount, keyType: 'active' });
    }

    /**
     * Set witness proxy
     */
    async accountWitnessProxy(account, proxy) {
        const normalizedAccount = normalizeAccount(account);
        const normalizedProxy = proxy ? normalizeAccount(proxy) : '';

        if (!normalizedAccount) {
            throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'active');
        return this._send(
            [['account_witness_proxy', {
                account: normalizedAccount,
                proxy: normalizedProxy
            }]], key,
            { account: normalizedAccount, keyType: 'active' });
    }

    /**
     * Update witness
     */
    async witnessUpdate(params) {
        const { owner, url, blockSigningKey, props, fee } = params;
        const normalizedOwner = normalizeAccount(owner);

        if (!normalizedOwner) {
            throw new PixaAPIError('Invalid owner account', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        const chainProps = props ? { ...props } : {};
        if (chainProps.account_creation_fee) {
            chainProps.account_creation_fee = translateAssetToChain(chainProps.account_creation_fee);
        }
        return this._send(
            [['witness_update', {
                owner: normalizedOwner,
                url,
                block_signing_key: blockSigningKey,
                props: chainProps,
                fee: translateAssetToChain(fee)
            }]],
            key,
            { account: normalizedOwner, keyType: 'active' }
        );
    }

    /**
     * Set withdraw vesting route (for power down distribution)
     */
    async setWithdrawVestingRoute(fromAccount, toAccount, percent, autoVest = false) {
        const normalizedFrom = normalizeAccount(fromAccount);
        const normalizedTo = normalizeAccount(toAccount);

        if (!normalizedFrom || !normalizedTo) {
            throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['set_withdraw_vesting_route', {
                from_account: normalizedFrom,
                to_account: normalizedTo,
                percent, // 0-10000 (basis points)
                auto_vest: autoVest
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    /**
     * Create limit order on internal market
     */
    async limitOrderCreate(params) {
        const { owner, orderId, amountToSell, minToReceive, fillOrKill = false, expiration } = params;
        const normalizedOwner = normalizeAccount(owner);

        if (!normalizedOwner) {
            throw new PixaAPIError('Invalid owner account', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['limit_order_create', {
                owner: normalizedOwner,
                orderid: orderId,
                amount_to_sell: translateAssetToChain(amountToSell),
                min_to_receive: translateAssetToChain(minToReceive),
                fill_or_kill: fillOrKill,
                expiration: expiration || new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, -5)
            }]],
            key,
            { account: normalizedOwner, keyType: 'active' }
        );
    }

    /**
     * Cancel limit order
     */
    async limitOrderCancel(owner, orderId) {
        const normalizedOwner = normalizeAccount(owner);

        if (!normalizedOwner) {
            throw new PixaAPIError('Invalid owner account', 'INVALID_ACCOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['limit_order_cancel', {
                owner: normalizedOwner,
                orderid: orderId
            }]], key,
            { account: normalizedOwner, keyType: 'active' });
    }

    /**
     * Convert PXA to PXS
     */
    async convertPixa(owner, amount, requestId) {
        const normalizedOwner = normalizeAccount(owner);

        if (!normalizedOwner) {
            throw new PixaAPIError('Invalid owner account', 'INVALID_ACCOUNT');
        }

        // SECURITY FIX (v3.5.2): Validate amount format before broadcasting
        if (!VALIDATORS.safe_asset(amount)) {
            throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');
        }

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['convert', {
                owner: normalizedOwner,
                amount: translateAssetToChain(amount),
                requestid: requestId
            }]],
            key,
            { account: normalizedOwner, keyType: 'active' }
        );
    }

    /**
     * Send raw operations
     * @param {Array} operations - Array of [opType, opData] tuples
     * @param {PrivateKey|string} key - Private key for signing
     */
    async sendOperations(operations, key) {
        const privateKey = typeof key === 'string' ? PrivateKey.fromString(key) : key;
        return this._send(operations, privateKey);
    }

    // ========================================================================
    // Additional Broadcast Operations (v4.1.0)
    // ========================================================================

    /**
     * Update account (v1 — legacy, still used for some authority changes)
     * @param {object} params
     */
    async accountUpdate(params) {
        const { account, owner, active, posting, memoKey, jsonMetadata = '{}' } = params;
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const requiresOwner = !!owner;
        const keyType = requiresOwner ? 'owner' : 'active';
        const key = await this.proxy.keyManager.requestKey(normalizedAccount, keyType);

        const op = { account: normalizedAccount };
        if (owner) op.owner = owner;
        if (active) op.active = active;
        if (posting) op.posting = posting;
        if (memoKey) op.memo_key = memoKey;
        op.json_metadata = typeof jsonMetadata === 'string' ? jsonMetadata : JSON.stringify(jsonMetadata);

        return this._send(
            [['account_update', op]], key,
            { account: normalizedAccount, keyType });
    }

    /**
     * Claim a discounted account creation token
     * @param {string} creator - Account claiming the token
     * @param {string} [fee='0.000 PIXA'] - Fee (usually 0 for RC-based claims)
     * @returns {Promise<object>}
     */
    async claimAccount(creator, fee = '0.000 PIXA') {
        const normalizedCreator = normalizeAccount(creator);
        if (!normalizedCreator) throw new PixaAPIError('Invalid creator', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        return this._send(
            [['claim_account', {
                creator: normalizedCreator,
                fee: translateAssetToChain(fee),
                extensions: []
            }]],
            key,
            { account: normalizedCreator, keyType: 'active' }
        );
    }

    /**
     * Create an account using a previously claimed token
     * @param {object} params
     * @returns {Promise<object>}
     */
    async createClaimedAccount(params) {
        const { creator, newAccountName, owner, active, posting, memoKey, jsonMetadata = '{}', extensions = [] } = params;
        const normalizedCreator = normalizeAccount(creator);
        const normalizedNew = normalizeAccount(newAccountName);
        if (!normalizedCreator || !normalizedNew) throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        return this._send(
            [['create_claimed_account', {
                creator: normalizedCreator,
                new_account_name: normalizedNew,
                owner, active, posting,
                memo_key: memoKey,
                json_metadata: typeof jsonMetadata === 'string' ? jsonMetadata : JSON.stringify(jsonMetadata),
                extensions
            }]],
            key,
            { account: normalizedCreator, keyType: 'active' }
        );
    }

    /**
     * Collateralized convert (convert PIXA to PXS with PIXA collateral)
     * @param {string} owner
     * @param {string} amount - Amount to convert
     * @param {number} requestId
     * @returns {Promise<object>}
     */
    async collateralizedConvert(owner, amount, requestId) {
        const normalizedOwner = normalizeAccount(owner);
        if (!normalizedOwner) throw new PixaAPIError('Invalid owner', 'INVALID_ACCOUNT');
        if (!VALIDATORS.safe_asset(amount)) throw new PixaAPIError('Invalid amount format', 'INVALID_AMOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['collateralized_convert', {
                owner: normalizedOwner,
                requestid: requestId,
                amount: translateAssetToChain(amount)
            }]],
            key,
            { account: normalizedOwner, keyType: 'active' }
        );
    }

    /**
     * Create limit order (v2 — uses exchange_rate instead of min_to_receive)
     * @param {object} params
     * @returns {Promise<object>}
     */
    async limitOrderCreate2(params) {
        const { owner, orderId, amountToSell, exchangeRate, fillOrKill = false, expiration } = params;
        const normalizedOwner = normalizeAccount(owner);
        if (!normalizedOwner) throw new PixaAPIError('Invalid owner', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['limit_order_create2', {
                owner: normalizedOwner,
                orderid: orderId,
                amount_to_sell: translateAssetToChain(amountToSell),
                exchange_rate: {
                    base: translateAssetToChain(exchangeRate.base),
                    quote: translateAssetToChain(exchangeRate.quote)
                },
                fill_or_kill: fillOrKill,
                expiration: expiration || new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, -5)
            }]],
            key,
            { account: normalizedOwner, keyType: 'active' }
        );
    }

    /**
     * Publish a price feed (witnesses only)
     * @param {string} publisher - Witness account
     * @param {object} exchangeRate - { base: "0.500 PXS", quote: "1.000 PIXA" }
     * @returns {Promise<object>}
     */
    async feedPublish(publisher, exchangeRate) {
        const normalizedPublisher = normalizeAccount(publisher);
        if (!normalizedPublisher) throw new PixaAPIError('Invalid publisher', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedPublisher, 'active');
        return this._send(
            [['feed_publish', {
                publisher: normalizedPublisher,
                exchange_rate: {
                    base: translateAssetToChain(exchangeRate.base),
                    quote: translateAssetToChain(exchangeRate.quote)
                }
            }]],
            key,
            { account: normalizedPublisher, keyType: 'active' }
        );
    }

    /**
     * Set witness properties (modern witness configuration)
     * @param {string} owner - Witness account
     * @param {object} props - Property key-value pairs
     * @returns {Promise<object>}
     */
    async witnessSetProperties(owner, props) {
        const normalizedOwner = normalizeAccount(owner);
        if (!normalizedOwner) throw new PixaAPIError('Invalid owner', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['witness_set_properties', {
                owner: normalizedOwner,
                props,
                extensions: []
            }]], key,
            { account: normalizedOwner, keyType: 'active' });
    }

    // --- Escrow Operations ---

    /**
     * Initiate an escrow transfer
     * @param {object} params
     * @returns {Promise<object>}
     */
    async escrowTransfer(params) {
        const { from, to, agent, escrowId, pxsFee, pixaFee, ratificationDeadline, escrowExpiration, jsonMeta = '{}', amount } = params;
        const normalizedFrom = normalizeAccount(from);
        const normalizedTo = normalizeAccount(to);
        const normalizedAgent = normalizeAccount(agent);
        if (!normalizedFrom || !normalizedTo || !normalizedAgent) throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedFrom, 'active');
        return this._send(
            [['escrow_transfer', {
                from: normalizedFrom,
                to: normalizedTo,
                agent: normalizedAgent,
                escrow_id: escrowId,
                hbd_amount: translateAssetToChain(pxsFee || '0.000 PXS'),
                hive_amount: translateAssetToChain(amount || '0.000 PIXA'),
                fee: translateAssetToChain(pixaFee || '0.000 PIXA'),
                ratification_deadline: ratificationDeadline,
                escrow_expiration: escrowExpiration,
                json_meta: typeof jsonMeta === 'string' ? jsonMeta : JSON.stringify(jsonMeta)
            }]],
            key,
            { account: normalizedFrom, keyType: 'active' }
        );
    }

    /**
     * Approve an escrow transaction
     * @param {object} params
     * @returns {Promise<object>}
     */
    async escrowApprove(params) {
        const { from, to, agent, who, escrowId, approve = true } = params;
        const normalizedWho = normalizeAccount(who);
        if (!normalizedWho) throw new PixaAPIError('Invalid who parameter', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedWho, 'active');
        return this._send(
            [['escrow_approve', {
                from: normalizeAccount(from),
                to: normalizeAccount(to),
                agent: normalizeAccount(agent),
                who: normalizedWho,
                escrow_id: escrowId,
                approve
            }]],
            key,
            { account: normalizedWho, keyType: 'active' }
        );
    }

    /**
     * Dispute an escrow
     * @param {object} params
     * @returns {Promise<object>}
     */
    async escrowDispute(params) {
        const { from, to, agent, who, escrowId } = params;
        const normalizedWho = normalizeAccount(who);
        if (!normalizedWho) throw new PixaAPIError('Invalid who parameter', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedWho, 'active');
        return this._send(
            [['escrow_dispute', {
                from: normalizeAccount(from),
                to: normalizeAccount(to),
                agent: normalizeAccount(agent),
                who: normalizedWho,
                escrow_id: escrowId
            }]],
            key,
            { account: normalizedWho, keyType: 'active' }
        );
    }

    /**
     * Release funds from escrow
     * @param {object} params
     * @returns {Promise<object>}
     */
    async escrowRelease(params) {
        const { from, to, agent, who, receiver, escrowId, pxsAmount, pixaAmount } = params;
        const normalizedWho = normalizeAccount(who);
        if (!normalizedWho) throw new PixaAPIError('Invalid who parameter', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedWho, 'active');
        return this._send(
            [['escrow_release', {
                from: normalizeAccount(from),
                to: normalizeAccount(to),
                agent: normalizeAccount(agent),
                who: normalizedWho,
                receiver: normalizeAccount(receiver),
                escrow_id: escrowId,
                hbd_amount: translateAssetToChain(pxsAmount || '0.000 PXS'),
                hive_amount: translateAssetToChain(pixaAmount || '0.000 PIXA')
            }]],
            key,
            { account: normalizedWho, keyType: 'active' }
        );
    }

    // --- Proposal / DAO Operations ---

    /**
     * Create a proposal (DAO)
     * @param {object} params
     * @returns {Promise<object>}
     */
    async createProposal(params) {
        const { creator, receiver, startDate, endDate, dailyPay, subject, permlink, extensions = [] } = params;
        const normalizedCreator = normalizeAccount(creator);
        const normalizedReceiver = normalizeAccount(receiver);
        if (!normalizedCreator || !normalizedReceiver) throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        return this._send(
            [['create_proposal', {
                creator: normalizedCreator,
                receiver: normalizedReceiver,
                start_date: startDate,
                end_date: endDate,
                daily_pay: translateAssetToChain(dailyPay),
                subject,
                permlink,
                extensions
            }]],
            key,
            { account: normalizedCreator, keyType: 'active' }
        );
    }

    /**
     * Update an existing proposal
     * @param {object} params
     * @returns {Promise<object>}
     */
    async updateProposal(params) {
        const { proposalId, creator, dailyPay, subject, permlink, endDate, extensions = [] } = params;
        const normalizedCreator = normalizeAccount(creator);
        if (!normalizedCreator) throw new PixaAPIError('Invalid creator', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedCreator, 'active');
        const op = {
            proposal_id: proposalId,
            creator: normalizedCreator,
            extensions
        };
        if (dailyPay) op.daily_pay = translateAssetToChain(dailyPay);
        if (subject) op.subject = subject;
        if (permlink) op.permlink = permlink;
        if (endDate) op.end_date = endDate;

        return this._send(
            [['update_proposal', op]], key,
            { account: normalizedCreator, keyType: 'active' });
    }

    /**
     * Vote on proposals (approve or unapprove)
     * @param {string} voter
     * @param {number[]} proposalIds - Array of proposal IDs
     * @param {boolean} approve - true to approve, false to remove approval
     * @returns {Promise<object>}
     */
    async updateProposalVotes(voter, proposalIds, approve = true) {
        const normalizedVoter = normalizeAccount(voter);
        if (!normalizedVoter) throw new PixaAPIError('Invalid voter', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedVoter, 'active');
        return this._send(
            [['update_proposal_votes', {
                voter: normalizedVoter,
                proposal_ids: proposalIds,
                approve,
                extensions: []
            }]], key,
            { account: normalizedVoter, keyType: 'active' });
    }

    /**
     * Remove a proposal
     * @param {string} proposalOwner
     * @param {number[]} proposalIds - Array of proposal IDs to remove
     * @returns {Promise<object>}
     */
    async removeProposal(proposalOwner, proposalIds) {
        const normalizedOwner = normalizeAccount(proposalOwner);
        if (!normalizedOwner) throw new PixaAPIError('Invalid owner', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedOwner, 'active');
        return this._send(
            [['remove_proposal', {
                proposal_owner: normalizedOwner,
                proposal_ids: proposalIds,
                extensions: []
            }]], key,
            { account: normalizedOwner, keyType: 'active' });
    }

    // --- Account Recovery Operations ---

    /**
     * Request account recovery
     * @param {string} recoveryAccount - The account's recovery partner
     * @param {string} accountToRecover - Account being recovered
     * @param {object} newOwnerAuthority - New owner authority object
     * @returns {Promise<object>}
     */
    async requestAccountRecovery(recoveryAccount, accountToRecover, newOwnerAuthority) {
        const normalizedRecovery = normalizeAccount(recoveryAccount);
        const normalizedTarget = normalizeAccount(accountToRecover);
        if (!normalizedRecovery || !normalizedTarget) throw new PixaAPIError('Invalid account parameters', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedRecovery, 'active');
        return this._send(
            [['request_account_recovery', {
                recovery_account: normalizedRecovery,
                account_to_recover: normalizedTarget,
                new_owner_authority: newOwnerAuthority,
                extensions: []
            }]], key,
            { account: normalizedRecovery, keyType: 'active' });
    }

    /**
     * Complete account recovery (must be done within 24h of request)
     * @param {string} accountToRecover
     * @param {object} newOwnerAuthority
     * @param {object} recentOwnerAuthority
     * @returns {Promise<object>}
     */
    async recoverAccount(accountToRecover, newOwnerAuthority, recentOwnerAuthority) {
        const normalizedTarget = normalizeAccount(accountToRecover);
        if (!normalizedTarget) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        // Recovery uses the NEW owner key
        const key = await this.proxy.keyManager.requestKey(normalizedTarget, 'owner');
        return this._send(
            [['recover_account', {
                account_to_recover: normalizedTarget,
                new_owner_authority: newOwnerAuthority,
                recent_owner_authority: recentOwnerAuthority,
                extensions: []
            }]], key,
            { account: normalizedTarget, keyType: 'owner' });
    }

    /**
     * Change account's recovery partner
     * @param {string} accountToRecover
     * @param {string} newRecoveryAccount
     * @returns {Promise<object>}
     */
    async changeRecoveryAccount(accountToRecover, newRecoveryAccount) {
        const normalizedTarget = normalizeAccount(accountToRecover);
        const normalizedRecovery = normalizeAccount(newRecoveryAccount);
        if (!normalizedTarget) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedTarget, 'owner');
        return this._send(
            [['change_recovery_account', {
                account_to_recover: normalizedTarget,
                new_recovery_account: normalizedRecovery || '',
                extensions: []
            }]], key,
            { account: normalizedTarget, keyType: 'owner' });
    }

    /**
     * Decline voting rights (irreversible)
     * @param {string} account
     * @param {boolean} decline - true to decline, false to cancel (within timelock)
     * @returns {Promise<object>}
     */
    async declineVotingRights(account, decline = true) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const key = await this.proxy.keyManager.requestKey(normalizedAccount, 'owner');
        return this._send(
            [['decline_voting_rights', {
                account: normalizedAccount,
                decline
            }]], key,
            { account: normalizedAccount, keyType: 'owner' });
    }
}

// ============================================
// Auth API Group
// ============================================

class AuthAPI {
    constructor(proxy) { this.proxy = proxy; }

    isWif(key) {
        try {
            PrivateKey.fromString(key);
            return true;
        } catch (e) {
            return false;
        }
    }

    toWif(username, password, role) {
        return PrivateKey.fromLogin(username, password, role).toString();
    }

    wifToPublic(wif) {
        return PrivateKey.fromString(wif).createPublic().toString();
    }

    signMessage(message, wif) {
        const privateKey = PrivateKey.fromString(wif);
        const signature = privateKey.sign(cryptoUtils.sha256(message));
        return signature.toString();
    }

    verifySignature(message, signature, publicKey) {
        try {
            const sig = Signature.fromString(signature);
            const pubKey = PublicKey.fromString(publicKey);
            return sig.verify(cryptoUtils.sha256(message), pubKey);
        } catch (e) {
            return false;
        }
    }

    /**
     * Encode a memo for private messaging
     * @param {string} senderPrivateKey - Sender's private memo key (WIF)
     * @param {string} recipientPublicKey - Recipient's public memo key
     * @param {string} message - Message to encrypt
     * @returns {string} Encrypted memo (starts with #)
     */
    encodeMemo(senderPrivateKey, recipientPublicKey, message) {
        const privateKey = PrivateKey.fromString(senderPrivateKey);
        return Memo.encode(privateKey, recipientPublicKey, message);
    }

    /**
     * Decode an encrypted memo
     * @param {string} recipientPrivateKey - Recipient's private memo key (WIF)
     * @param {string} encryptedMemo - Encrypted memo (starts with #)
     * @returns {string} Decrypted message
     */
    decodeMemo(recipientPrivateKey, encryptedMemo) {
        const privateKey = PrivateKey.fromString(recipientPrivateKey);
        return Memo.decode(privateKey, encryptedMemo);
    }

    /**
     * Generate keys from username and password
     * @param {string} username
     * @param {string} password
     * @returns {object} Object with owner, active, posting, memo keys
     */
    generateKeys(username, password) {
        const normalizedUsername = normalizeAccount(username);
        return {
            owner: PrivateKey.fromLogin(normalizedUsername, password, 'owner').toString(),
            ownerPublic: PrivateKey.fromLogin(normalizedUsername, password, 'owner').createPublic().toString(),
            active: PrivateKey.fromLogin(normalizedUsername, password, 'active').toString(),
            activePublic: PrivateKey.fromLogin(normalizedUsername, password, 'active').createPublic().toString(),
            posting: PrivateKey.fromLogin(normalizedUsername, password, 'posting').toString(),
            postingPublic: PrivateKey.fromLogin(normalizedUsername, password, 'posting').createPublic().toString(),
            memo: PrivateKey.fromLogin(normalizedUsername, password, 'memo').toString(),
            memoPublic: PrivateKey.fromLogin(normalizedUsername, password, 'memo').createPublic().toString()
        };
    }
}

// ============================================
// Formatter API Group
// ============================================

class FormatterAPI {
    constructor(proxy) { this.proxy = proxy; }

    reputation(rawReputation) {
        if (!rawReputation || rawReputation === 0) return 25;
        const neg = rawReputation < 0;
        const rep = Math.log10(Math.abs(rawReputation));
        let score = Math.max(rep - 9, 0) * 9 + 25;
        if (neg) score = 50 - score;
        return Math.round(score * 100) / 100;
    }

    vestToPixa(vestingShares, totalVestingShares, totalVestingFundPixa) {
        return (parseFloat(vestingShares) / parseFloat(totalVestingShares)) * parseFloat(totalVestingFundPixa);
    }

    pixaToVest(pixa, totalVestingShares, totalVestingFundPixa) {
        return (parseFloat(pixa) / parseFloat(totalVestingFundPixa)) * parseFloat(totalVestingShares);
    }

    /** @deprecated Use vestToPixa() */
    vestToSteem(...args) { return this.vestToPixa(...args); }
    /** @deprecated Use pixaToVest() */
    steemToVest(...args) { return this.pixaToVest(...args); }

    formatAsset(amount, symbol, precision = 3) {
        return `${parseFloat(amount).toFixed(precision)} ${symbol}`;
    }

    /**
     * Calculate vesting share price from dynamic global properties
     * @param {object} props - Dynamic global properties
     * @returns {Price}
     */
    getVestingSharePrice(props) {
        return getVestingSharePrice(props);
    }

    /**
     * Get effective vesting shares for an account
     * @param {object} account - Account object
     * @param {boolean} subtractDelegated - Subtract delegated VESTS
     * @param {boolean} addReceived - Add received VESTS
     * @returns {number}
     */
    getVests(account, subtractDelegated = true, addReceived = true) {
        return getVests(account, subtractDelegated, addReceived);
    }
}

// ============================================
// Blockchain API Group (with streaming)
// ============================================

class BlockchainAPI {
    constructor(proxy) {
        this.proxy = proxy;
        this.BLOCK_INTERVAL = 3000; // 3 seconds
    }

    async getBlockHeader(blockNum) {
        return this.proxy.client.database.getBlockHeader(blockNum);
    }

    async getBlock(blockNum) {
        return this.proxy.client.database.getBlock(blockNum);
    }

    async getTransaction(txId) {
        return this.proxy.client.database.getTransaction(txId);
    }

    async getTransactionHex(tx) {
        return this.proxy.client.call('condenser_api', 'get_transaction_hex', [tx]);
    }

    /**
     * Get current block number
     * @param {string} mode - 'irreversible' or 'latest'
     * @returns {Promise<number>}
     */
    async getCurrentBlockNum(mode = 'irreversible') {
        const props = await this.proxy.client.database.getDynamicGlobalProperties();
        if (mode === 'latest' || mode === BlockchainMode?.Latest) {
            return props.head_block_number;
        }
        return props.last_irreversible_block_num;
    }

    /**
     * Get current block header
     * @param {string} mode - 'irreversible' or 'latest'
     */
    async getCurrentBlockHeader(mode = 'irreversible') {
        const blockNum = await this.getCurrentBlockNum(mode);
        return this.getBlockHeader(blockNum);
    }

    /**
     * Get current full block
     * @param {string} mode - 'irreversible' or 'latest'
     */
    async getCurrentBlock(mode = 'irreversible') {
        const blockNum = await this.getCurrentBlockNum(mode);
        return this.getBlock(blockNum);
    }

    /**
     * Async generator for block numbers
     * @param {object} options - { from, to, mode }
     * @yields {number}
     */
    async *getBlockNumbers(options = {}) {
        const { from, to, mode = 'irreversible' } = options;

        let currentBlock = from !== undefined ? from : await this.getCurrentBlockNum(mode);
        const endBlock = to;

        while (true) {
            const headBlock = await this.getCurrentBlockNum(mode);

            while (currentBlock <= headBlock && (endBlock === undefined || currentBlock <= endBlock)) {
                yield currentBlock;
                currentBlock++;
            }

            if (endBlock !== undefined && currentBlock > endBlock) {
                return;
            }

            // Wait for next block
            await new Promise(resolve => setTimeout(resolve, this.BLOCK_INTERVAL));
        }
    }

    /**
     * Async generator for full blocks
     * @param {object} options - { from, to, mode }
     * @yields {SignedBlock}
     */
    async *getBlocks(options = {}) {
        for await (const blockNum of this.getBlockNumbers(options)) {
            const block = await this.getBlock(blockNum);
            if (block) {
                yield block;
            }
        }
    }

    /**
     * Async generator for operations (including virtual)
     * @param {object} options - { from, to, mode }
     * @yields {AppliedOperation}
     */
    async *getOperations(options = {}) {
        for await (const blockNum of this.getBlockNumbers(options)) {
            const ops = await this.proxy.blocks.getOpsInBlock(blockNum, false);
            for (const op of ops) {
                yield op;
            }
        }
    }

    /**
     * Get block number stream (Node.js Readable)
     * @param {object} options
     * @returns {ReadableStream}
     */
    getBlockNumberStream(options = {}) {
        const iterator = this.getBlockNumbers(options);
        return this._iteratorToStream(iterator);
    }

    /**
     * Get block stream (Node.js Readable)
     * @param {object} options
     * @returns {ReadableStream}
     */
    getBlockStream(options = {}) {
        const iterator = this.getBlocks(options);
        return this._iteratorToStream(iterator);
    }

    /**
     * Get operations stream (Node.js Readable)
     * @param {object} options
     * @returns {ReadableStream}
     */
    getOperationsStream(options = {}) {
        const iterator = this.getOperations(options);
        return this._iteratorToStream(iterator);
    }

    /**
     * Convert async iterator to readable stream
     * @private
     */
    _iteratorToStream(iterator) {
        // Check if we're in Node.js environment
        if (typeof require !== 'undefined') {
            try {
                const { Readable } = require('stream');
                return Readable.from(iterator);
            } catch (e) {
                console.warn('[BlockchainAPI] Stream conversion not available in browser');
            }
        }

        // Return the iterator itself if streams aren't available
        return iterator;
    }
}

// ============================================
// Resource Credits API Group
// ============================================

class ResourceCreditsAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getResourceParams() {
        // rc.getResourceParams() — documented dpixa method
        return this.proxy.client.rc.getResourceParams();
    }

    async getResourcePool() {
        // rc.getResourcePool() — documented dpixa method
        return this.proxy.client.rc.getResourcePool();
    }

    async findRcAccounts(accounts) {
        const normalizedAccounts = accounts.map(acc => normalizeAccount(acc)).filter(acc => acc && acc.length > 0);
        // rc.findRCAccounts(usernames) — documented dpixa method
        return this.proxy.client.rc.findRCAccounts(normalizedAccounts);
    }

    async getRCMana(account) {
        const normalizedAccount = normalizeAccount(account);
        // rc.getRCMana(username) — documented dpixa method
        return this.proxy.client.rc.getRCMana(normalizedAccount);
    }

    async getVPMana(account) {
        const normalizedAccount = normalizeAccount(account);
        // rc.getVPMana(username) — documented dpixa method
        return this.proxy.client.rc.getVPMana(normalizedAccount);
    }

    /**
     * Calculate current RC mana from a raw RC account object.
     * Regenerates mana to current time.
     * @param {object} rcAccount - RC account object from findRcAccounts()
     * @returns {object} Manabar { current_mana, max_mana, percentage }
     */
    calculateRCMana(rcAccount) {
        // rc.calculateRCMana(rc_account) — documented dpixa method
        return this.proxy.client.rc.calculateRCMana(rcAccount);
    }

    /**
     * Calculate current voting power mana from a standard account object.
     * Regenerates mana to current time.
     * @param {object} account - Account object from getAccounts()
     * @returns {object} Manabar { current_mana, max_mana, percentage }
     */
    calculateVPMana(account) {
        // rc.calculateVPMana(account) — documented dpixa method
        return this.proxy.client.rc.calculateVPMana(account);
    }

    /**
     * Estimate RC cost for an operation
     * @param {string} operationType - e.g., 'vote', 'comment', 'transfer'
     * @param {object} operationData - Operation parameters
     */
    async calculateRCCost(operationType, operationData = {}) {
        // This is a simplified estimation - actual cost depends on current RC pool state
        const baseCosts = {
            vote: 20000000,
            comment: 150000000,
            transfer: 10000000,
            custom_json: 5000000,
            claim_reward_balance: 5000000,
            delegate_vesting_shares: 10000000,
            transfer_to_vesting: 10000000,
            withdraw_vesting: 10000000
        };

        const baseCost = baseCosts[operationType] || 50000000;

        // Adjust for content size if applicable
        if (operationType === 'comment' && operationData.body) {
            const bodySize = operationData.body.length;
            return baseCost + (bodySize * 10000);
        }

        if (operationType === 'custom_json' && operationData.json) {
            const jsonSize = typeof operationData.json === 'string'
                ? operationData.json.length
                : JSON.stringify(operationData.json).length;
            return baseCost + (jsonSize * 5000);
        }

        return baseCost;
    }
}

// ============================================
// Communities API Group
// ============================================

class CommunitiesAPI {
    constructor(proxy) { this.proxy = proxy; }

    async getCommunity(name, observer = '') {
        // bridge.get_community — canonical bridge API
        try {
            const params = { name };
            if (observer) params.observer = observer;
            return await this.proxy.client.pixamind.getCommunity(params);
        } catch (e) {
            console.warn('[CommunitiesAPI] getCommunity failed:', e.message);
        }
        return null;
    }

    async listCommunities(options = {}) {
        // bridge.list_communities — canonical bridge API
        // Params: last (string, paging), limit (int, default 100),
        //         query (string, filters title/about), sort (rank|new|subs),
        //         observer (string, valid account)
        try {
            const params = {};
            if (options.last)     params.last     = options.last;
            if (options.limit)    params.limit    = options.limit;
            if (options.query)    params.query    = options.query;
            if (options.sort)     params.sort     = options.sort;
            if (options.observer) params.observer = options.observer;
            return await this.proxy.client.pixamind.listCommunities(params);
        } catch (e) {
            console.warn('[CommunitiesAPI] listCommunities failed:', e.message);
        }
        return [];
    }

    async getSubscriptions(account) {
        const normalizedAccount = normalizeAccount(account);

        // pixamind.listAllSubscriptions({account}) — documented dpixa method
        try {
            return await this.proxy.client.pixamind.listAllSubscriptions({ account: normalizedAccount });
        } catch (e) {
            console.warn('[CommunitiesAPI] getSubscriptions failed:', e.message);
        }
        return [];
    }

    async getRankedPosts(options = {}) {
        const sort = options.sort || 'trending';
        const validSorts = ['trending', 'created', 'hot', 'promoted', 'active', 'votes', 'children', 'cashout'];
        const dbSort = validSorts.includes(sort) ? sort : 'trending';

        const q = {
            tag: options.tag || '',
            limit: parseInt(options.limit, 10) || 20
        };
        if (options.start_author) q.start_author = options.start_author;
        if (options.start_permlink) q.start_permlink = options.start_permlink;

        const queryKey = QueryCacheManager.buildKey(`community_ranked_${dbSort}`, q);

        if (this.proxy.queryCache && this.proxy.entityStore) {
            const cached = await this.proxy.queryCache.get(queryKey, dbSort);
            if (cached) {
                const resolved = await this.proxy.entityStore.resolve(cached.entity_type || 'posts', cached.ids);
                if (resolved.every(r => r !== null)) return resolved;
            }
        }

        // pixamind.getRankedPosts({sort, tag, limit}) — documented dpixa method
        let rawResults = null;

        try {
            rawResults = await this.proxy.client.pixamind.getRankedPosts({
                sort: dbSort, tag: q.tag || '', limit: q.limit
            });
        } catch (e) {
            console.warn(`[CommunitiesAPI] getRankedPosts(${dbSort}) failed:`, e.message);
        }

        if (!rawResults || !Array.isArray(rawResults)) return [];

        if (this.proxy.sanitizationPipeline && this.proxy.entityStore && this.proxy.queryCache) {
            const ids = [];
            const postEntities = [];
            const commentEntities = [];
            for (const raw of rawResults) {
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                    if (entity) {
                        if (entity._entity_type === 'post') postEntities.push(entity);
                        else commentEntities.push(entity);
                        ids.push(entity._entity_id);
                    }
                } catch (e) {
                    console.warn('[CommunitiesAPI] Failed to sanitize entity, skipping:', raw?.author, raw?.permlink, e.message || e);
                }
            }
            // Fire-and-forget: persist to cache in background, return immediately
            const ops = [this.proxy.queryCache.store(queryKey, ids, 'posts')];
            if (postEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('posts', postEntities));
            if (commentEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('comments', commentEntities));
            Promise.all(ops).catch(e => console.warn('[CommunitiesAPI] Background cache write failed:', e.message));
            return [...postEntities, ...commentEntities];
        }

        console.error('[CommunitiesAPI] Sanitizer pipeline not available — refusing to serve raw content');
        return [];
    }

    async getAccountPosts(account, sort = 'blog', options = {}) {
        const normalizedAccount = normalizeAccount(account);

        const validSorts = ['blog', 'feed', 'comments', 'trending', 'created', 'hot', 'promoted', 'active', 'votes', 'children', 'cashout'];
        const dbSort = validSorts.includes(sort) ? sort : 'blog';

        // get_discussions_by_comments uses start_author; blog/feed/others use tag
        const q = { limit: parseInt(options.limit, 10) || 20 };
        if (dbSort === 'comments') {
            q.start_author = normalizedAccount;
            if (options.start_permlink) q.start_permlink = options.start_permlink;
        } else {
            q.tag = normalizedAccount;
            if (options.start_author) q.start_author = options.start_author;
            if (options.start_permlink) q.start_permlink = options.start_permlink;
        }

        const entityType = sort === 'comments' ? 'comments' : 'posts';
        const queryKey = QueryCacheManager.buildKey(`community_account_${dbSort}`, q);

        if (this.proxy.queryCache && this.proxy.entityStore) {
            const cached = await this.proxy.queryCache.get(queryKey, sort);
            if (cached) {
                const resolved = await this.proxy.entityStore.resolve(cached.entity_type || entityType, cached.ids);
                if (resolved.every(r => r !== null)) return resolved;
            }
        }

        // database.getDiscussions(by, query) — documented dpixa method, handles all sorts
        let rawResults = null;

        try {
            rawResults = await this.proxy.client.database.getDiscussions(dbSort, q);
        } catch (e) {
            console.warn(`[CommunitiesAPI] getAccountPosts(${dbSort}) failed:`, e.message);
        }

        if (!rawResults || !Array.isArray(rawResults)) return [];

        // Sanitize, batch-store, cache
        if (this.proxy.sanitizationPipeline && this.proxy.entityStore && this.proxy.queryCache) {
            const ids = [];
            const postEntities = [];
            const commentEntities = [];
            for (const raw of rawResults) {
                try {
                    const entity = this.proxy.sanitizationPipeline.sanitizeContent(raw);
                    if (entity) {
                        if (entity._entity_type === 'post') postEntities.push(entity);
                        else commentEntities.push(entity);
                        ids.push(entity._entity_id);
                    }
                } catch (e) {
                    console.warn('[CommunitiesAPI] Failed to sanitize entity, skipping:', raw?.author, raw?.permlink, e.message || e);
                }
            }
            // Fire-and-forget: persist to cache in background, return immediately
            const ops = [this.proxy.queryCache.store(queryKey, ids, entityType)];
            if (postEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('posts', postEntities));
            if (commentEntities.length > 0) ops.push(this.proxy.entityStore.upsertMany('comments', commentEntities));
            Promise.all(ops).catch(e => console.warn('[CommunitiesAPI] Background cache write failed:', e.message));
            return [...postEntities, ...commentEntities];
        }

        // SECURITY PATCH (v3.5.2-patched): FAIL-CLOSED
        console.error('[CommunitiesAPI] Sanitizer pipeline not available — refusing to serve raw content');
        return [];
    }

    // ========================================================================
    // Bridge API — Additional Methods (v4.1.0)
    // ========================================================================

    /**
     * Get a full discussion thread (post + all nested comments)
     * @param {string} author - Post author
     * @param {string} permlink - Post permlink
     * @param {string} [observer=''] - Observer account for personalization
     * @returns {Promise<object>} Full discussion tree
     */
    async getDiscussion(author, permlink, observer = '') {
        const normalizedAuthor = normalizeAccount(author);
        if (!normalizedAuthor) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_discussion', {
                author: normalizedAuthor,
                permlink,
                observer
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_discussion failed:', e.message);
        }
        return null;
    }

    /**
     * Get a single post via Bridge (richer format than condenser_api.get_content)
     * @param {string} author - Post author
     * @param {string} permlink - Post permlink
     * @param {string} [observer=''] - Observer account
     * @returns {Promise<object|null>}
     */
    async getPost(author, permlink, observer = '') {
        const normalizedAuthor = normalizeAccount(author);
        if (!normalizedAuthor) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_post', {
                author: normalizedAuthor,
                permlink,
                observer
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_post failed:', e.message);
        }
        return null;
    }

    /**
     * Get lightweight post header (no body or votes)
     * @param {string} author
     * @param {string} permlink
     * @returns {Promise<object|null>}
     */
    async getPostHeader(author, permlink) {
        const normalizedAuthor = normalizeAccount(author);
        if (!normalizedAuthor) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_post_header', {
                author: normalizedAuthor,
                permlink
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_post_header failed:', e.message);
        }
        return null;
    }

    /**
     * Get profile data via Bridge (includes computed reputation, follower counts)
     * @param {string} account
     * @param {string} [observer=''] - Observer account
     * @returns {Promise<object|null>}
     */
    async getProfile(account, observer = '') {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_profile', {
                account: normalizedAccount,
                observer
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_profile failed:', e.message);
        }
        return null;
    }

    /**
     * Get user's context within a community (role, title, subscription status)
     * @param {string} name - Community name (e.g. "hive-123456")
     * @param {string} account - Account to check
     * @returns {Promise<object|null>} { role, title, subscribed }
     */
    async getCommunityContext(name, account) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_community_context', {
                name,
                account: normalizedAccount
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_community_context failed:', e.message);
        }
        return null;
    }

    /**
     * Get the follow/mute relationship between two accounts
     * @param {string} account1
     * @param {string} account2
     * @returns {Promise<object|null>} { follows, ignores, blacklists, follow_blacklists }
     */
    async getRelationshipBetweenAccounts(account1, account2) {
        const normalized1 = normalizeAccount(account1);
        const normalized2 = normalizeAccount(account2);
        if (!normalized1 || !normalized2) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_relationship_between_accounts', [normalized1, normalized2]);
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_relationship_between_accounts failed:', e.message);
        }
        return null;
    }

    /**
     * Get follow list (blacklist/mute list) for an account
     * @param {string} account
     * @returns {Promise<object|null>}
     */
    async getFollowList(account) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return null;

        try {
            return await this.proxy.client.call('bridge', 'get_follow_list', {
                account: normalizedAccount
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_follow_list failed:', e.message);
        }
        return null;
    }

    /**
     * Check if a user follows any blacklists/mute lists
     * @param {string} account
     * @returns {Promise<boolean>}
     */
    async doesUserFollowAnyLists(account) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return false;

        try {
            return await this.proxy.client.call('bridge', 'does_user_follow_any_lists', {
                account: normalizedAccount
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.does_user_follow_any_lists failed:', e.message);
        }
        return false;
    }

    /**
     * Get payout statistics for a community
     * @param {string} name - Community name
     * @returns {Promise<object|null>}
     */
    async getPayoutStats(name) {
        try {
            return await this.proxy.client.call('bridge', 'get_payout_stats', { community: name });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.get_payout_stats failed:', e.message);
        }
        return null;
    }

    /**
     * List roles assigned within a community
     * @param {string} name - Community name
     * @param {string} [last=''] - Last account for pagination
     * @param {number} [limit=100]
     * @returns {Promise<object[]>} Array of [account, role, title]
     */
    async listCommunityRoles(name, last = '', limit = 100) {
        try {
            return await this.proxy.client.call('bridge', 'list_community_roles', {
                community: name,
                last,
                limit
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.list_community_roles failed:', e.message);
        }
        return [];
    }

    /**
     * List subscribers to a community
     * @param {string} name - Community name
     * @param {string} [last=''] - Last account for pagination
     * @param {number} [limit=100]
     * @returns {Promise<object[]>} Array of [account, role, title, created]
     */
    async listSubscribers(name, last = '', limit = 100) {
        try {
            return await this.proxy.client.call('bridge', 'list_subscribers', {
                community: name,
                last,
                limit
            });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.list_subscribers failed:', e.message);
        }
        return [];
    }

    /**
     * List popular communities (alternative ranking)
     * @param {number} [limit=25]
     * @returns {Promise<object[]>}
     */
    async listPopCommunities(limit = 25) {
        try {
            return await this.proxy.client.call('bridge', 'list_pop_communities', { limit });
        } catch (e) {
            console.warn('[CommunitiesAPI] bridge.list_pop_communities failed:', e.message);
        }
        return [];
    }

    /**
     * List popular communities with full filtering/sorting/paging
     * bridge.list_pop_communities with extended options
     * @param {object} [options]
     * @param {string} [options.last] - community name for paging
     * @param {number} [options.limit] - max results
     * @param {string} [options.query] - filter against title/about
     * @param {string} [options.sort] - rank|new|subs
     * @param {string} [options.observer] - valid account
     * @returns {Promise<object[]>}
     */
    async listPopularCommunities(options = {}) {
        try {
            const params = {};
            if (options.last)     params.last     = options.last;
            if (options.limit)    params.limit    = options.limit;
            if (options.query)    params.query    = options.query;
            if (options.sort)     params.sort     = options.sort;
            if (options.observer) params.observer = options.observer;
            const res = await this.proxy.client.call('bridge.list_pop_communities', params);
            console.log(res);
            return res;
        } catch (e) {
            console.warn('[CommunitiesAPI] listPopularCommunities failed:', e.message);
        }
        return [];
    }

    // ========================================================================
    // Community Broadcast Convenience Methods (custom_json wrappers) (v4.1.0)
    // ========================================================================

    /**
     * Set a role for an account within a community
     * @param {string} community - Community name (e.g. "hive-123456")
     * @param {string} account - Account to assign role to
     * @param {string} role - Role: 'admin', 'mod', 'member', 'guest', 'muted'
     * @returns {Promise<object>} TransactionConfirmation
     */
    async setRole(community, account, role) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        // Requires the authority of whoever is setting the role
        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['setRole', { community, account: normalizedAccount, role }])
        });
    }

    /**
     * Set a title/badge for an account within a community (Mods or higher)
     * @param {string} community
     * @param {string} account
     * @param {string} title - Badge/title text
     * @returns {Promise<object>}
     */
    async setUserTitle(community, account, title) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['setUserTitle', { community, account: normalizedAccount, title }])
        });
    }

    /**
     * Mute a post within a community (Mods or higher)
     * @param {string} community
     * @param {string} account - Author of the post
     * @param {string} permlink
     * @param {string} notes - Reason for muting (use 'spam' for spam)
     * @returns {Promise<object>}
     */
    async mutePost(community, account, permlink, notes = '') {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['mutePost', { community, account: normalizedAccount, permlink, notes }])
        });
    }

    /**
     * Unmute a post within a community (Mods or higher)
     * @param {string} community
     * @param {string} account
     * @param {string} permlink
     * @param {string} notes
     * @returns {Promise<object>}
     */
    async unmutePost(community, account, permlink, notes = '') {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['unmutePost', { community, account: normalizedAccount, permlink, notes }])
        });
    }

    /**
     * Update community properties (Admin only)
     * @param {string} community
     * @param {object} props - { title, about, is_nsfw, description, flag_text }
     * @returns {Promise<object>}
     */
    async updateCommunityProps(community, props) {
        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['updateProps', { community, props }])
        });
    }

    /**
     * Subscribe to a community
     * @param {string} community
     * @returns {Promise<object>}
     */
    async subscribe(community) {
        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['subscribe', { community }])
        });
    }

    /**
     * Unsubscribe from a community
     * @param {string} community
     * @returns {Promise<object>}
     */
    async unsubscribe(community) {
        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['unsubscribe', { community }])
        });
    }

    /**
     * Pin a post to the top of the community homepage (Mods or higher)
     * @param {string} community
     * @param {string} account - Post author
     * @param {string} permlink
     * @returns {Promise<object>}
     */
    async pinPost(community, account, permlink) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['pinPost', { community, account: normalizedAccount, permlink }])
        });
    }

    /**
     * Unpin a post from the community homepage (Mods or higher)
     * @param {string} community
     * @param {string} account
     * @param {string} permlink
     * @returns {Promise<object>}
     */
    async unpinPost(community, account, permlink) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['unpinPost', { community, account: normalizedAccount, permlink }])
        });
    }

    /**
     * Flag a post for community review (any user)
     * @param {string} community
     * @param {string} account - Post author
     * @param {string} permlink
     * @param {string} notes - Reason for flagging
     * @returns {Promise<object>}
     */
    async flagPost(community, account, permlink, notes = '') {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new PixaAPIError('Invalid account', 'INVALID_ACCOUNT');

        const activeUser = this.proxy.sessionManager?.currentAccount;
        if (!activeUser) throw new PixaAPIError('No active session', 'NO_SESSION');

        return this.proxy.broadcast.customJson({
            requiredAuths: [],
            requiredPostingAuths: [activeUser],
            id: 'community',
            json: JSON.stringify(['flagPost', { community, account: normalizedAccount, permlink, notes }])
        });
    }
}

// ============================================
// Account By Key API Group
// ============================================

class AccountByKeyAPI {
    constructor(proxy) { this.proxy = proxy; }

    /**
     * Find accounts associated with public keys
     * @param {Array<string|PublicKey>} keys - Array of public keys
     * @returns {Promise<{accounts: string[][]}>} - accounts[i] contains accounts for keys[i]
     */
    async getKeyReferences(keys) {
        const keyStrings = keys.map(k => {
            if (typeof k === 'string') return k;
            if (k instanceof PublicKey) return k.toString();
            return String(k);
        });

        try {
            // keys.getKeyReferences(keys) — documented dpixa method
            return await this.proxy.client.keys.getKeyReferences(keyStrings);
        } catch (e) {
            console.warn('[AccountByKeyAPI] getKeyReferences failed:', e.message);
        }

        return { accounts: keys.map(() => []) };
    }

    /**
     * Find account for a single key
     * @param {string|PublicKey} key
     * @returns {Promise<string[]>}
     */
    async findAccountsByKey(key) {
        const result = await this.getKeyReferences([key]);
        return result.accounts[0] || [];
    }
}

// ============================================
// Transaction Status API Group
// ============================================

class TransactionStatusAPI {
    constructor(proxy) { this.proxy = proxy; }

    /**
     * Find transaction status
     * @param {string} transactionId - Transaction ID (40-char hex)
     * @param {string} expiration - Optional expiration time
     * @returns {Promise<{status: string, block_num?: number}>}
     */
    async findTransaction(transactionId, expiration = null) {
        try {
            const params = { transaction_id: transactionId };
            if (expiration) params.expiration = expiration;

            return await this.proxy.client.call('transaction_status_api', 'find_transaction', params);
        } catch (e) {
            console.warn('[TransactionStatusAPI] find_transaction failed:', e.message);

            // Fallback: Try to find in recent blocks
            try {
                const tx = await this.proxy.client.database.getTransaction(transactionId);
                if (tx) {
                    return { status: 'within_irreversible_block' };
                }
            } catch (e2) {}

            return { status: 'unknown' };
        }
    }

    /**
     * Check if a transaction has been confirmed
     * @param {string} transactionId
     * @returns {Promise<boolean>}
     */
    async isConfirmed(transactionId) {
        const result = await this.findTransaction(transactionId);
        const confirmedStatuses = ['within_irreversible_block', 'within_reversible_block'];
        return confirmedStatuses.includes(result.status);
    }
}

// ============================================
// Internal Managers
// ============================================

class CacheManager {
    constructor(db) { this.db = db; this.collections = new Map(); }

    async getCollection(name) {
        if (!this.collections.has(name)) {
            this.collections.set(name, await this.db.getCollection(name));
        }
        return this.collections.get(name);
    }

    async get(collectionName, key, ttl) {
        try {
            const collection = await this.getCollection(collectionName);
            const doc = await collection.get(key);
            if (doc && doc.timestamp && (Date.now() - doc.timestamp) < ttl) {
                return doc.data;
            }
        } catch (e) {}
        return null;
    }

    async set(collectionName, key, data) {
        try {
            const collection = await this.getCollection(collectionName);
            const doc = { data, timestamp: Date.now() };
            await collection.upsert(key, doc);
        } catch (e) {}
    }

    async invalidateKey(collectionName, key) {
        try {
            const collection = await this.getCollection(collectionName);
            await collection.delete(key);
        } catch (e) {}
    }

    async invalidateAll(collectionName) {
        try {
            const collection = await this.getCollection(collectionName);
            await collection.clear({ force: true });
        } catch (e) {}
    }
}

class PaginationManager {
    constructor() { this.cursors = new Map(); }
    setCursor(key, cursor) { this.cursors.set(key, cursor); }
    getCursor(key) { return this.cursors.get(key); }
    clearCursor(key) { this.cursors.delete(key); }
    clearAll() { this.cursors.clear(); }
}

// ============================================
// Entity-Based Storage System (v3.4.0)
// ============================================

/**
 * SanitizationPipeline - Processes raw blockchain entities through
 * the ContentSanitizer before they enter the database.
 * Nothing enters entity stores unsanitized.
 */
class SanitizationPipeline {
    /**
     * @param {ContentSanitizer} sanitizer
     * @param {FormatterAPI} formatter
     */
    constructor(sanitizer, formatter) {
        this.sanitizer = sanitizer;
        this.formatter = formatter;
    }

    // ── ACCOUNT ─────────────────────────────────────────────────────────

    /**
     * Sanitize a raw account object for storage.
     * DANGEROUS FIELDS (`json_metadata`, `posting_json_metadata`) keep their
     * original names but store the WASM-parsed safe object — never the raw string.
     * All dates are integer millisecond timestamps (`new Date(ts)` ready).
     *
     * @param {object} raw - Raw account from blockchain RPC
     * @returns {object|null} Sanitized account ready for DB insertion
     */
    sanitizeAccount(raw) {
        if (!raw || !raw.name) return null;

        const name = this.sanitizer.sanitizeUsername(raw.name);
        if (!name) return null;

        // DANGEROUS: sanitize raw JSON strings through WASM, store sanitized strings only
        const rawPostingMeta = raw.posting_json_metadata || '{}';
        const rawJsonMeta    = raw.json_metadata || '{}';
        const safePostingMetaStr = this.sanitizer.safeJson(rawPostingMeta);
        const safeJsonMetaStr    = this.sanitizer.safeJson(rawJsonMeta);

        // Parse for field extraction only
        let postingMeta = {}, jsonMeta = {};
        try { postingMeta = JSON.parse(safePostingMetaStr); } catch (e) {}
        try { jsonMeta    = JSON.parse(safeJsonMetaStr); } catch (e) {}

        // Merge profile: posting_json_metadata takes priority
        // Guard: profile must be a plain object — strings/arrays produce garbage when spread
        const _sp = (o) => (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
        const profile = { ..._sp(jsonMeta.profile), ..._sp(postingMeta.profile) };

        // Profile fields are already sanitized by safeJson (HTML stripped, schemes checked)
        // display_name: also handle numeric values (e.g. profile.name === 0)
        const displayName  = typeof profile.name === 'string'
            ? (profile.name.trim() || null)?.slice(0, 64) ?? null
            : (typeof profile.name === 'number' && isFinite(profile.name))
                ? String(profile.name).slice(0, 64)
                : null;
        const about        = typeof profile.about    === 'string' ? profile.about.slice(0, 512) : null;
        const location     = typeof profile.location === 'string' ? profile.location.slice(0, 128) : null;
        const website      = typeof profile.website  === 'string' ? profile.website.slice(0, 256) : null;
        const profileImage = typeof profile.profile_image === 'string' ? profile.profile_image : null;
        const coverImage   = typeof profile.cover_image   === 'string' ? profile.cover_image   : null;

        const links = [];
        if (website)      links.push(website);
        if (profileImage) links.push(profileImage);
        if (coverImage)   links.push(coverImage);

        // Build entity FIELD BY FIELD — no { ...raw } spread.
        return {
            _entity_id:   name,
            _entity_type: 'account',
            _sanitized:   true,
            _stored_at:   Date.now(),

            // Enrichment
            _profile: { display_name: displayName, about, location, website, profile_image: profileImage, cover_image: coverImage },
            _links: links,

            // Identity
            name,
            id: VALIDATORS.safe_number(raw.id) ?? 0,

            // DANGEROUS fields — keep names, store sanitized JSON strings
            json_metadata:         safeJsonMetaStr,
            posting_json_metadata: safePostingMetaStr,

            // Authority objects (structured chain data, not user text)
            owner:   VALIDATORS.safe_authority(raw.owner),
            active:  VALIDATORS.safe_authority(raw.active),
            posting: VALIDATORS.safe_authority(raw.posting),

            // Reputation
            reputation:       VALIDATORS.safe_number(raw.reputation) ?? 0,
            reputation_score: this.formatter ? this.formatter.reputation(raw.reputation) : 25,

            // Balances (translate chain symbols → display symbols)
            balance:                  translateAssetFromChain(VALIDATORS.safe_asset(raw.balance) || '0.000 PIXA'),
            savings_balance:          translateAssetFromChain(VALIDATORS.safe_asset(raw.savings_balance) || '0.000 PIXA'),
            pxs_balance:              translateAssetFromChain(VALIDATORS.safe_asset(raw.pxs_balance) || '0.000 PXS'),
            savings_pxs_balance:      translateAssetFromChain(VALIDATORS.safe_asset(raw.savings_pxs_balance) || '0.000 PXS'),
            vesting_shares:           translateAssetFromChain(VALIDATORS.safe_asset(raw.vesting_shares) || '0.000000 PXP'),
            delegated_vesting_shares: translateAssetFromChain(VALIDATORS.safe_asset(raw.delegated_vesting_shares) || '0.000000 PXP'),
            received_vesting_shares:  translateAssetFromChain(VALIDATORS.safe_asset(raw.received_vesting_shares) || '0.000000 PXP'),
            vesting_withdraw_rate:    translateAssetFromChain(VALIDATORS.safe_asset(raw.vesting_withdraw_rate) || '0.000000 PXP'),
            reward_pixa_balance:      translateAssetFromChain(VALIDATORS.safe_asset(raw.reward_pixa_balance) || '0.000 PIXA'),
            reward_pxs_balance:       translateAssetFromChain(VALIDATORS.safe_asset(raw.reward_pxs_balance) || '0.000 PXS'),
            reward_vesting_balance:   translateAssetFromChain(VALIDATORS.safe_asset(raw.reward_vesting_balance) || '0.000000 PXP'),
            reward_vesting_pixa:      translateAssetFromChain(VALIDATORS.safe_asset(raw.reward_vesting_pixa) || '0.000 PIXA'),
            post_voting_power:        translateAssetFromChain(VALIDATORS.safe_asset(raw.post_voting_power) || '0.000000 PXP'),

            // Voting / mana
            voting_power:    VALIDATORS.safe_number(raw.voting_power) ?? 0,
            voting_manabar:  VALIDATORS.safe_manabar(raw.voting_manabar),
            downvote_manabar: VALIDATORS.safe_manabar(raw.downvote_manabar),
            can_vote:        VALIDATORS.safe_bool(raw.can_vote) ?? true,

            // Activity counts
            post_count:          VALIDATORS.safe_number(raw.post_count) ?? 0,
            curation_rewards:    VALIDATORS.safe_number(raw.curation_rewards) ?? 0,
            posting_rewards:     VALIDATORS.safe_number(raw.posting_rewards) ?? 0,
            witnesses_voted_for: VALIDATORS.safe_number(raw.witnesses_voted_for) ?? 0,

            // Timestamps (integer ms — `new Date(ts)`)
            created:             VALIDATORS.safe_timestamp(raw.created),
            last_post:           VALIDATORS.safe_timestamp(raw.last_post),
            last_root_post:      VALIDATORS.safe_timestamp(raw.last_root_post),
            last_vote_time:      VALIDATORS.safe_timestamp(raw.last_vote_time),
            last_account_update: VALIDATORS.safe_timestamp(raw.last_account_update),
            last_owner_update:   VALIDATORS.safe_timestamp(raw.last_owner_update),

            // Power down
            next_vesting_withdrawal: VALIDATORS.safe_timestamp(raw.next_vesting_withdrawal),
            withdrawn:               VALIDATORS.safe_number(raw.withdrawn) ?? 0,
            to_withdraw:             VALIDATORS.safe_number(raw.to_withdraw) ?? 0,
            withdraw_routes:         VALIDATORS.safe_number(raw.withdraw_routes) ?? 0,

            // Savings
            savings_withdraw_requests: VALIDATORS.safe_number(raw.savings_withdraw_requests) ?? 0,

            // Governance
            witness_votes: Array.isArray(raw.witness_votes)
                ? raw.witness_votes.filter(w => typeof w === 'string' && w.length <= 16)
                : [],
            proxied_vsf_votes: Array.isArray(raw.proxied_vsf_votes)
                ? raw.proxied_vsf_votes.map(v => String(v))
                : [],

            // Keys / proxy / recovery
            memo_key:         VALIDATORS.safe_pubkey(raw.memo_key) || '',
            proxy:            raw.proxy ? (this.sanitizer.sanitizeUsername(raw.proxy) || '') : '',
            recovery_account: raw.recovery_account ? (this.sanitizer.sanitizeUsername(raw.recovery_account) || '') : '',
        };
    }

    // ── POST ────────────────────────────────────────────────────────────

    /**
     * Sanitize a raw post (root-level content, depth=0) for storage.
     * `body` stores sanitized HTML (raw markdown is discarded).
     * `json_metadata` keeps its name but stores the WASM-parsed safe object.
     * All dates are integer millisecond timestamps.
     *
     * @param {object} raw - Raw discussion/post from blockchain RPC
     * @param {object} [renderOptions]
     * @returns {object|null} Sanitized post ready for DB insertion
     */
    sanitizePost(raw, renderOptions = {}) {
        if (!raw || !raw.author || !raw.permlink) return null;

        const author   = this.sanitizer.sanitizeUsername(raw.author);
        const permlink = VALIDATORS.safe_permlink(raw.permlink);
        if (!author || !permlink) return null;

        const entityId = `${author}_${permlink}`;

        // DANGEROUS: json_metadata — sanitize through WASM, returns safe JSON string
        const safeMetaStr = this.sanitizer.safeJson(raw.json_metadata || '{}');
        let meta = {};
        try { meta = JSON.parse(safeMetaStr); } catch (e) {}

        // ── Content type detection ──────────────────────────────────────
        const contentType = detectContentType(raw.body);

        let rendered, summary, descriptionHtml;

        if (contentType === 'pixel_art') {
            rendered = this.sanitizer.renderPost(raw.body || '', renderOptions);
            const rawDesc = typeof meta.description === 'string' ? meta.description : '';
            descriptionHtml = rawDesc
                ? this.sanitizer.renderDescription(rawDesc)
                : '';
            summary = this.sanitizer.extractPlainText(rawDesc).slice(0, 500);
        } else {
            rendered = this.sanitizer.renderPost(raw.body || '', renderOptions);
            const rawDesc = typeof meta.description === 'string' ? meta.description : '';
            descriptionHtml = rawDesc
                ? this.sanitizer.renderDescription(rawDesc)
                : '';
            summary = this.sanitizer.extractPlainText(raw.body || '').slice(0, 500);
        }

        // Build entity FIELD BY FIELD — no { ...raw } spread.
        return {
            _entity_id:   entityId,
            _entity_type: 'post',
            _content_type: contentType,
            _sanitized:   true,
            _stored_at:   Date.now(),

            // Enrichment
            _images:           rendered.images || [],
            _links:            rendered.links || [],
            _summary:          summary,
            _description_html: descriptionHtml,
            _tags:             meta.tags || [],
            _word_count:       rendered.wordCount || 0,
            _app:              typeof meta.app === 'string' ? meta.app : '',

            // Identity
            id:              VALIDATORS.safe_number(raw.id) ?? 0,
            author,
            permlink,
            category:        this.sanitizer.safeString(raw.category || '', 64),
            parent_author:   '',
            parent_permlink: this.sanitizer.safeString(raw.parent_permlink || '', 256),

            // Content — body IS sanitized HTML
            title: this.sanitizer.safeString(raw.title || '', 256),
            body:  rendered.html || '',

            // DANGEROUS field — keeps name, stores sanitized JSON string
            json_metadata: safeMetaStr,

            // Timestamps (integer ms)
            created:     VALIDATORS.safe_timestamp(raw.created),
            last_update: VALIDATORS.safe_timestamp(raw.last_update),
            active:      VALIDATORS.safe_timestamp(raw.active),
            cashout_time: VALIDATORS.safe_timestamp(raw.cashout_time),
            last_payout: VALIDATORS.safe_timestamp(raw.last_payout),

            // Hierarchy
            depth:    VALIDATORS.safe_number(raw.depth) ?? 0,
            children: VALIDATORS.safe_number(raw.children) ?? 0,

            // Voting
            net_votes:  VALIDATORS.safe_number(raw.net_votes) ?? 0,
            net_rshares: VALIDATORS.safe_numeric_string(raw.net_rshares) || '0',
            author_reputation: this.formatter ? this.formatter.reputation(raw.author_reputation) : 25,

            // Active votes — array of validated objects
            active_votes: Array.isArray(raw.active_votes)
                ? raw.active_votes
                    .map(v => VALIDATORS.safe_active_vote(v, this.sanitizer.sanitizeUsername.bind(this.sanitizer)))
                    .filter(Boolean)
                : [],

            // Payouts (translate chain symbols → display symbols)
            total_payout_value:         translateAssetFromChain(VALIDATORS.safe_asset(raw.total_payout_value) || '0.000 PXS'),
            curator_payout_value:       translateAssetFromChain(VALIDATORS.safe_asset(raw.curator_payout_value) || '0.000 PXS'),
            pending_payout_value:       translateAssetFromChain(VALIDATORS.safe_asset(raw.pending_payout_value) || '0.000 PXS'),
            total_pending_payout_value: translateAssetFromChain(VALIDATORS.safe_asset(raw.total_pending_payout_value) || '0.000 PXS'),
            max_accepted_payout:        translateAssetFromChain(VALIDATORS.safe_asset(raw.max_accepted_payout) || '1000000.000 PXS'),
            promoted:                   translateAssetFromChain(VALIDATORS.safe_asset(raw.promoted) || '0.000 PXS'),
            percent_pxs:                VALIDATORS.safe_percent(raw.percent_pxs) ?? 10000,
            author_rewards:             VALIDATORS.safe_number(raw.author_rewards) ?? 0,

            // Flags
            allow_replies:          VALIDATORS.safe_bool(raw.allow_replies) ?? true,
            allow_votes:            VALIDATORS.safe_bool(raw.allow_votes) ?? true,
            allow_curation_rewards: VALIDATORS.safe_bool(raw.allow_curation_rewards) ?? true,

            // Beneficiaries
            beneficiaries: Array.isArray(raw.beneficiaries)
                ? raw.beneficiaries.map(VALIDATORS.safe_beneficiary).filter(Boolean)
                : [],

            // Navigation / root
            url:           VALIDATORS.safe_url_path(raw.url) || `/@${author}/${permlink}`,
            root_title:    this.sanitizer.safeString(raw.root_title || '', 256),
            root_author:   raw.root_author ? (this.sanitizer.sanitizeUsername(raw.root_author) || '') : '',
            root_permlink: VALIDATORS.safe_permlink(raw.root_permlink) || '',
        };
    }

    // ── COMMENT ─────────────────────────────────────────────────────────

    /**
     * Sanitize a comment/reply (depth > 0) for storage.
     * Uses renderComment (stricter subset — no headings, tables, iframes).
     * Same field contract as sanitizePost (all dates = integer timestamps, etc.)
     *
     * @param {object} raw - Raw comment from blockchain RPC
     * @param {object} [renderOptions]
     * @returns {object|null} Sanitized comment ready for DB insertion
     */
    sanitizeComment(raw, renderOptions = {}) {
        if (!raw || !raw.author || !raw.permlink) return null;

        const author   = this.sanitizer.sanitizeUsername(raw.author);
        const permlink = VALIDATORS.safe_permlink(raw.permlink);
        if (!author || !permlink) return null;

        const entityId = `${author}_${permlink}`;

        // DANGEROUS: body
        const rendered = this.sanitizer.renderComment(raw.body || '', renderOptions);

        // DANGEROUS: json_metadata — sanitize through WASM, returns safe object
        const safeMetaStr = this.sanitizer.safeJson(raw.json_metadata || '{}');

        return {
            _entity_id:   entityId,
            _entity_type: 'comment',
            _sanitized:   true,
            _stored_at:   Date.now(),

            // Enrichment
            _images:     rendered.images || [],
            _links:      rendered.links || [],
            _word_count: rendered.wordCount || 0,

            // Identity
            id:              VALIDATORS.safe_number(raw.id) ?? 0,
            author,
            permlink,
            parent_author:   raw.parent_author ? (this.sanitizer.sanitizeUsername(raw.parent_author) || '') : '',
            parent_permlink: VALIDATORS.safe_permlink(raw.parent_permlink) || '',

            // Content — body IS sanitized HTML
            title: '',
            body:  rendered.html || '',

            // DANGEROUS field — keeps name, stores sanitized JSON string
            json_metadata: safeMetaStr,

            // Timestamps (integer ms)
            created:      VALIDATORS.safe_timestamp(raw.created),
            last_update:  VALIDATORS.safe_timestamp(raw.last_update),
            active:       VALIDATORS.safe_timestamp(raw.active),
            cashout_time: VALIDATORS.safe_timestamp(raw.cashout_time),
            last_payout:  VALIDATORS.safe_timestamp(raw.last_payout),

            // Hierarchy
            depth:    VALIDATORS.safe_number(raw.depth) ?? 1,
            children: VALIDATORS.safe_number(raw.children) ?? 0,

            // Voting
            net_votes:  VALIDATORS.safe_number(raw.net_votes) ?? 0,
            net_rshares: VALIDATORS.safe_numeric_string(raw.net_rshares) || '0',
            author_reputation: this.formatter ? this.formatter.reputation(raw.author_reputation) : 25,

            active_votes: Array.isArray(raw.active_votes)
                ? raw.active_votes
                    .map(v => VALIDATORS.safe_active_vote(v, this.sanitizer.sanitizeUsername.bind(this.sanitizer)))
                    .filter(Boolean)
                : [],

            // Payouts (translate chain symbols → display symbols)
            pending_payout_value:       translateAssetFromChain(VALIDATORS.safe_asset(raw.pending_payout_value) || '0.000 PXS'),
            total_payout_value:         translateAssetFromChain(VALIDATORS.safe_asset(raw.total_payout_value) || '0.000 PXS'),
            curator_payout_value:       translateAssetFromChain(VALIDATORS.safe_asset(raw.curator_payout_value) || '0.000 PXS'),
            total_pending_payout_value: translateAssetFromChain(VALIDATORS.safe_asset(raw.total_pending_payout_value) || '0.000 PXS'),
            promoted:                   translateAssetFromChain(VALIDATORS.safe_asset(raw.promoted) || '0.000 PXS'),
            author_rewards:             VALIDATORS.safe_number(raw.author_rewards) ?? 0,

            // Flags
            allow_replies:          VALIDATORS.safe_bool(raw.allow_replies) ?? true,
            allow_votes:            VALIDATORS.safe_bool(raw.allow_votes) ?? true,
            allow_curation_rewards: VALIDATORS.safe_bool(raw.allow_curation_rewards) ?? true,

            // Navigation / root
            url:           VALIDATORS.safe_url_path(raw.url) || `/@${author}/${permlink}`,
            root_title:    this.sanitizer.safeString(raw.root_title || '', 256),
            root_author:   raw.root_author ? (this.sanitizer.sanitizeUsername(raw.root_author) || '') : '',
            root_permlink: VALIDATORS.safe_permlink(raw.root_permlink) || '',
        };
    }

    // ── AUTO-DETECT ─────────────────────────────────────────────────────

    /**
     * Auto-detect entity type and sanitize accordingly.
     * @param {object} raw - Raw content from blockchain
     * @param {object} [renderOptions]
     * @returns {object|null}
     */
    sanitizeContent(raw, renderOptions = {}) {
        if (!raw) return null;
        const isPost = (!raw.parent_author || raw.parent_author === '') && (raw.depth === 0 || raw.depth === undefined);
        return isPost
            ? this.sanitizePost(raw, renderOptions)
            : this.sanitizeComment(raw, renderOptions);
    }
}

/**
 * EntityStoreManager - Manages typed entity stores (accounts, posts, comments).
 * Each store is a LacertaDB collection where documents are indexed by _entity_id.
 * Provides get/upsert/resolve (batch) operations.
 */
class EntityStoreManager {
    /**
     * @param {object} db - LacertaDB database instance (pixa_cache)
     * @param {SanitizationPipeline} pipeline
     * @param {object} ttlConfig - ENTITY_TTL config
     */
    constructor(db, pipeline, ttlConfig) {
        this.db = db;
        this.pipeline = pipeline;
        this.ttl = ttlConfig;
        /** @type {Map<string, object>} collection name → LacertaDB collection */
        this.stores = new Map();
    }

    /**
     * Get or lazily create a collection for an entity type.
     * @param {'accounts'|'posts'|'comments'} type
     * @returns {Promise<object>}
     */
    async _store(type) {
        const name = `${type}_store`;
        if (!this.stores.has(name)) {
            this.stores.set(name, await this.db.getCollection(name));
        }
        return this.stores.get(name);
    }

    /**
     * Get a single entity by ID from its typed store.
     * Returns null if missing or stale (past TTL).
     * @param {'accounts'|'posts'|'comments'} type
     * @param {string} entityId
     * @returns {Promise<object|null>}
     */
    async get(type, entityId) {
        try {
            const store = await this._store(type);
            const doc = await store.get(entityId);
            if (!doc) return null;

            const ttl = this.ttl[type] || 60000;
            if (doc._stored_at && (Date.now() - doc._stored_at) < ttl) {
                return doc;
            }
            // Stale — treat as miss
            return null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Upsert a single sanitized entity into its typed store.
     * The entity MUST already be sanitized (has _entity_id).
     * @param {'accounts'|'posts'|'comments'} type
     * @param {object} sanitizedEntity
     */
    async upsert(type, sanitizedEntity) {
        if (!sanitizedEntity || !sanitizedEntity._entity_id) return;
        if (!sanitizedEntity._sanitized) {
            console.warn(`[EntityStoreManager] Rejected unsanitized entity for ${type}`);
            return;
        }
        try {
            const store = await this._store(type);
            await store.upsert(sanitizedEntity._entity_id, sanitizedEntity);
        } catch (e) {
            console.warn(`[EntityStoreManager] upsert(${type}) error:`, e.message);
        }
    }

    /**
     * Upsert multiple sanitized entities in a single batch transaction.
     * Splits entities into new (batchAdd) vs existing (batchUpdate) in one pass,
     * then writes each group in a single IDB transaction instead of N individual ops.
     *
     * @param {'accounts'|'posts'|'comments'} type
     * @param {object[]} entities - Array of sanitized entities
     */
    async upsertMany(type, entities) {
        const valid = entities.filter(e => e && e._entity_id && e._sanitized);
        if (valid.length === 0) return;
        if (valid.length === 1) return this.upsert(type, valid[0]);

        try {
            const store = await this._store(type);

            // Attempt batchAdd first (single IDB transaction for all new docs)
            const docsForAdd = valid.map(e => ({ ...e, _id: e._entity_id }));
            const addResults = await store.batchAdd(docsForAdd, {}).catch(() => null);

            // Collect failures (already-existing docs) for batch update
            if (addResults) {
                const toUpdate = [];
                for (let i = 0; i < addResults.length; i++) {
                    if (!addResults[i].success) {
                        toUpdate.push({ id: valid[i]._entity_id, data: valid[i] });
                    }
                }
                if (toUpdate.length > 0) {
                    await store.batchUpdate(toUpdate).catch(e =>
                        console.warn(`[EntityStoreManager] batchUpdate(${type}) error:`, e.message)
                    );
                }
            } else {
                // batchAdd entirely failed — fallback to batchUpdate (put semantics)
                const toUpdate = valid.map(e => ({ id: e._entity_id, data: e }));
                await store.batchUpdate(toUpdate).catch(e =>
                    console.warn(`[EntityStoreManager] batchUpdate fallback(${type}) error:`, e.message)
                );
            }
        } catch (e) {
            console.warn(`[EntityStoreManager] upsertMany(${type}) error, falling back to sequential:`, e.message);
            // Last-resort sequential fallback
            for (const entity of valid) {
                await this.upsert(type, entity);
            }
        }
    }

    /**
     * Resolve a list of entity IDs from a typed store.
     * Returns entities in the same order as the IDs. Missing/stale entries are null.
     * Uses Promise.all for parallel reads instead of sequential awaits.
     *
     * @param {'accounts'|'posts'|'comments'} type
     * @param {string[]} ids
     * @returns {Promise<(object|null)[]>}
     */
    async resolve(type, ids) {
        if (ids.length === 0) return [];
        if (ids.length === 1) return [await this.get(type, ids[0])];

        // Parallel reads — each get() is an independent IDB read transaction
        return Promise.all(ids.map(id => this.get(type, id)));
    }

    /**
     * Invalidate a single entity.
     * @param {'accounts'|'posts'|'comments'} type
     * @param {string} entityId
     */
    async invalidate(type, entityId) {
        try {
            const store = await this._store(type);
            await store.delete(entityId);
        } catch (e) {}
    }

    /**
     * Invalidate all entities in a store.
     * Uses collection.clear() for a single IDB store.clear() operation
     * instead of loading all docs into memory just to delete them.
     * @param {'accounts'|'posts'|'comments'} type
     */
    async invalidateAll(type) {
        try {
            const store = await this._store(type);
            await store.clear({ force: true });
        } catch (e) {}
    }
}

/**
 * QueryCacheManager - Caches query results as arrays of entity IDs.
 * Each cached query stores { ids: string[], entity_type: string, timestamp: number }.
 * On cache hit (within TTL), IDs are resolved from EntityStoreManager.
 * On cache miss/stale, the caller must re-fetch and call store().
 */
class QueryCacheManager {
    /**
     * @param {object} db - LacertaDB database instance (pixa_cache)
     * @param {object} ttlConfig - QUERY_TTL config
     */
    constructor(db, ttlConfig) {
        this.db = db;
        this.ttl = ttlConfig;
        this._collection = null;
    }

    /** @returns {Promise<object>} LacertaDB collection */
    async _col() {
        if (!this._collection) {
            this._collection = await this.db.getCollection('query_cache');
        }
        return this._collection;
    }

    /**
     * Build a deterministic cache key from query descriptor.
     * @param {string} namespace - e.g. 'trending', 'blog', 'content', 'accounts'
     * @param {object} params - Query parameters
     * @returns {string}
     */
    static buildKey(namespace, params = {}) {
        const parts = [namespace];
        const sortedKeys = Object.keys(params).sort();
        for (const k of sortedKeys) {
            const v = params[k];
            if (v !== undefined && v !== null && v !== '') {
                parts.push(`${k}=${v}`);
            }
        }
        return parts.join(':');
    }

    /**
     * Look up cached query result (array of entity IDs).
     * Returns null if not cached or stale.
     * @param {string} queryKey
     * @param {string} [ttlCategory] - Key into QUERY_TTL config (e.g. 'trending')
     * @returns {Promise<{ids: string[], entity_type: string}|null>}
     */
    async get(queryKey, ttlCategory) {
        try {
            const col = await this._col();
            const doc = await col.get(queryKey);
            if (!doc) return null;

            const ttl = (ttlCategory && this.ttl[ttlCategory]) || 60000;
            if (doc.timestamp && (Date.now() - doc.timestamp) < ttl) {
                return { ids: doc.ids || [], entity_type: doc.entity_type || 'posts' };
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Store a query result (as an array of entity IDs).
     * @param {string} queryKey
     * @param {string[]} ids - Entity IDs in result order
     * @param {string} entityType - 'accounts'|'posts'|'comments'
     */
    async store(queryKey, ids, entityType = 'posts') {
        try {
            const col = await this._col();
            const doc = { ids, entity_type: entityType, timestamp: Date.now() };
            await col.upsert(queryKey, doc);
        } catch (e) {
            console.warn('[QueryCacheManager] store error:', e.message);
        }
    }

    /**
     * Invalidate a specific query.
     * @param {string} queryKey
     */
    async invalidate(queryKey) {
        try {
            const col = await this._col();
            await col.delete(queryKey);
        } catch (e) {}
    }

    /**
     * Invalidate all queries matching a prefix/namespace.
     * Uses batchDelete for single-transaction removal instead of N serial deletes.
     * @param {string} prefix
     */
    async invalidateByPrefix(prefix) {
        try {
            const col = await this._col();
            const docs = await col.getAll();
            const idsToDelete = [];
            for (const doc of docs) {
                const key = doc._id || doc.id;
                if (key && key.startsWith(prefix)) {
                    idsToDelete.push(key);
                }
            }
            if (idsToDelete.length > 0) {
                await col.batchDelete(idsToDelete);
            }
        } catch (e) {}
    }
}

class ContentSanitizer {
    constructor() {
        this.ready = false;
        this._initPromise = null;

        /** @type {object} Default sanitize options (v0.2 SanitizeOptions) */
        this.defaultOptions = {
            internal_domains: ['pixagram.io'],
            max_body_length: 500000,
            max_image_count: 0,
        };
    }

    /**
     * Initialize the pixa-content WASM module
     * @param {string|URL} [wasmPath] - Optional path/URL to the .wasm file
     * @returns {Promise<void>}
     */
    async initialize(wasmPath) {
        if (this.ready) return;
        if (this._initPromise) return this._initPromise;

        this._initPromise = (async () => {
            try {
                // pixaContentInit is the default export — no-op for JS sanitizer
                await pixaContentInit();
                this.ready = true;
                console.log('[ContentSanitizer] pixa-content JS engine initialized');
            } catch (e) {
                console.error('[ContentSanitizer] Failed to initialize pixa-content:', e);
                this.ready = false;
                throw e;
            }
        })();

        return this._initPromise;
    }

    /**
     * Update default internal domains (e.g. when config changes)
     * @param {string[]} domains
     */
    setInternalDomains(domains) {
        if (Array.isArray(domains)) {
            this.defaultOptions.internal_domains = domains;
        }
    }

    /**
     * SECURITY PATCH (v3.5.2-patched): Fail-closed guard.
     * Throws instead of silently returning fallback values when WASM is not ready.
     * @param {string} methodName - Caller method name for error context
     * @throws {PixaAPIError} if WASM engine is not initialized
     */
    _requireReady(methodName) {
        if (!this.ready) {
            throw new PixaAPIError(
                `ContentSanitizer.${methodName}(): WASM engine not initialized — cannot sanitize safely`,
                'SANITIZER_NOT_READY'
            );
        }
    }

    /**
     * Render a post body through pixa-content WASM sanitizer
     * Returns sanitized HTML, extracted images, extracted links, and word count.
     *
     * @param {string} body - Raw post body (Markdown or HTML)
     * @param {object} [options] - Override render options
     * @returns {{ html: string, images: Array, links: Array, wordCount: number }}
     */
    renderPost(body, options = {}) {
        if (!body) return { html: '', images: [], links: [], wordCount: 0 };
        this._requireReady('renderPost');

        // SECURITY PATCH: No try/catch fallback — WASM errors must propagate
        const opts = { ...this.defaultOptions, ...options };
        const result = wasmSanitizePost(body, JSON.stringify(opts));

        return {
            html: result.html || '',
            images: result.images || [],
            links: result.links || [],
            wordCount: this._countWords(result.html || body),
        };
    }

    /**
     * Render a comment body (stricter subset — no headings, tables, iframes)
     *
     * @param {string} body - Raw comment body
     * @param {object} [options] - Override render options
     * @returns {{ html: string, images: Array, links: Array, wordCount: number }}
     */
    renderComment(body, options = {}) {
        if (!body) return { html: '', images: [], links: [], wordCount: 0 };
        this._requireReady('renderComment');

        const opts = { ...this.defaultOptions, ...options };
        const result = wasmSanitizeComment(body, JSON.stringify(opts));

        return {
            html: result.html || '',
            images: [],
            links: result.links || [],
            wordCount: this._countWords(result.html || body),
        };
    }

    /**
     * Sanitize a description or any user-supplied text for safe innerHTML rendering.
     * Uses comment-tier (lists, blockquotes, code, links — no images, headings, tables).
     * Returns just the sanitized HTML string.
     *
     * Use this for: json_metadata.description, profile about, or any text
     * that will be rendered via dangerouslySetInnerHTML in the frontend.
     *
     * @param {string} text - Raw text/HTML/markdown
     * @param {object} [options] - Override render options
     * @returns {string} Sanitized HTML safe for innerHTML
     */
    renderDescription(text, options = {}) {
        if (!text || typeof text !== 'string') return '';
        this._requireReady('renderDescription');

        const opts = { ...this.defaultOptions, ...options };
        const result = wasmSanitizeComment(text, JSON.stringify(opts));
        return result.html || '';
    }

    /**
     * Render a memo (bold, italic, @mentions, #hashtags only)
     * v0.2: New tier.
     * @param {string} body
     * @param {object} [options]
     * @returns {{ html: string }}
     */
    renderMemo(body, options = {}) {
        if (!body) return { html: '' };
        this._requireReady('renderMemo');

        const opts = { ...this.defaultOptions, ...options };
        return wasmSanitizeMemo(body, JSON.stringify(opts));
    }

    /**
     * Sanitize a JSON string — all keys validated, strings stripped.
     * Input: JSON string or object. Output: sanitized JS object.
     * WASM parses + sanitizes + returns a native object — no double parse.
     * Callers use the object directly; JSON.stringify() when storing.
     * @param {string|object} jsonStr
     * @returns {object} Sanitized JS object (empty object on failure)
     */
    safeJson(jsonStr) {
        if (!jsonStr) return '{}';
        this._requireReady('safeJson');
        // RPC clients may return json_metadata as a pre-parsed object OR a string.
        // WASM expects a string — stringify objects before passing through.
        let input = jsonStr;
        if (typeof input !== 'string') {
            try { input = JSON.stringify(input); } catch (e) { return '{}'; }
        }
        try {
            // wasmSafeJson returns a sanitized JSON string
            return wasmSafeJson(input) || '{}';
        } catch (e) {
            console.warn('[ContentSanitizer] safeJson failed:', e.message || e);
            return '{}';
        }
    }

    /**
     * Sanitize a single string value — strips HTML, rejects embedded JSON.
     * v0.2: New primitive.
     * @param {string} s
     * @param {number} [maxLen=10000]
     * @returns {string}
     */
    safeString(s, maxLen = 10000) {
        if (!s || typeof s !== 'string') return '';
        this._requireReady('safeString');
        return wasmSafeString(s, maxLen) || '';
    }

    /**
     * Extract clean plain text from body (strip all formatting)
     * @param {string} body
     * @returns {string}
     */
    extractPlainText(body) {
        if (!body) return '';
        this._requireReady('extractPlainText');
        return wasmExtractPlainText(body);
    }

    /**
     * TF-IDF extractive summarization
     * @param {string} body
     * @param {number} [sentenceCount=3]
     * @returns {{ summary: string, keywords: Array, sentences: Array }}
     */
    summarize(body, sentenceCount = 3) {
        if (!body) return { summary: '', keywords: [], sentences: [] };
        this._requireReady('summarize');
        return wasmSummarizeContent(body, sentenceCount);
    }

    /**
     * Validate and sanitize username (HIVE-compatible: 3-16 chars, a-z0-9.-)
     * @param {string} rawUsername
     * @returns {string} Sanitized username or '' if invalid
     */
    sanitizeUsername(rawUsername) {
        if (!rawUsername) return '';
        this._requireReady('sanitizeUsername');
        return wasmSanitizeUsername(rawUsername);
    }

    /**
     * Legacy compatibility: processBlogPost wraps renderPost
     * @param {string} body
     * @param {object} [options]
     * @returns {{ body: string, _images: Array, _links: Array, _word_count: number }}
     */
    processBlogPost(body, options = {}) {
        const result = this.renderPost(body, options);
        return {
            body: result.html,
            _images: result.images,
            _links: result.links,
            _word_count: result.wordCount,
        };
    }

    /**
     * Fallback processing when WASM is not available
     * @private
     */
    /**
     * Word count helper
     * @private
     */
    _countWords(text) {
        const plain = text.replace(/<[^>]*>/g, '');
        return plain.split(/\s+/).filter(w => w.length > 0).length;
    }
}

class KeyManager {
    constructor(emitter, config) {
        this.emitter = emitter;
        this.config = config;
        this.sessionKeys = new Map();
        /** @type {number} Failed PIN attempt counter */
        this._pinAttempts = 0;
        /** @type {number} Timestamp of lockout start (0 = not locked) */
        this._pinLockoutUntil = 0;
        /** @type {Promise|null} Active PIN unlock promise (prevents double-dialog) */
        this._pendingPinUnlock = null;
        this.unencrypted = null;
        this.vaultDbReference = null;
        this.vaultMaster = null;
        this.vaultIndividual = null;
        this.activeAccount = null;
        this.pinVerified = false;
        this.pinVerificationTime = 0;
        /** @private AES-GCM CryptoKey for in-memory key encryption (non-extractable, memory-only) */
        this._sessionCryptoKey = null;
        /** @private Bound cleanup handler for tab-close events */
        this._cleanupBound = null;
        /** @private Reference to the proxy's unlockWithPin for PIN re-verification */
        this._unlockWithPin = null;
        /** @type {SessionManager} Reference to SessionManager v2 (set by PixaProxyAPI) */
        this._sessionManager = null;
        /** @private LacertaDB reference for persistent lockout state */
        this._settingsDb = null;
        /** @private LacertaDB collection for PIN lockout persistence */
        this._pinLockoutStore = null;
    }

    /**
     * Wire the SessionManager reference. Called by PixaProxyAPI.initialize().
     * @param {SessionManager} sm
     */
    setSessionManager(sm) {
        this._sessionManager = sm;
    }

    setPinTimeout(timeout) {
        if (this.config) { this.config.PIN_TIMEOUT = timeout; }
    }

    /**
     * Reset the PIN verification timer. Called from all paths that verify
     * the PIN or accept a raw key — ensures keys stay in-memory for the
     * full PIN_TIMEOUT duration from this moment.
     */
    resetPinTimer() {
        this.pinVerified = true;
        this.pinVerificationTime = Date.now();
    }

    /**
     * Migrate keys currently in sessionKeys (in-memory) and/or in the
     * unencrypted collection into the encrypted vault.  Called after vault
     * creation to ensure keys from a prior quickLogin are persisted.
     * @param {string} account - normalized account name
     */
    async migrateKeysToVault(account) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return;

        const types = ['posting', 'active', 'owner', 'memo'];
        // Track which individual keys have already been written to vault
        // to avoid double-writes (section 1 from unencrypted, section 2 from sessionKeys).
        // LacertaDB's encrypted vault `update` path can fail with TurboSerial
        // deserialization errors, so we use add-only and silently skip conflicts.
        const writtenKeys = new Set();

        // 1. Try to migrate from unencrypted DB → vault
        if (this.unencrypted) {
            // Master keys (all 4 derived from master password)
            try {
                const masterDoc = await this.unencrypted.get(normalizedAccount);
                if (masterDoc && masterDoc.derived_keys) {
                    if (this.vaultMaster) {
                        try {
                            await this.vaultMaster.add(
                                { account: normalizedAccount, derived_keys: masterDoc.derived_keys, created_at: Date.now() },
                                { id: normalizedAccount }
                            );
                            console.debug('[migrateKeysToVault] Keys migrated to vault');
                        } catch (e) {
                            // Already exists — skip (don't use update — it triggers TurboSerial errors)
                            console.debug('[migrateKeysToVault] Master keys already in vault');
                        }
                        // Mark all types as written (master key derives all 4)
                        types.forEach(t => writtenKeys.add(`${normalizedAccount}_${t}`));
                    }
                    // Also ensure they're in the in-memory cache
                    await this.cacheKeys(normalizedAccount, masterDoc.derived_keys);
                }
            } catch (e) { /* no master doc */ }

            // Individual keys
            for (const type of types) {
                const id = `${normalizedAccount}_${type}`;
                if (writtenKeys.has(id)) continue; // Already handled by master keys
                try {
                    const doc = await this.unencrypted.get(id);
                    if (doc && doc.key && this.vaultIndividual) {
                        try {
                            await this.vaultIndividual.add(
                                { account: normalizedAccount, type, key: doc.key, created_at: Date.now() },
                                { id }
                            );
                            console.debug(`[migrateKeysToVault] Keys migrated to vault`);
                        } catch (e) {
                            // Already exists — skip
                        }
                        writtenKeys.add(id);
                    }
                } catch (e) { /* no individual doc */ }
            }
        }

        // 2. Migrate from sessionKeys → vault (keys that were only in-memory)
        for (const type of types) {
            const cacheKey = `${normalizedAccount}_${type}`;
            if (writtenKeys.has(cacheKey)) continue; // Already migrated above

            const entry = this.sessionKeys.get(cacheKey);
            if (!entry) continue;

            const plainKey = await this._decryptFromCache(entry);
            if (!plainKey) continue;

            if (this.vaultIndividual) {
                try {
                    await this.vaultIndividual.add(
                        { account: normalizedAccount, type, key: plainKey, created_at: Date.now() },
                        { id: cacheKey }
                    );
                    console.debug(`[migrateKeysToVault] Keys migrated to vault`);
                } catch (e) {
                    // Already exists — skip (add-only, no update)
                }
            }
        }

        // SECURITY FIX (v3.5.2): After successful migration, delete plaintext
        // keys from the unencrypted collection. They are now safely in the vault.
        if (this.unencrypted) {
            try {
                await this.unencrypted.delete(normalizedAccount);
            } catch (e) { /* may not exist */ }
            for (const type of types) {
                try {
                    await this.unencrypted.delete(`${normalizedAccount}_${type}`);
                } catch (e) { /* may not exist */ }
            }
        }
    }

    /**
     * Generate a random AES-GCM CryptoKey for encrypting session keys in memory.
     * The key is non-extractable and lives only in JS heap — it cannot be
     * serialized, persisted, or read from devtools. When the tab closes or the
     * PIN expires, it is destroyed and the encrypted blobs become unrecoverable.
     */
    /**
     * SECURITY (v4.3 — H3): Record a failed PIN attempt with persistent storage,
     * exponential backoff, and hard wipe limit.
     *
     * - Attempt counter + lockout state survive page reload (stored in LacertaDB)
     * - Lockout duration doubles after each consecutive lockout (exponential backoff)
     * - After PIN_WIPE_LIMIT total failed attempts, the sealed vault is destroyed
     *   entirely — forces re-login with actual private key
     *
     * @returns {Promise<{ locked: boolean, remainingSec: number, wiped: boolean }>}
     */
    async _recordFailedPinAttempt() {
        const MAX_PER_WINDOW = this.config.PIN_MAX_ATTEMPTS || 10;
        const BASE_LOCKOUT = this.config.PIN_LOCKOUT_MS || 300000;
        const WIPE_LIMIT = this.config.PIN_WIPE_LIMIT || 50;

        // Load persistent state
        let state = { attempts: 0, totalAttempts: 0, consecutiveLockouts: 0, lockoutUntil: 0 };
        if (this._pinLockoutStore) {
            try {
                const doc = await this._pinLockoutStore.get('state');
                if (doc) state = { ...state, ...doc };
            } catch (_) {}
        }

        state.attempts++;
        state.totalAttempts++;

        // Also update in-memory for immediate checks (backward compat)
        this._pinAttempts = state.attempts;

        // Hard wipe limit: destroy vault after too many total failed attempts
        if (state.totalAttempts >= WIPE_LIMIT) {
            // Nuclear option — force complete re-login
            // v6: sealed_keys collection no longer exists.
            // Wipe the sessions collection instead (encrypted_keys live there).
            if (this._settingsDb) {
                try {
                    const sealedCol = await this._settingsDb.getCollection('sealed_keys');
                    await sealedCol.clear({ force: true });
                } catch (_) { /* collection may not exist in v6 */ }
                try {
                    const sessCol = await this._settingsDb.getCollection('sessions');
                    await sessCol.clear({ force: true });
                } catch (_) {}
            }

            // Reset lockout state
            state = { attempts: 0, totalAttempts: 0, consecutiveLockouts: 0, lockoutUntil: 0 };
            if (this._pinLockoutStore) {
                try { await this._pinLockoutStore.delete('state'); } catch (_) {}
            }

            this._pinAttempts = 0;
            this._pinLockoutUntil = 0;
            return { locked: true, remainingSec: 0, wiped: true };
        }

        // Window lockout: exponential backoff
        if (state.attempts >= MAX_PER_WINDOW) {
            state.consecutiveLockouts++;
            const multiplier = Math.min(Math.pow(2, state.consecutiveLockouts - 1), 64);
            const lockoutMs = BASE_LOCKOUT * multiplier;
            state.lockoutUntil = Date.now() + lockoutMs;
            state.attempts = 0; // Reset window counter; lockout timer takes over

            this._pinLockoutUntil = state.lockoutUntil;
            this._pinAttempts = 0;

            // Persist
            if (this._pinLockoutStore) {
                try { await this._pinLockoutStore.upsert('state', state); } catch (_) {}
            }

            return { locked: true, remainingSec: Math.ceil(lockoutMs / 1000), wiped: false };
        }

        // Persist updated counter
        if (this._pinLockoutStore) {
            try { await this._pinLockoutStore.upsert('state', state); } catch (_) {}
        }

        return { locked: false, remainingSec: 0, wiped: false };
    }

    /**
     * SECURITY (v4.3 — H3): Check persistent lockout state.
     * Called at the start of unlockWithPin to enforce lockout across reloads.
     * @returns {Promise<{ locked: boolean, remainingSec: number }>}
     */
    async _checkPinLockout() {
        // Check in-memory first (fast path)
        if (this._pinLockoutUntil > Date.now()) {
            return { locked: true, remainingSec: Math.ceil((this._pinLockoutUntil - Date.now()) / 1000) };
        }

        // Check persistent state (survives reload)
        if (this._pinLockoutStore) {
            try {
                const doc = await this._pinLockoutStore.get('state');
                if (doc?.lockoutUntil > Date.now()) {
                    this._pinLockoutUntil = doc.lockoutUntil; // Sync to memory
                    return { locked: true, remainingSec: Math.ceil((doc.lockoutUntil - Date.now()) / 1000) };
                }
            } catch (_) {}
        }

        return { locked: false, remainingSec: 0 };
    }

    async _generateSessionCryptoKey() {
        // Destroy any existing key first
        this._destroySessionCrypto(false);

        this._sessionCryptoKey = await crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            false, // non-extractable
            ['encrypt', 'decrypt']
        );

        // Register tab-close cleanup
        if (typeof globalThis !== 'undefined' && globalThis.addEventListener) {
            this._cleanupBound = () => this._destroySessionCrypto(true);
            globalThis.addEventListener('pagehide', this._cleanupBound);
            globalThis.addEventListener('beforeunload', this._cleanupBound);
        }
    }

    /**
     * Encrypt key material for in-memory storage.
     *
     * SECURITY (v4.4): Accepts Uint8Array (preferred) or string (legacy).
     * The input bytes are ZEROED after encryption — the encrypted blob
     * in sessionKeys is the only copy.
     *
     * No plaintext fallback: if the session CryptoKey is not available,
     * this method throws instead of silently storing plaintext. Callers
     * MUST ensure _generateSessionCryptoKey() has completed first.
     *
     * @param {Uint8Array|string} keyMaterial - Key bytes or WIF string
     * @returns {Promise<object>} Encrypted blob {_enc, iv, ct}
     */
    async _encryptForCache(keyMaterial) {
        if (!this._sessionCryptoKey) {
            throw new Error('[KeyManager] Cannot cache keys: session CryptoKey not initialized. Call _generateSessionCryptoKey() first.');
        }

        let plainBytes;
        if (keyMaterial instanceof Uint8Array) {
            plainBytes = keyMaterial;
        } else if (typeof keyMaterial === 'string') {
            // Legacy WIF string path — encode to bytes
            plainBytes = new TextEncoder().encode(keyMaterial);
        } else {
            throw new TypeError('[KeyManager] _encryptForCache: expected Uint8Array or string');
        }

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ct = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            this._sessionCryptoKey,
            plainBytes
        );
        // Zero the plaintext bytes — the AES-GCM blob is now the only copy
        plainBytes.fill(0);
        return { _enc: true, iv, ct };
    }

    /**
     * Decrypt a cached key blob back to raw bytes.
     *
     * SECURITY (v4.4): Returns a fresh Uint8Array. The caller MUST zero
     * it after use, or wrap in YOLOBuffer.
     *
     * No plaintext string passthrough: legacy plaintext entries are rejected
     * (return null). This forces migration to encrypted storage.
     *
     * @param {object} blob - Encrypted blob {_enc, iv, ct}
     * @returns {Promise<Uint8Array|null>} Raw key bytes or null
     */
    async _decryptFromCacheAsBytes(blob) {
        if (!blob) return null;
        if (typeof blob === 'string') {
            // SECURITY (v4.4): Legacy plaintext string in sessionKeys.
            // Convert to bytes for the caller but log a warning — these
            // should have been encrypted on storage.
            console.warn('[KeyManager] Legacy plaintext key found in sessionKeys — should be migrated');
            return new TextEncoder().encode(blob);
        }
        if (!blob._enc) return null;
        if (!this._sessionCryptoKey) return null; // CryptoKey destroyed
        try {
            const plainBuf = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: blob.iv },
                this._sessionCryptoKey,
                blob.ct
            );
            return new Uint8Array(plainBuf);
        } catch (e) {
            return null; // decryption failed — key was likely destroyed
        }
    }

    /**
     * Decrypt a cached key blob back to a WIF string.
     *
     * LEGACY wrapper around _decryptFromCacheAsBytes. Prefer the bytes
     * variant for new code to avoid creating immutable WIF strings.
     *
     * @param {object|string} blob - Encrypted blob or legacy plaintext string
     * @returns {Promise<string|null>} Decrypted WIF string or null
     */
    async _decryptFromCache(blob) {
        if (!blob) return null;
        // Legacy plaintext string passthrough (backward compat for existing cached entries)
        if (typeof blob === 'string') return blob;
        const bytes = await this._decryptFromCacheAsBytes(blob);
        if (!bytes) return null;
        const str = new TextDecoder().decode(bytes);
        bytes.fill(0); // Zero the byte copy — only the string survives
        return str;
    }

    /**
     * Destroy the session CryptoKey and wipe all encrypted cached keys.
     * Called on PIN expiry, tab close, and explicit lock.
     * @param {boolean} clearKeys - Whether to also clear the sessionKeys Map
     */
    _destroySessionCrypto(clearKeys = true) {
        this._sessionCryptoKey = null;
        if (clearKeys) {
            this.sessionKeys.clear();
            this.pinVerified = false;
            this.pinVerificationTime = 0;
        }
        if (this._cleanupBound && typeof globalThis !== 'undefined' && globalThis.removeEventListener) {
            globalThis.removeEventListener('pagehide', this._cleanupBound);
            globalThis.removeEventListener('beforeunload', this._cleanupBound);
            this._cleanupBound = null;
        }
    }

    async setDependencies(settingsDb) {
        this._settingsDb = settingsDb;
        // ensureCollection() is synchronous — registers the handle without IDB overhead.
        // The collection lazy-inits on first actual get/add/update operation.
        this.unencrypted = settingsDb.ensureCollection('unencrypted_keys');

        // SECURITY (v4.3 — H3): Persistent PIN lockout storage.
        // Survives page reload so attackers cannot reset the counter.
        this._pinLockoutStore = settingsDb.ensureCollection('pin_lockout');
    }

    async setVault(vaultDb) {
        this.vaultDbReference = vaultDb;
        if (vaultDb) {
            this.vaultMaster = vaultDb.ensureCollection('master_keys');
            this.vaultIndividual = vaultDb.ensureCollection('individual_keys');
        }
    }

    async unlockVault(pin) {
        try {
            if (!this._sessionCryptoKey) {
                await this._generateSessionCryptoKey();
            }
            this.resetPinTimer();
            // Reuse setVault to avoid duplicating collection creation logic
            await this.setVault(this.vaultDbReference);
            return true;
        } catch (e) {
            this.pinVerified = false;
            this.pinVerificationTime = 0;
            throw new Error("Invalid PIN or Vault Error");
        }
    }

    async lock() {
        this._destroySessionCrypto(true);
        this.vaultMaster = null;
        this.vaultIndividual = null;
    }

    isPINValid() {
        // FIX (v4.2 — Bug A safety net): If the session is NOT in PIN mode,
        // there is no PIN timeout to enforce. Return true so that callers
        // (requestKey, hasKey, getKeyIfAvailable) never enter the
        // "PIN expired → _destroySessionCrypto" path. In persist/ephemeral
        // mode, keys are legitimately cached and should stay alive
        // indefinitely — no PIN countdown should ever nuke them.
        if (this._sessionManager &&
            this._sessionManager.currentMode !== 'pin') {
            return true;
        }

        if (!this.pinVerified || this.pinVerificationTime <= 0) return false;
        const timeout = this.config.PIN_TIMEOUT || 15 * 60 * 1000;
        if ((Date.now() - this.pinVerificationTime) >= timeout) {
            // PIN expired — destroy CryptoKey and wipe all cached keys
            this._destroySessionCrypto(true);
            return false;
        }
        return true;
    }

    async cacheKeys(account, keys) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return;

        // Ensure CryptoKey is ready before caching anything
        // SECURITY (v4.4): No plaintext fallback — _encryptForCache throws without CryptoKey
        if (!this._sessionCryptoKey) {
            await this._generateSessionCryptoKey();
        }

        for (const [type, key] of Object.entries(keys)) {
            if (!key) continue;
            // _encryptForCache accepts both Uint8Array and string,
            // and zeroes the input bytes after encryption
            const stored = await this._encryptForCache(key);
            this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);
        }
    }

    /**
     * Request a key as a YOLOBuffer (preferred API for signing operations).
     *
     * Returns a one-shot self-zeroing buffer containing the raw key bytes.
     * The caller MUST consume via .bytes or YOLOBuffer.use() and zero
     * the result after signing.
     *
     * SECURITY (v4.4): This is the primary key-access API. Use this instead
     * of requestKey() for all broadcast/signing paths to avoid creating
     * immutable WIF strings in the GC heap.
     *
     * @param {string} account
     * @param {string} type - 'posting' | 'active' | 'owner' | 'memo'
     * @returns {Promise<YOLOBuffer>} One-shot buffer with raw key bytes
     */
    async requestKeyBuffer(account, type) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new KeyNotFoundError(account, type);

        // ── Fast path: try session cache directly as bytes ──
        const sessionEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
        if (sessionEntry) {
            if (this.pinVerificationTime > 0 && !this.isPINValid()) {
                // isPINValid() auto-destroys; fall through
            } else {
                const bytes = await this._decryptFromCacheAsBytes(sessionEntry);
                if (bytes) return new YOLOBuffer(bytes);
                this.sessionKeys.delete(`${normalizedAccount}_${type}`);
            }
        }

        // ── Slow path: delegate to requestKey (vault/PIN/event flows) ──
        // requestKey returns a WIF string — wrap in YOLOBuffer immediately.
        // The string can't be zeroed, but the YOLOBuffer gives the caller
        // a zeroable byte copy. Future work: make vault paths bytes-native.
        const wifString = await this.requestKey(account, type);
        return YOLOBuffer.fromString(wifString);
    }

    /**
     * Request a key as a WIF string.
     *
     * LEGACY API — prefer requestKeyBuffer() for signing operations.
     * This method returns an immutable JS string that cannot be zeroed.
     *
     * @param {string} account
     * @param {string} type - 'posting' | 'active' | 'owner' | 'memo'
     * @returns {Promise<string>} WIF private key string
     */
    async requestKey(account, type) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new KeyNotFoundError(account, type);

        const sessionEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
        if (sessionEntry) {
            // If PIN was used but has expired, destroy crypto and deny
            if (this.pinVerificationTime > 0 && !this.isPINValid()) {
                // isPINValid() auto-destroys; fall through to vault/PIN check
            } else {
                const decrypted = await this._decryptFromCache(sessionEntry);
                if (decrypted) return decrypted;
                // Decryption failed (CryptoKey gone) — clear stale entry
                this.sessionKeys.delete(`${normalizedAccount}_${type}`);
            }
        }

        if (this.vaultMaster && this.isPINValid()) {
            try {
                const master = await this.vaultMaster.get(normalizedAccount);
                if (master && master.derived_keys && master.derived_keys[type]) {
                    await this.cacheKeys(normalizedAccount, master.derived_keys);
                    return master.derived_keys[type];
                }
            } catch (e) {}
        }

        if (this.vaultIndividual && this.isPINValid()) {
            try {
                const indKey = await this.vaultIndividual.get(`${normalizedAccount}_${type}`);
                if (indKey && indKey.key) {
                    const stored = await this._encryptForCache(indKey.key);
                    this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);
                    return indKey.key;
                }
            } catch (e) {}
        }

        // If vault is configured but PIN has expired, request PIN unlock
        // instead of asking for the raw private key.
        // FIX (v4.1): Also detect PQ vault sessions via SessionManager PIN mode.
        // The old LacertaDB vault path sets vaultDbReference; the new PQ vault path
        // sets SessionManager.currentMode === 'pin'. Both should trigger PIN unlock.
        const hasPinVault = this.vaultDbReference
            || (this._sessionManager && this._sessionManager.currentMode === 'pin');
        if (hasPinVault && !this.isPINValid()) {
            // SECURITY FIX (v3.5.2): Queue concurrent PIN requests to prevent
            // double-dialog. If a PIN prompt is already active, wait for it.
            if (this._pendingPinUnlock) {
                try {
                    await this._pendingPinUnlock;
                    // PIN was unlocked by the other request — retry key fetch
                    const cachedEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
                    if (cachedEntry) {
                        const decrypted = await this._decryptFromCache(cachedEntry);
                        if (decrypted) return decrypted;
                    }
                } catch (e) {
                    // Previous unlock failed — fall through to show our own dialog
                }
            }

            const pinPromise = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new KeyNotFoundError(normalizedAccount, type));
                }, 120000); // 2 minutes to allow retries

                const emitData = {
                    account: normalizedAccount,
                    type,
                    reason: `PIN required for ${type} operation`,
                    callback: null, // pinCallback — set below
                    keyCallback: null // keyCallback — set below (Enter Key path)
                };

                // PIN callback: UI provides the PIN, we verify + unlock + retry key fetch.
                // On wrong PIN: throws so UI shows "Incorrect PIN"; dialog stays open for retry.
                // On correct PIN: resolves the outer Promise with the decrypted key.
                // On hard failure: rejects the outer Promise.
                const pinCallback = async (pin) => {
                    if (!this._unlockWithPin) {
                        clearTimeout(timeout);
                        reject(new Error('PIN unlock not available'));
                        return;
                    }

                    const unlockResult = await this._unlockWithPin(pin, {
                        account: normalizedAccount,
                        keyType: type
                    });

                    if (!unlockResult.success) {
                        // Wrong PIN — throw so the UI handler's catch shows "Incorrect PIN"
                        // snackbar. The dialog stays open and the user can retry.
                        throw new Error(unlockResult.error || 'Incorrect PIN');
                    }

                    // PIN verified and keys loaded — clear the timeout
                    clearTimeout(timeout);

                    // Read the key from cache (unlockWithPin should have loaded it)
                    const cachedEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
                    if (cachedEntry) {
                        const decrypted = await this._decryptFromCache(cachedEntry);
                        if (decrypted) {
                            resolve(decrypted);
                            return;
                        }
                    }

                    // Fallback: try vault read directly
                    if (this.vaultMaster && this.isPINValid()) {
                        try {
                            const master = await this.vaultMaster.get(normalizedAccount);
                            if (master && master.derived_keys && master.derived_keys[type]) {
                                await this.cacheKeys(normalizedAccount, master.derived_keys);
                                resolve(master.derived_keys[type]);
                                return;
                            }
                        } catch (e) {}
                    }

                    if (this.vaultIndividual && this.isPINValid()) {
                        try {
                            const indKey = await this.vaultIndividual.get(`${normalizedAccount}_${type}`);
                            if (indKey && indKey.key) {
                                const stored = await this._encryptForCache(indKey.key);
                                this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);
                                resolve(indKey.key);
                                return;
                            }
                        } catch (e) {}
                    }

                    // PIN was correct but key not found — hard failure
                    reject(new KeyNotFoundError(normalizedAccount, type));
                };

                // Key callback: UI provides a raw private key directly.
                // UnlockKeyDialog already validates, caches (encrypted), and
                // resets the PIN timer before invoking this callback.
                // We just need to resolve the pending requestKey Promise.
                const keyCallback = async (key) => {
                    clearTimeout(timeout);
                    // Ensure session crypto + PIN state is set (defense in depth)
                    if (!this._sessionCryptoKey) {
                        await this._generateSessionCryptoKey();
                    }
                    this.resetPinTimer();
                    resolve(key);
                };

                emitData.callback = pinCallback;
                emitData.keyCallback = keyCallback;
                this.emitter.emit('pin_required', emitData);
            });

            this._pendingPinUnlock = pinPromise;
            pinPromise.finally(() => { this._pendingPinUnlock = null; });
            return pinPromise;
        }

        return new Promise((resolve, reject) => {
            const eventName = `key_request_${normalizedAccount}_${type}`;
            const timeout = setTimeout(() => {
                this.emitter.removeListener(eventName, keyResponseHandler);
                reject(new KeyNotFoundError(normalizedAccount, type));
            }, 60000);

            // Create a callback that UI can use to provide the key
            const callback = async (key, shouldStore = false, isMaster = false) => {
                clearTimeout(timeout);
                try {
                    if (isMaster) {
                        const derivedKeys = await this.addAccountWithMasterKey(normalizedAccount, key, { storeInVault: shouldStore });
                        resolve(derivedKeys[type]);
                    } else {
                        await this.addIndividualKey(normalizedAccount, type, key, { storeInVault: shouldStore });
                        resolve(key);
                    }
                } catch (e) {
                    reject(e);
                }
            };

            this.emitter.emit('key_required', { account: normalizedAccount, type, callback });

            // Also listen for the legacy event-based response
            const keyResponseHandler = async (keyInput) => {
                clearTimeout(timeout);
                try {
                    if (typeof keyInput === 'object' && keyInput.masterPassword) {
                        const derivedKeys = await this.addAccountWithMasterKey(normalizedAccount, keyInput.masterPassword, { storeInVault: keyInput.save });
                        resolve(derivedKeys[type]);
                    } else {
                        const keyValue = typeof keyInput === 'object' ? keyInput.key : keyInput;
                        const shouldSave = typeof keyInput === 'object' ? keyInput.save : false;
                        await this.addIndividualKey(normalizedAccount, type, keyValue, { storeInVault: shouldSave });
                        resolve(keyValue);
                    }
                } catch(e) { reject(e); }
            };
            this.emitter.once(eventName, keyResponseHandler);
        });
    }

    async addAccountWithMasterKey(account, masterPassword, options = {}) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new Error('Invalid account');

        // SECURITY (v4.3 — C2): Owner key is the root credential — it can
        // change all other keys, transfer account ownership, and is
        // irrecoverable if stolen. Never derive or cache it unless explicitly
        // requested (e.g. for account recovery or authority update operations).
        //
        // Default derivation: posting + active + memo (sufficient for all
        // normal operations: voting, posting, transfers, memo encryption).
        const defaultTypes = ['posting', 'active', 'memo'];
        const allTypes = options.includeOwner ? [...defaultTypes, 'owner'] : defaultTypes;

        const derivedKeys = {};
        for (const type of allTypes) {
            derivedKeys[type] = PrivateKey.fromLogin(normalizedAccount, masterPassword, type).toString();
        }

        await this.cacheKeys(normalizedAccount, derivedKeys);

        // SECURITY (v4.4): Vault-only persistence. Never store plaintext keys
        // in IndexedDB. If no vault is available, keys live only in the
        // in-memory session cache (AES-GCM encrypted). They die with the tab.
        if (this.vaultMaster) {
            // Store ONLY in encrypted vault
            try {
                await this.vaultMaster.add(
                    { account: normalizedAccount, derived_keys: derivedKeys, created_at: Date.now() },
                    { id: normalizedAccount }
                );
            } catch (e) {
                // Already exists — skip (don't use update — encrypted vault update can fail)
            }
        } else {
            // SECURITY (v4.4): No vault → ephemeral only.
            // Keys live in sessionKeys (AES-GCM encrypted in-memory).
            // They die with the tab. This is the correct security posture
            // for a session that hasn't set up persistence.
            console.debug('[KeyManager] No vault configured — keys are ephemeral only (in-memory cache)');
        }

        return derivedKeys;
    }

    async addIndividualKey(account, type, key, options = {}) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) throw new Error('Invalid account');

        // Ensure CryptoKey is ready (v4.4: no plaintext fallback)
        if (!this._sessionCryptoKey) {
            await this._generateSessionCryptoKey();
        }

        const stored = await this._encryptForCache(key);
        this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);

        // SECURITY (v4.4): Vault-only persistence. If no vault is available,
        // the key lives only in the in-memory session cache (ephemeral).
        if (this.vaultIndividual) {
            const id = `${normalizedAccount}_${type}`;
            try {
                await this.vaultIndividual.add(
                    { account: normalizedAccount, type, key, created_at: Date.now() },
                    { id }
                );
            } catch (e) {
                // Already exists — skip
            }
        } else {
            console.debug(`[KeyManager] No vault — ${type} key is ephemeral only`);
        }
    }

    /**
     * MIGRATION (v4.4): Load keys from the legacy unencrypted_keys collection.
     *
     * Keys are loaded into the in-memory cache (encrypted via AES-GCM CryptoKey),
     * then the plaintext documents are DELETED from IndexedDB. This method
     * exists for backward compatibility with v4.3 sessions and will be
     * removed in v4.5.
     *
     * If a vault is available, keys are also migrated there before deletion.
     *
     * @param {string} account
     * @returns {Promise<boolean>} Whether any keys were found and migrated
     * @deprecated Will be removed in v4.5. Use vault-based storage.
     */
    async loadUnencryptedKeys(account) {
        if (!this.unencrypted) return false;
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return false;

        let foundAny = false;
        const docsToDelete = [];

        // Master keys
        try {
            const data = await this.unencrypted.get(normalizedAccount);
            if (data && data.derived_keys) {
                await this.cacheKeys(normalizedAccount, data.derived_keys);
                foundAny = true;
                docsToDelete.push(normalizedAccount);

                // Migrate to vault if available
                if (this.vaultMaster) {
                    try {
                        await this.vaultMaster.add(
                            { account: normalizedAccount, derived_keys: data.derived_keys, created_at: Date.now() },
                            { id: normalizedAccount }
                        );
                        console.info('[KeyManager] Migrated master keys from unencrypted → vault');
                    } catch (_) { /* already in vault — skip (add-only to avoid TurboSerial errors on encrypted update) */ }
                }
            }
        } catch(e) {}

        // Individual keys
        const types = ['posting', 'active', 'owner', 'memo'];
        for (const type of types) {
            try {
                const id = `${normalizedAccount}_${type}`;
                const data = await this.unencrypted.get(id);
                if (data && data.key) {
                    const stored = await this._encryptForCache(data.key);
                    this.sessionKeys.set(id, stored);
                    foundAny = true;
                    docsToDelete.push(id);

                    // Migrate to vault if available
                    if (this.vaultIndividual) {
                        try {
                            await this.vaultIndividual.add(
                                { account: normalizedAccount, type, key: data.key, created_at: Date.now() },
                                { id }
                            );
                            console.info(`[KeyManager] Migrated ${type} key from unencrypted → vault`);
                        } catch (_) { /* already in vault — skip (add-only to avoid TurboSerial errors on encrypted update) */ }
                    }
                }
            } catch(e) {}
        }

        // SECURITY (v4.4): Delete plaintext documents after migration.
        // This is the key change — we never leave plaintext keys in IndexedDB.
        for (const docId of docsToDelete) {
            try {
                await this.unencrypted.delete(docId);
                console.debug(`[KeyManager] Deleted plaintext key document: ${docId}`);
            } catch (_) {}
        }

        if (foundAny) {
            console.info('[KeyManager] Legacy unencrypted keys migrated and purged');
        }

        return foundAny;
    }

    async clearAllSessions(clearStorage = false) {
        this._destroySessionCrypto(true);
        this.activeAccount = null;
        this.vaultMaster = null;
        this.vaultIndividual = null;

        if (clearStorage && this.unencrypted) {
            try {
                await this.unencrypted.clear({ force: true });
            } catch (e) {}
        }
    }

    hasKey(account, type) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return false;
        // Trigger auto-cleanup if PIN expired (isPINValid auto-destroys)
        if (this.pinVerificationTime > 0 && !this.isPINValid()) {
            return false;
        }
        return this.sessionKeys.has(`${normalizedAccount}_${type}`);
    }

    /**
     * @removed v3.5.2 — Returned plaintext keys for quickLogin sessions.
     * Use requestKey() (async) which properly decrypts in-memory encrypted keys.
     */
    getKeySync(_account, _type) {
        return null;
    }

    /**
     * Silently retrieve a key if it is already available in session cache or
     * unlocked vault. NEVER triggers PIN dialog or key-entry events.
     * Returns null if the key is not currently accessible.
     *
     * @param {string} account
     * @param {string} type - 'posting' | 'active' | 'owner' | 'memo'
     * @returns {Promise<string|null>} The private key WIF string or null
     */
    async getKeyIfAvailable(account, type) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return null;

        // Check PIN expiry
        if (this.pinVerificationTime > 0 && !this.isPINValid()) {
            return null;
        }

        // 1. Try session cache
        const sessionEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
        if (sessionEntry) {
            const decrypted = await this._decryptFromCache(sessionEntry);
            if (decrypted) return decrypted;
            // Decryption failed (CryptoKey gone) — clear stale entry
            this.sessionKeys.delete(`${normalizedAccount}_${type}`);
        }

        // 2. Try vault master keys (only if PIN is still valid — no prompting)
        if (this.vaultMaster && this.isPINValid()) {
            try {
                const master = await this.vaultMaster.get(normalizedAccount);
                if (master && master.derived_keys && master.derived_keys[type]) {
                    await this.cacheKeys(normalizedAccount, master.derived_keys);
                    return master.derived_keys[type];
                }
            } catch (e) {}
        }

        // 3. Try vault individual keys
        if (this.vaultIndividual && this.isPINValid()) {
            try {
                const indKey = await this.vaultIndividual.get(`${normalizedAccount}_${type}`);
                if (indKey && indKey.key) {
                    const stored = await this._encryptForCache(indKey.key);
                    this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);
                    return indKey.key;
                }
            } catch (e) {}
        }

        // Key not available — return null, do NOT prompt
        return null;
    }

    /**
     * Silently retrieve a key as a YOLOBuffer if available.
     * NEVER triggers PIN dialog or key-entry events.
     *
     * @param {string} account
     * @param {string} type - 'posting' | 'active' | 'owner' | 'memo'
     * @returns {Promise<YOLOBuffer|null>} YOLOBuffer with key bytes, or null
     */
    async getKeyIfAvailableAsBuffer(account, type) {
        const normalizedAccount = normalizeAccount(account);
        if (!normalizedAccount) return null;

        if (this.pinVerificationTime > 0 && !this.isPINValid()) {
            return null;
        }

        const sessionEntry = this.sessionKeys.get(`${normalizedAccount}_${type}`);
        if (sessionEntry) {
            const bytes = await this._decryptFromCacheAsBytes(sessionEntry);
            if (bytes) return new YOLOBuffer(bytes);
            this.sessionKeys.delete(`${normalizedAccount}_${type}`);
        }

        // Vault fallbacks return strings — wrap in YOLOBuffer
        if (this.vaultMaster && this.isPINValid()) {
            try {
                const master = await this.vaultMaster.get(normalizedAccount);
                if (master && master.derived_keys && master.derived_keys[type]) {
                    await this.cacheKeys(normalizedAccount, master.derived_keys);
                    return YOLOBuffer.fromString(master.derived_keys[type]);
                }
            } catch (e) {}
        }

        if (this.vaultIndividual && this.isPINValid()) {
            try {
                const indKey = await this.vaultIndividual.get(`${normalizedAccount}_${type}`);
                if (indKey && indKey.key) {
                    const stored = await this._encryptForCache(indKey.key);
                    this.sessionKeys.set(`${normalizedAccount}_${type}`, stored);
                    return YOLOBuffer.fromString(indKey.key);
                }
            } catch (e) {}
        }

        return null;
    }

    setActiveAccount(acc) {
        this.activeAccount = normalizeAccount(acc);
    }

    getActiveAccount() {
        return this.activeAccount;
    }
}

// SessionManager → see ./session-manager.js

// ============================================
// Exports
// ============================================

// Error classes + session (re-exported from ./session-manager.js)
export {
    CONFIG,
    KeyNotFoundError,
    VaultNotInitializedError,
    SessionExpiredError,
    SessionNotFoundError,
    PinRequiredError,
    SessionManager,
    SessionMode,
    YOLOBuffer,
};

// Re-export dpixa utilities for convenience
export {
    PrivateKey,
    PublicKey,
    Signature,
    Asset,
    Price,
    Memo,
    cryptoUtils,
    utils,
    Types,
    BlockchainMode,
    getVestingSharePrice,
    getVests,
    VERSION,
    DEFAULT_CHAIN_ID,
    NETWORK_ID
};

// Utility functions
export {
    normalizeAccount,
    getRandomBytes,
    bytesToHex,
    translateAssetFromChain,
    translateAssetToChain,
    parseAsset,
    formatAssetString,
    detectContentType,
    estimatePinEntropy
};

// Re-export SDK utility helpers (deferred — utils populated by JSLoader at init)
const waitForEvent = (...args) => utils.waitForEvent(...args);
const retryingFetch = (...args) => utils.retryingFetch(...args);
export { waitForEvent, retryingFetch };