/**
 * @param {...string} stringList
 * @returns {string}
 */
export default function lines(...stringList) {
    return stringList.join('\n');
}
