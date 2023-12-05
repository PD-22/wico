/**
 * @param {string} str
 * @returns {string}
 */
export default function normalizeEOL(str) {
    return str.replace(/\r\n|\r|\n/g, '\n');
}
