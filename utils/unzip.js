/**
 * @template T
 * @param {T[][]} zippedArray 
 * @returns {T[][]}
 * 
 * @example
 * unzip([["A", "X", "W"], ["B", "Y"], ["C", "Z"]]);
 * // [["A", "B", "C"], ["X", "Y", "Z"]]
 */
export default function unzip(zippedArray) {
    const minLength = Math.min(...zippedArray.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => zippedArray.map(arr => arr[i]));
}
