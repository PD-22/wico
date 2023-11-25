/**
 * @param {string} fileContent1 
 * @param {string} fileContent2 
 * @returns {boolean}
 * 
 * @example
 * const lines = "A\nB"; 
 * compareFileContents(lines, "A\nB"); // true
 * compareFileContents(lines, "A\rB"); // true
 * compareFileContents(lines, "A\r\nB"); // true
 * compareFileContents(lines, "AB"); // false
 */
export default function compareFileContents(fileContent1, fileContent2) {
    return normalizeEOL(fileContent1) === normalizeEOL(fileContent2);
}

/**
 * @param {string} str
 */
function normalizeEOL(str) {
    return str.replace(/\r\n|\r|\n/g, '\n');
}
