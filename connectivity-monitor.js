/**
 * ConnectivityMonitor — Standalone offline/online detection.
 *
 * Combines navigator.onLine with optional heartbeat pings to detect
 * actual reachability (navigator.onLine lies on some platforms).
 *
 * Fully standalone — no circular imports.
 *
 * @version 2.0.0
 * @module ConnectivityMonitor
 */

import { PixaEvents } from './events.js';

// ============================================
// Configuration
// ============================================

/** @typedef {object} ConnectivityConfig
 *  @property {string|null}  [heartbeatUrl=null]       — URL to ping for reachability
 *  @property {number}       [heartbeatInterval=30000]  — ms between heartbeat pings
 *  @property {number}       [heartbeatTimeout=5000]    — max wait for heartbeat response
 *  @property {number}       [retryDelay=3000]          — delay before retrying after offline
 */

const DEFAULTS = Object.freeze({
    heartbeatUrl:      null,
    heartbeatInterval: 30_000,
    heartbeatTimeout:  5_000,
    retryDelay:        3_000,
});

// ============================================
// ConnectivityMonitor Class
// ============================================

export class ConnectivityMonitor {

    // ── Private fields ──────────────────────────────

    /** @type {boolean} — current connectivity belief */
    #online;
    /** @type {string|null} */
    #heartbeatUrl;
    /** @type {number} */
    #heartbeatInterval;
    /** @type {number} */
    #heartbeatTimeout;

    /** @type {object|null} — shared EventEmitter */
    #emitter = null;
    /** @type {ReturnType<typeof setInterval>|null} */
    #heartbeatTimer = null;
    /** @type {boolean} */
    #initialized = false;

    /** @type {Function} — bound handler for cleanup */
    #onBrowserOnline;
    /** @type {Function} — bound handler for cleanup */
    #onBrowserOffline;

    // ── Constructor ─────────────────────────────────

    /**
     * @param {ConnectivityConfig} [config={}]
     */
    constructor(config = {}) {
        const cfg = { ...DEFAULTS, ...config };

        this.#online            = typeof navigator !== 'undefined' ? navigator.onLine : true;
        this.#heartbeatUrl      = cfg.heartbeatUrl;
        this.#heartbeatInterval = cfg.heartbeatInterval;
        this.#heartbeatTimeout  = cfg.heartbeatTimeout;

        // Bind once for clean add/removeEventListener pairing
        this.#onBrowserOnline  = () => this.#setOnline(true, 'browser');
        this.#onBrowserOffline = () => this.#setOnline(false, 'browser');
    }

    // ── Public getters ──────────────────────────────

    /** Whether we believe the client is currently online. */
    get isOnline() {
        return this.#online;
    }

    /** Whether the monitor has been initialized. */
    get isInitialized() {
        return this.#initialized;
    }

    // ── Lifecycle ───────────────────────────────────

    /**
     * Initialize — attach browser events and start heartbeat.
     * @param {object} eventEmitter — Shared event emitter (must support .emit)
     */
    initialize(eventEmitter) {
        if (this.#initialized) return;

        this.#emitter = eventEmitter;
        this.#initialized = true;

        if (typeof window !== 'undefined') {
            window.addEventListener('online',  this.#onBrowserOnline);
            window.addEventListener('offline', this.#onBrowserOffline);
        }

        // Sync with browser state
        if (typeof navigator !== 'undefined') {
            this.#online = navigator.onLine;
        }

        if (this.#heartbeatUrl) {
            this.#startHeartbeat();
        }
    }

    /**
     * Tear down all listeners and timers.
     */
    destroy() {
        this.#initialized = false;

        if (typeof window !== 'undefined') {
            window.removeEventListener('online',  this.#onBrowserOnline);
            window.removeEventListener('offline', this.#onBrowserOffline);
        }

        this.#stopHeartbeat();
        this.#emitter = null;
    }

    // ── Manual check ────────────────────────────────

    /**
     * Force a connectivity check right now.
     * Useful after a failed API call to re-evaluate state.
     *
     * @returns {Promise<boolean>} Current online state after check
     */
    async checkNow() {
        if (this.#heartbeatUrl) {
            await this.#doHeartbeat();
        } else {
            const browserState = typeof navigator !== 'undefined' ? navigator.onLine : true;
            if (browserState !== this.#online) {
                this.#setOnline(browserState, 'browser');
            }
        }
        return this.#online;
    }

    // ── Heartbeat internals ─────────────────────────

    /** @private */
    #startHeartbeat() {
        this.#doHeartbeat();
        this.#heartbeatTimer = setInterval(() => this.#doHeartbeat(), this.#heartbeatInterval);
    }

    /** @private */
    #stopHeartbeat() {
        if (this.#heartbeatTimer !== null) {
            clearInterval(this.#heartbeatTimer);
            this.#heartbeatTimer = null;
        }
    }

    /** @private */
    async #doHeartbeat() {
        if (!this.#heartbeatUrl) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.#heartbeatTimeout);

        try {
            await fetch(this.#heartbeatUrl, {
                method:  'HEAD',
                mode:    'no-cors',
                cache:   'no-store',
                signal:  controller.signal,
            });
            clearTimeout(timeoutId);

            // Reachable — correct if we thought we were offline
            if (!this.#online) {
                this.#setOnline(true, 'heartbeat');
            }
        } catch {
            clearTimeout(timeoutId);

            // Unreachable — navigator.onLine lied (captive portal, DNS failure)
            if (this.#online) {
                this.#setOnline(false, 'heartbeat');
            }
        }
    }

    // ── State transition ────────────────────────────

    /** @private */
    #setOnline(online, source) {
        const changed = online !== this.#online;
        this.#online = online;

        if (changed && this.#emitter) {
            this.#emitter.emit(PixaEvents.Connectivity.CHANGED, { online, source });

            if (online) {
                console.info(`[ConnectivityMonitor] Back online (detected by ${source})`);
            } else {
                console.warn(`[ConnectivityMonitor] Went offline (detected by ${source})`);
            }
        }
    }
}

export default ConnectivityMonitor;
