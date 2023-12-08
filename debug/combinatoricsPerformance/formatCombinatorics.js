/**
 * @param {unknown[][][]} combinatoricsList
 * @returns {string}
 */
export default function formatCombinatorics(combinatoricsList) {
    return combinatoricsList.map(
        combinatorics => combinatorics.map(
            combinatoric => combinatoric.join(' ')
        ).join('\n')
    ).join('\n\n');
}
