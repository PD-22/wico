/**
 * @param {number} end 
 * @param {number} start 
 * @param {number} step 
 * @returns {number[]}
 * 
 * @example
 * range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
 */
export default function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) result.push(i);
    return result
}
