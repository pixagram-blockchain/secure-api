/**
 * ContentSanitizer — Pure JS content sanitization pipeline.
 *
 * Tiered sanitization for blockchain social content:
 *   Tier 1: Memo      — Minimal inline formatting only
 *   Tier 2: Comment   — Block elements + code, no images
 *   Tier 3: Post      — Full rich content including images
 *
 * Also provides:
 *   - JSON sanitization (depth-limited, key-validated)
 *   - Username sanitization (HIVE account rules)
 *   - Plain text extraction (HTML/Markdown → text)
 *   - TF-IDF extractive summarization
 *
 * Drop-in replacement for @pixagram/sanitizer WASM module.
 *
 * @version 2.0.0
 * @module ContentSanitizer
 */

import sanitizeHtmlLib from 'sanitize-html/index';
import { marked } from 'marked';

// ═══════════════════════════════════════════════════════════
// Marked configuration (module-level, set once)
// ═══════════════════════════════════════════════════════════

marked.setOptions({
    gfm:       true,
    breaks:    false,
    pedantic:  false,
    headerIds: false,
    mangle:    false,
});

// ═══════════════════════════════════════════════════════════
// SVG Security Analyzer
// ═══════════════════════════════════════════════════════════

/**
 * Validates SVG content embedded in data URIs against XSS vectors.
 * Covers: script injection, foreignObject, event handlers, dangerous
 * URI schemes, CSS expressions, XXE, xlink:href, animate attribute
 * injection, and <use> external references.
 */
class SvgSecurityAnalyzer {

    static #DANGEROUS_ELEMENTS = Object.freeze([
        '<script', '<foreignobject', '<handler', '<iframe',
        '<object', '<embed', '<applet',
    ]);

    static #DANGEROUS_SCHEMES = Object.freeze([
        'javascript:', 'vbscript:', 'data:text/html',
        'data:application/', 'data:text/xml',
    ]);

    static #CSS_ATTACKS = Object.freeze([
        'expression(', 'expression (',
        '-moz-binding',
        'behavior:',
        'url(javascript', 'url( javascript',
        'url(data:text', 'url( data:text',
        '@import',
    ]);

    /** @type {RegExp} — matches on[a-z]+= (all 60+ SVG event handlers) */
    static #EVENT_HANDLER_RE = /\bon[a-z]+\s*=/i;

    /** @type {RegExp} — animate elements targeting dangerous attributes */
    static #ANIMATE_RE = /<(?:animate|animatetransform|animatemotion|set)\b[^>]*attributename\s*=\s*["'](?:href|xlink:href|src|action|formaction)/i;

    /** @type {RegExp} — <use> with external HTTP references */
    static #USE_EXTERNAL_RE = /<use[^>]+href\s*=\s*["']https?:/i;

    /**
     * Check if decoded SVG content is safe.
     * @param {string} decoded — decoded SVG markup
     * @returns {boolean} true if safe
     */
    static isSafe(decoded) {
        const lower = decoded.toLowerCase();

        // 1. Dangerous elements
        for (const el of SvgSecurityAnalyzer.#DANGEROUS_ELEMENTS) {
            if (lower.includes(el)) return false;
        }

        // 2. Event handler attributes
        if (SvgSecurityAnalyzer.#EVENT_HANDLER_RE.test(decoded)) return false;

        // 3. Dangerous URI schemes
        for (const scheme of SvgSecurityAnalyzer.#DANGEROUS_SCHEMES) {
            if (lower.includes(scheme)) return false;
        }

        // 4. xlink:href / href with dangerous schemes
        const hrefMatches = lower.match(/(?:xlink:)?href\s*=\s*["']([^"']*)/g);
        if (hrefMatches) {
            for (const m of hrefMatches) {
                const val = m.replace(/.*=\s*["']/, '').trim();
                if (val.startsWith('javascript:') || val.startsWith('vbscript:') ||
                    val.startsWith('data:text')   || val.startsWith('data:application')) {
                    return false;
                }
            }
        }

        // 5. CSS-based JS execution
        for (const css of SvgSecurityAnalyzer.#CSS_ATTACKS) {
            if (lower.includes(css)) return false;
        }

        // 6. XML entity attacks (XXE)
        if (lower.includes('<!entity') || (lower.includes('<!doctype') &&
            (lower.includes('system') || lower.includes('public')))) {
            return false;
        }

        // 7. <use> with external references (SSRF)
        if (SvgSecurityAnalyzer.#USE_EXTERNAL_RE.test(decoded)) return false;

        // 8. <animate*> targeting dangerous attributes
        if (SvgSecurityAnalyzer.#ANIMATE_RE.test(decoded)) return false;

        return true;
    }
}

// ═══════════════════════════════════════════════════════════
// Image Utilities
// ═══════════════════════════════════════════════════════════

/** @type {RegExp} */
const BASE64_IMAGE_RE = /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml|bmp|ico|avif);base64,[A-Za-z0-9+/=]+$/;

class ImageUtils {

    static #MAX_BASE64_LENGTH = 7_000_000;
    static #MAX_URL_LENGTH    = 4_096;
    static #IMG_TAG_RE  = /<img[ \t\n\r][^>]*>/gi;
    static #SRC_ATTR_RE = /src[ \t\n\r]*=[ \t\n\r]*["']([^"']+)["']/i;
    static #ALT_ATTR_RE = /alt[ \t\n\r]*=[ \t\n\r]*["']([^"']*)["']/i;

    /**
     * Validate a base64 data URI image.
     * @param {string} dataUri
     * @returns {boolean}
     */
    static isValidBase64(dataUri) {
        if (dataUri.length > ImageUtils.#MAX_BASE64_LENGTH) return false;
        if (!BASE64_IMAGE_RE.test(dataUri)) return false;

        // SVG requires XSS analysis
        if (dataUri.startsWith('data:image/svg+xml;base64,')) {
            try {
                const b64     = dataUri.slice('data:image/svg+xml;base64,'.length);
                const decoded = atob(b64);
                return SvgSecurityAnalyzer.isSafe(decoded);
            } catch { return false; }
        }

        return true;
    }

    /**
     * Validate an HTTP(S) image URL.
     * @param {string} url
     * @returns {boolean}
     */
    static isValidUrl(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//')) return false;
        const lower = url.toLowerCase();
        if (lower.includes('javascript:') || lower.includes('data:') || lower.includes('vbscript:')) return false;
        return url.length <= ImageUtils.#MAX_URL_LENGTH;
    }

    /**
     * Extract image metadata from HTML.
     * @param {string} html — sanitized or raw HTML
     * @returns {Array<{ src: string, alt: string, is_base64: boolean, index: number }>}
     */
    static extract(html) {
        const images = [];
        let index = 0;
        const re = new RegExp(ImageUtils.#IMG_TAG_RE.source, 'gi');
        let match;

        while ((match = re.exec(html)) !== null) {
            const tag      = match[0];
            const srcMatch = ImageUtils.#SRC_ATTR_RE.exec(tag);
            if (!srcMatch?.[1]) continue;

            const src      = srcMatch[1];
            const altMatch = ImageUtils.#ALT_ATTR_RE.exec(tag);
            const alt      = altMatch?.[1] ?? '';
            const isBase64 = src.startsWith('data:');

            if (isBase64 && !ImageUtils.isValidBase64(src)) continue;
            if (!isBase64 && !ImageUtils.isValidUrl(src))   continue;

            images.push({ src, alt, is_base64: isBase64, index: index++ });
        }
        return images;
    }

    /**
     * Limit images in HTML to maxCount.
     * @param {string} html
     * @param {number} maxCount
     * @returns {string}
     */
    static limit(html, maxCount) {
        let count = 0;
        return html.replace(/<img[ \t\n\r][^>]*>/gi, (m) => ++count <= maxCount ? m : '');
    }
}

// ═══════════════════════════════════════════════════════════
// Text Processing Utilities
// ═══════════════════════════════════════════════════════════

class TextProcessor {

    static #HTML_ENTITY_MAP = Object.freeze({
        '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
        '&apos;': "'", '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ',
        '&ndash;': '\u2013', '&mdash;': '\u2014',
        '&lsquo;': '\u2018', '&rsquo;': '\u2019',
        '&ldquo;': '\u201c', '&rdquo;': '\u201d',
        '&hellip;': '\u2026', '&copy;': '\u00a9', '&reg;': '\u00ae',
        '&trade;': '\u2122', '&euro;': '\u20ac', '&pound;': '\u00a3',
        '&yen;': '\u00a5', '&cent;': '\u00a2', '&deg;': '\u00b0',
        '&times;': '\u00d7', '&divide;': '\u00f7', '&bull;': '\u2022',
        '&rarr;': '\u2192', '&larr;': '\u2190', '&uarr;': '\u2191', '&darr;': '\u2193',
    });

    /** Detect whether content is predominantly HTML vs Markdown. */
    static isPredominantlyHtml(content) {
        const trimmed = content.trim();
        if (/^<(!|html|div|p[ >])/.test(trimmed)) return true;

        const htmlIndicators = [
            '<p>', '<p ', '</p>', '<div', '</div>', '<h1', '<h2', '<h3',
            '<h4', '<h5', '<h6', '<table', '<tr', '<td', '<ul>', '<ol>',
            '</ul>', '</ol>', '<blockquote', '</blockquote>',
            '<br>', '<br/>', '<br />', '<hr>', '<hr/>', '<hr />',
        ];
        const mdIndicators = [
            '\n# ', '\n## ', '\n### ', '\n- ', '\n* ', '\n1. ',
            '\n> ', '\n```', '\n---', '\n***', '\n___', '\n|',
        ];

        const count = (indicators) => {
            let n = 0;
            for (const ind of indicators) {
                let idx = -1;
                while ((idx = content.indexOf(ind, idx + 1)) !== -1) n++;
            }
            return n;
        };

        const htmlCount = count(htmlIndicators);
        const mdCount   = count(mdIndicators);
        return htmlCount > mdCount && htmlCount >= 2;
    }

    /** Convert Markdown to HTML. */
    static markdownToHtml(md) {
        return marked.parse(md);
    }

    /** Decode HTML entities (named + numeric). */
    static decodeEntities(text) {
        let result = text;
        for (const [entity, replacement] of Object.entries(TextProcessor.#HTML_ENTITY_MAP)) {
            result = result.replaceAll(entity, replacement);
        }
        return result.replace(/&(#?[a-zA-Z0-9_]+);/g, (match, entity) => {
            if (entity.startsWith('#x') || entity.startsWith('#X')) {
                const code = parseInt(entity.slice(2), 16);
                return (isFinite(code) && code > 0) ? String.fromCodePoint(code) : match;
            }
            if (entity.startsWith('#')) {
                const code = parseInt(entity.slice(1), 10);
                return (isFinite(code) && code > 0) ? String.fromCodePoint(code) : match;
            }
            return match;
        });
    }

    /** Strip HTML tags and decode entities → plain text. */
    static htmlToPlainText(html) {
        let text = html;
        text = text.replace(/<br[ \t\n\r]*\/?>/gi, '\n');
        text = text.replace(/<\/?(p|div|h[1-6]|li|tr|blockquote|section|article|figure|figcaption|details|summary|dt|dd)(?:[ \t\n\r/][^>]*)?>/gi, '\n');
        text = text.replace(/<hr[ \t\n\r]*\/?>/gi, '\n');
        text = text.replace(/<[^>]+>/g, '');
        text = TextProcessor.decodeEntities(text);
        text = text.split('\n').map(l => l.trim()).join('\n');
        text = text.replace(/\n{3,}/g, '\n\n');
        return text.trim();
    }

    /** Normalize whitespace to single spaces. */
    static normalizeWhitespace(text) {
        return text.trim().replace(/[ \t\n\r\f]+/g, ' ');
    }

    /** Truncate body without splitting inside HTML tags. */
    static truncate(body, maxLen) {
        if (maxLen <= 0 || body.length <= maxLen) return body;
        const truncated = body.slice(0, maxLen);
        const lastLt = truncated.lastIndexOf('<');
        if (lastLt !== -1 && lastLt > maxLen - 200) return truncated.slice(0, lastLt);
        return truncated;
    }
}

// ═══════════════════════════════════════════════════════════
// Mention & Hashtag Processor
// ═══════════════════════════════════════════════════════════

class MentionProcessor {

    static #MENTION_RE = /(^|[ \t\n\r>(])@([a-zA-Z][a-zA-Z0-9.\-]{2,15})/g;
    static #HASHTAG_RE = /(^|[ \t\n\r>(])#([a-zA-Z][a-zA-Z0-9\-]{0,31})/g;

    static #htmlEscape(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    static #isValidUsername(username) {
        return username.length >= 3 && username.length <= 16
            && /^[a-z]/.test(username) && /^[a-z0-9.\-]+$/.test(username)
            && !/[.\-]{2}/.test(username) && !/[.\-]$/.test(username);
    }

    static #isContinuationChar(text, pos) {
        if (pos >= text.length) return false;
        const c = text.charCodeAt(pos);
        return (c >= 0x61 && c <= 0x7a) || (c >= 0x41 && c <= 0x5a)
            || (c >= 0x30 && c <= 0x39) || c === 0x2e || c === 0x2d;
    }

    static #isHashtagContinuation(text, pos) {
        if (pos >= text.length) return false;
        const c = text.charCodeAt(pos);
        return (c >= 0x61 && c <= 0x7a) || (c >= 0x41 && c <= 0x5a)
            || (c >= 0x30 && c <= 0x39) || c === 0x2d;
    }

    static #replaceWithBoundaryCheck(text, re, isContinuation, makeReplacement) {
        re.lastIndex = 0;
        let result  = '';
        let lastEnd = 0;
        let match;

        while ((match = re.exec(text)) !== null) {
            if (match.index < lastEnd) continue;
            if (isContinuation(text, match.index + match[0].length)) continue;

            const replacement = makeReplacement(match[2]);
            if (replacement !== null) {
                result += text.slice(lastEnd, match.index) + match[1] + replacement;
                lastEnd = match.index + match[0].length;
            }
        }
        return result + text.slice(lastEnd);
    }

    static #findTagEnd(html, start) {
        let pos     = start + 1;
        let inQuote = false;
        let quoteChar = '';
        while (pos < html.length) {
            const c = html[pos];
            if (inQuote) { if (c === quoteChar) inQuote = false; }
            else if (c === '"' || c === "'") { inQuote = true; quoteChar = c; }
            else if (c === '>') return pos;
            pos++;
        }
        return -1;
    }

    /**
     * Process @mentions and #hashtags in HTML, respecting link nesting.
     * @param {string} html
     * @returns {string}
     */
    static process(html) {
        let result = '';
        let pos = 0;
        let linkDepth = 0;

        while (pos < html.length) {
            if (html[pos] === '<') {
                const tagEnd = MentionProcessor.#findTagEnd(html, pos);
                if (tagEnd !== -1) {
                    const tag = html.slice(pos, tagEnd + 1);
                    const lower = tag.toLowerCase();
                    if (lower.startsWith('<a ') || lower === '<a>') linkDepth++;
                    else if (lower.startsWith('</a'))                linkDepth = Math.max(0, linkDepth - 1);
                    result += tag;
                    pos = tagEnd + 1;
                } else {
                    result += '<';
                    pos++;
                }
            } else {
                let textStart = pos;
                while (pos < html.length && html[pos] !== '<') pos++;
                const text = html.slice(textStart, pos);

                if (linkDepth > 0) {
                    result += text;
                } else {
                    let processed = MentionProcessor.#replaceWithBoundaryCheck(
                        text,
                        new RegExp(MentionProcessor.#MENTION_RE.source, 'g'),
                        MentionProcessor.#isContinuationChar,
                        (username) => {
                            const lower = username.toLowerCase();
                            if (!MentionProcessor.#isValidUsername(lower)) return null;
                            const esc = MentionProcessor.#htmlEscape(lower);
                            return `<a href="/@${esc}" class="pixa-mention" data-username="${esc}">@${esc}</a>`;
                        },
                    );
                    processed = MentionProcessor.#replaceWithBoundaryCheck(
                        processed,
                        new RegExp(MentionProcessor.#HASHTAG_RE.source, 'g'),
                        MentionProcessor.#isHashtagContinuation,
                        (tag) => {
                            const esc = MentionProcessor.#htmlEscape(tag.toLowerCase());
                            return `<a href="/trending/${esc}" class="pixa-hashtag">#${esc}</a>`;
                        },
                    );
                    result += processed;
                }
            }
        }
        return result;
    }
}

// ═══════════════════════════════════════════════════════════
// Link Processor
// ═══════════════════════════════════════════════════════════

class LinkProcessor {

    static #DEFAULT_INTERNAL_DOMAINS = Object.freeze([
        'pixa.pics', 'pixagram.com', 'hive.blog', 'peakd.com', 'ecency.com',
        'hivesigner.com', 'hive-keychain.com', 'splinterlands.com',
        'images.hive.blog', 'files.peakd.com', 'steemitimages.com', 'imgp.steemit.com',
    ]);

    static #LINK_TAG_RE  = /(<a[ \t\n\r][^>]*>)([\s\S]*?)<\/a>/gi;
    static #HREF_ATTR_RE = /href[ \t\n\r]*=[ \t\n\r]*["']([^"']+)["']/i;

    static #extractDomain(href) {
        try {
            return new URL(href.startsWith('//') ? `https:${href}` : href).hostname;
        } catch { return ''; }
    }

    static #isInternal(domain, customDomains) {
        const lower = domain.toLowerCase();
        const all   = [...LinkProcessor.#DEFAULT_INTERNAL_DOMAINS, ...customDomains];
        return all.some(d => {
            const dl = d.toLowerCase();
            return lower === dl || lower.endsWith(`.${dl}`);
        });
    }

    static #htmlEscapeAttr(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    static #stripTags(s) {
        let result = '';
        let inTag  = false;
        for (const c of s) {
            if (c === '<') inTag = true;
            else if (c === '>') inTag = false;
            else if (!inTag) result += c;
        }
        return result;
    }

    /**
     * Process links: extract metadata, mark external links with noopener.
     * @param {string} html
     * @param {string[]} customDomains
     * @returns {{ html: string, links: Array }}
     */
    static process(html, customDomains = []) {
        const links = [];

        const result = html.replace(LinkProcessor.#LINK_TAG_RE, (fullMatch, openTag, innerText) => {
            const hrefMatch = LinkProcessor.#HREF_ATTR_RE.exec(openTag);
            if (!hrefMatch?.[1]) return fullMatch;
            const href = hrefMatch[1];

            // Skip mention/hashtag links
            if (openTag.includes('pixa-mention') || openTag.includes('pixa-hashtag')) {
                links.push({ href, text: LinkProcessor.#stripTags(innerText), domain: '', is_external: false });
                return fullMatch;
            }

            const domain     = LinkProcessor.#extractDomain(href);
            const isExternal = !href.startsWith('/') && !href.startsWith('#')
                            && !href.startsWith('mailto:') && domain !== ''
                            && !LinkProcessor.#isInternal(domain, customDomains);

            links.push({ href, text: LinkProcessor.#stripTags(innerText), domain, is_external: isExternal });

            if (isExternal) {
                return `<a href="${LinkProcessor.#htmlEscapeAttr(href)}" class="pixa-external-link" data-external="true" data-domain="${LinkProcessor.#htmlEscapeAttr(domain)}" rel="noopener noreferrer" target="_blank">${innerText}</a>`;
            }
            return fullMatch;
        });

        return { html: result, links };
    }
}

// ═══════════════════════════════════════════════════════════
// sanitize-html Configurations
// ═══════════════════════════════════════════════════════════

const SAFE_CLASS_PATTERNS = [/^pixa-/, /^language-/, /^highlight-/, /^hljs/];

const SanitizeConfigs = Object.freeze({

    memo: {
        allowedTags:       ['strong', 'b', 'em', 'i', 'a'],
        allowedAttributes: { 'a': ['href', 'class', 'data-username'] },
        allowedSchemes:    ['https', 'mailto'],
        transformTags:     { 'a': sanitizeHtmlLib.simpleTransform('a', { rel: 'noopener noreferrer' }) },
    },

    comment: {
        allowedTags: [
            'strong', 'b', 'em', 'i', 'a', 'p', 'br',
            'blockquote', 'pre', 'code', 'ul', 'ol', 'li',
            'u', 's', 'del', 'sub', 'sup', 'mark', 'small',
        ],
        allowedAttributes: {
            'a':    ['href', 'title', 'rel', 'class', 'data-username'],
            'code': ['data-language'],
            '*':    ['class'],
        },
        allowedClasses:  { '*': SAFE_CLASS_PATTERNS },
        allowedSchemes:  ['http', 'https', 'mailto'],
        transformTags:   { 'a': sanitizeHtmlLib.simpleTransform('a', { rel: 'noopener noreferrer' }) },
    },

    post: {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
            'div', 'span', 'section', 'blockquote', 'pre', 'code',
            'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
            'caption', 'colgroup', 'col', 'ul', 'ol', 'li',
            'dl', 'dt', 'dd', 'figure', 'figcaption', 'details', 'summary', 'center',
            'a', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'mark',
            'small', 'sub', 'sup', 'abbr', 'cite', 'q', 'kbd', 'var', 'samp', 'time',
            'ruby', 'rt', 'rp', 'img',
        ],
        allowedAttributes: {
            'a':          ['href', 'title', 'rel', 'class', 'data-username'],
            'img':        ['src', 'alt', 'title', 'width', 'height', 'loading'],
            'td':         ['colspan', 'rowspan', 'align'],
            'th':         ['colspan', 'rowspan', 'align', 'scope'],
            'col':        ['span'],
            'colgroup':   ['span'],
            'code':       ['data-language'],
            'pre':        ['data-language'],
            'time':       ['datetime'],
            'blockquote': ['cite'],
            'abbr':       ['title'],
            '*':          ['class'],
        },
        allowedSchemes:            ['http', 'https', 'mailto'],
        allowedSchemesByTag:       { img: ['http', 'https', 'data'] },
        allowedClasses:            { '*': [...SAFE_CLASS_PATTERNS, /^text-/, /^align-/] },
        allowProtocolRelative:     true,
        transformTags:             { 'a': sanitizeHtmlLib.simpleTransform('a', { rel: 'noopener noreferrer' }) },
        allowedSchemesAppliedToAttributes: ['href', 'cite'],
    },

    strip: {
        allowedTags:       [],
        allowedAttributes: {},
    },
});

// ═══════════════════════════════════════════════════════════
// JSON Sanitizer
// ═══════════════════════════════════════════════════════════

class JsonSanitizer {

    static #MAX_DEPTH       = 5;
    static #MAX_STRING_LEN  = 10_000;
    static #MAX_IMAGE_LEN   = 7_000_000;
    static #MAX_ARRAY_LEN   = 100;
    static #MAX_OBJECT_KEYS = 50;
    static #VALID_KEY_RE    = /^[a-zA-Z_][a-zA-Z0-9_\-]{0,63}$/;

    static sanitize(jsonStr) {
        if (!jsonStr) return '{}';
        try {
            const raw   = JSON.parse(jsonStr);
            const clean = JsonSanitizer.#sanitizeValue(raw, 0);
            return clean !== null ? JSON.stringify(clean) : '{}';
        } catch { return '{}'; }
    }

    static #sanitizeValue(value, depth) {
        if (depth > JsonSanitizer.#MAX_DEPTH) return null;
        if (value === null || value === undefined) return null;

        const type = typeof value;

        if (type === 'string') {
            const limit = value.trim().startsWith('data:image/')
                ? JsonSanitizer.#MAX_IMAGE_LEN
                : JsonSanitizer.#MAX_STRING_LEN;
            return safeString(value, limit);
        }
        if (type === 'number')  return isFinite(value) ? value : null;
        if (type === 'boolean') return value;

        if (Array.isArray(value)) {
            return value.slice(0, JsonSanitizer.#MAX_ARRAY_LEN)
                .map(v => JsonSanitizer.#sanitizeValue(v, depth + 1))
                .filter(v => v !== null);
        }

        if (type === 'object') {
            const clean = {};
            const keys  = Object.keys(value).slice(0, JsonSanitizer.#MAX_OBJECT_KEYS);
            for (const k of keys) {
                if (!JsonSanitizer.#VALID_KEY_RE.test(k)) continue;
                const v = JsonSanitizer.#sanitizeValue(value[k], depth + 1);
                if (v !== null) clean[k] = v;
            }
            return clean;
        }

        return null;
    }
}

// ═══════════════════════════════════════════════════════════
// TF-IDF Summarizer
// ═══════════════════════════════════════════════════════════

class Summarizer {

    static #STOP_WORDS = new Set([
        'a', 'an', 'the', 'is', 'it', 'of', 'in', 'to', 'and', 'or', 'for',
        'on', 'at', 'by', 'be', 'as', 'so', 'if', 'do', 'no', 'up', 'he',
        'we', 'my', 'me', 'am', 'are', 'was', 'has', 'had', 'not', 'but',
        'its', 'his', 'her', 'she', 'him', 'our', 'you', 'all', 'can', 'did',
        'get', 'got', 'may', 'who', 'how', 'now', 'out', 'own', 'too', 'than',
        'that', 'them', 'then', 'they', 'this', 'from', 'with', 'what', 'when',
        'will', 'been', 'have', 'just', 'more', 'also', 'into', 'some', 'such',
        'very', 'your', 'much', 'were', 'here', 'there', 'which', 'about',
        'their', 'would', 'could', 'should', 'these', 'those', 'being', 'other',
        'after', 'where', 'while', 'because', 'through', 'between', 'before', 'during',
        'https', 'http', 'www', 'com', 'org', 'html',
    ]);

    static #tokenize(text) {
        return text.toLowerCase()
            .split(/[^a-zA-Z0-9']+/)
            .map(w => w.replace(/^'+|'+$/g, ''))
            .filter(w => w.length > 1 && !Summarizer.#STOP_WORDS.has(w));
    }

    static #splitSentences(text) {
        if (!text.trim()) return [];
        const sentences = [];
        const re = /[.!?]+(?:[ \t\n\r]+|$)/g;
        let remaining = text.trim();
        let match;

        while ((match = re.exec(remaining)) !== null) {
            const sentence = remaining.slice(0, match.index + match[0].length).trim();
            if (sentence.length > 2) sentences.push(sentence);
            remaining = remaining.slice(match.index + match[0].length);
            re.lastIndex = 0;
        }
        remaining = remaining.trim();
        if (remaining.length > 2) sentences.push(remaining);
        return sentences;
    }

    static summarize(plainText, sentenceCount) {
        const sentences = Summarizer.#splitSentences(plainText);
        if (!sentences.length) {
            return { summary: '', sentences: [], total_sentences: 0, keywords: [] };
        }

        const count     = Math.min(sentenceCount, sentences.length);
        const total     = sentences.length;
        const allTokens = Summarizer.#tokenize(plainText);

        if (allTokens.length === 0) {
            return {
                summary:         sentences[0] ?? '',
                sentences:       sentences.slice(0, count).map((text, i) => ({ text, score: 0, position: i })),
                total_sentences: total,
                keywords:        [],
            };
        }

        // TF scores
        const wordFreq = {};
        for (const token of allTokens) wordFreq[token] = (wordFreq[token] ?? 0) + 1;

        const tfScores = {};
        for (const [word, freq] of Object.entries(wordFreq)) {
            tfScores[word] = freq / allTokens.length;
        }

        // Score sentences
        const scored = sentences.map((text, pos) => {
            const tokens = Summarizer.#tokenize(text);
            if (tokens.length === 0) return { text, score: 0, position: pos };

            const tfScore       = tokens.reduce((sum, t) => sum + (tfScores[t] ?? 0), 0) / tokens.length;
            const positionBonus = total > 1 ? 0.2 * (1 - pos / total) : 0;
            const lengthPenalty = tokens.length < 5 ? 0.5 : 1.0;
            const punctBonus    = /[.!?]$/.test(text) ? 1.0 : 0.85;

            return { text, score: tfScore * lengthPenalty * punctBonus + positionBonus, position: pos };
        });

        // Top N by score, then re-sort by position
        scored.sort((a, b) => b.score - a.score);
        const top = scored.slice(0, count).sort((a, b) => a.position - b.position);

        const keywords = Object.entries(wordFreq)
            .map(([word, freq]) => ({ word, score: freq / allTokens.length }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        return {
            summary:         top.map(s => s.text).join(' '),
            sentences:       top,
            total_sentences: total,
            keywords,
        };
    }
}

// ═══════════════════════════════════════════════════════════
// Default Options
// ═══════════════════════════════════════════════════════════

const DEFAULT_OPTIONS = Object.freeze({
    internal_domains: ['pixa.pics', 'pixagram.com', 'hive.blog', 'peakd.com', 'ecency.com'],
    max_body_length:  500_000,
    max_image_count:  0,
});

function parseOptions(optionsJson) {
    if (!optionsJson) return { ...DEFAULT_OPTIONS };
    try {
        const parsed = typeof optionsJson === 'string' ? JSON.parse(optionsJson) : optionsJson;
        return { ...DEFAULT_OPTIONS, ...parsed };
    } catch { return { ...DEFAULT_OPTIONS }; }
}

// ═══════════════════════════════════════════════════════════
// Public API (same signatures as WASM module)
// ═══════════════════════════════════════════════════════════

/** Init — no-op for WASM API compatibility. */
export default async function pixaContentInit() {}

/** Tier 1: Memo sanitization. */
export function sanitizeMemo(body, optionsJson) {
    if (!body) return { html: '' };
    if (body.trim().startsWith('data:')) return { html: '' };

    const opts = parseOptions(optionsJson);

    if (body.startsWith('#')) {
        const safe = sanitizeHtmlLib(body, SanitizeConfigs.strip);
        return { html: `<span class="pixa-encrypted-memo">${safe}</span>` };
    }

    const input          = TextProcessor.truncate(body, Math.min(opts.max_body_length, 2048));
    const htmlRaw        = TextProcessor.isPredominantlyHtml(input) ? input : TextProcessor.markdownToHtml(input);
    const htmlMentions   = MentionProcessor.process(htmlRaw);
    const html           = sanitizeHtmlLib(htmlMentions, SanitizeConfigs.memo);
    return { html };
}

/** Tier 2: Comment sanitization. */
export function sanitizeComment(body, optionsJson) {
    if (!body) return { html: '', links: [] };
    if (body.trim().startsWith('data:')) return { html: '', links: [] };

    const opts         = parseOptions(optionsJson);
    const input        = TextProcessor.truncate(body, opts.max_body_length);
    const htmlRaw      = TextProcessor.isPredominantlyHtml(input) ? input : TextProcessor.markdownToHtml(input);
    const htmlMentions = MentionProcessor.process(htmlRaw);
    const htmlSafe     = sanitizeHtmlLib(htmlMentions, SanitizeConfigs.comment);
    const { html, links } = LinkProcessor.process(htmlSafe, opts.internal_domains);
    return { html, links };
}

/** Tier 3: Post sanitization (full rich content). */
export function sanitizePost(body, optionsJson) {
    if (!body) return { html: '', links: [], images: [] };

    const opts    = parseOptions(optionsJson);
    const trimmed = body.trim();

    // Pixel art short-circuit: body IS a base64 image
    if (trimmed.startsWith('data:image/')) {
        if (ImageUtils.isValidBase64(trimmed)) {
            return { html: '', images: [{ src: trimmed, alt: '', is_base64: true, index: 0 }], links: [] };
        }
        return { html: '', links: [], images: [] };
    }

    const input        = TextProcessor.truncate(body, opts.max_body_length);
    const htmlRaw      = TextProcessor.isPredominantlyHtml(input) ? input : TextProcessor.markdownToHtml(input);
    const htmlMentions = MentionProcessor.process(htmlRaw);
    const htmlSafe     = sanitizeHtmlLib(htmlMentions, SanitizeConfigs.post);

    // Extract images AFTER sanitization (only safe images survive)
    const images = ImageUtils.extract(htmlSafe);

    const { html: htmlLinked, links } = LinkProcessor.process(htmlSafe, opts.internal_domains);
    const htmlFinal = opts.max_image_count > 0
        ? ImageUtils.limit(htmlLinked, opts.max_image_count)
        : htmlLinked;

    return { html: htmlFinal, links, images };
}

/** Sanitize a JSON string (depth-limited, key-validated). */
export function safeJson(jsonStr) {
    return JsonSanitizer.sanitize(jsonStr);
}

/** Sanitize a single string value. */
export function safeString(s, maxLen) {
    if (typeof s !== 'string') return null;

    const trimmed = s.trim();
    if (!trimmed) return null;

    // Valid base64 image — pass through
    if (trimmed.startsWith('data:image/')) {
        return ImageUtils.isValidBase64(trimmed) && trimmed.length <= maxLen ? trimmed : null;
    }

    // Reject dangerous URI schemes
    const lower = trimmed.toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:')) {
        return null;
    }

    const isUrl = lower.startsWith('https://') || lower.startsWith('http://')
               || lower.startsWith('//') || lower.startsWith('mailto:') || lower.startsWith('tel:');

    let cleaned;
    if (isUrl) {
        cleaned = trimmed.replace(/[\x00-\x1f\x7f]/g, '');
    } else {
        const stripped = sanitizeHtmlLib(trimmed, SanitizeConfigs.strip);
        const strippedLower = stripped.toLowerCase();
        if (strippedLower.includes('javascript:') || strippedLower.includes('vbscript:')) return null;
        cleaned = stripped.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
    }

    const result = cleaned.trim();
    if (!result) return null;
    return result.length > maxLen ? result.slice(0, maxLen).trimEnd() || null : result;
}

/** Sanitize a HIVE username. */
export function sanitizeUsername(username) {
    if (!username) return '';
    const trimmed = username.trim().toLowerCase();
    if (trimmed.length < 3 || trimmed.length > 16) return '';
    if (!/^[a-z]/.test(trimmed))   return '';
    if (!/^[a-z0-9.\-]+$/.test(trimmed)) return '';
    if (/[.\-]{2}/.test(trimmed))  return '';
    if (/[.\-]$/.test(trimmed))    return '';
    return trimmed;
}

/** Extract plain text from HTML/Markdown body. */
export function extractPlainText(body) {
    if (!body) return '';
    if (body.trim().startsWith('data:')) return '';
    const html = TextProcessor.isPredominantlyHtml(body) ? body : TextProcessor.markdownToHtml(body);
    return TextProcessor.normalizeWhitespace(TextProcessor.htmlToPlainText(html));
}

/** TF-IDF extractive summarization. */
export function summarizeContent(body, sentenceCount) {
    if (!body) return { summary: '', keywords: [], sentences: [], total_sentences: 0 };
    const plain = extractPlainText(body);
    return Summarizer.summarize(plain, sentenceCount || 3);
}

/**
 * Last-guard HTML sanitizer for dangerouslySetInnerHTML boundaries.
 *
 * Assumes the input is already-rendered HTML (markdown conversion, mention
 * processing, etc. have already happened).  This function does NOT perform
 * any markdown rendering — it only strips tags, attributes, and URI schemes
 * that are not on the post-tier allowlist.
 *
 * Use this as the final call before passing a string to dangerouslySetInnerHTML
 * to ensure defense-in-depth even if upstream sanitization was skipped or
 * the data was mutated after initial sanitization.
 *
 * @param {string} html — Pre-rendered HTML to sanitize
 * @returns {string} Sanitized HTML safe for innerHTML injection
 */
export function safeHTML(html) {
    if (!html) return '';
    if (typeof html !== 'string') return '';
    return sanitizeHtmlLib(html, SanitizeConfigs.post);
}
