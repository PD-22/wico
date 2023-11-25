/**
 * @template T
 * @param {...T[]} arrays
 * @returns {T[][]}
 * 
 * @example
 * zip(['A', 'B', 'C'], ['X', 'Y', 'Z']);
 * // [['A', 'X'], ['B', 'Y'], ['C', 'Z']]
 */
export default function zip(...arrays) {
    const minLength = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
}
