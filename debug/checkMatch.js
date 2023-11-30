/**
 * @param {any} result 
 * @param {any} expected 
 * @returns {void}
 */
export default function checkMatch(result, expected) {
    const match = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Result match: ${match}`);
    if (!match) console.error(`Got:\n${JSON.stringify(result)}`);
}
