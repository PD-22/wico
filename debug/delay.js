/**
 * @param {number | undefined} ms
 * @returns {Promise<void>}
 */
export default function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
