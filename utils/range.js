/**
 * @overload
 * @param {number} end
 * @returns {number[]}
 */

/**
 * @overload
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */

/**
 * @overload
 * @param {number} start
 * @param {number} end
 * @param {number} [step]
 * @returns {number[]}
 */

/**
 * @param {number} a
 * @param {number} [b]
 * @param {number} [step]
 * @returns {number[]}
 * 
 * @example
 * range(5); // [0, 1, 2, 3, 4]
 * range(5, 10); // [5, 6, 7, 8, 9]
 * range(10, 20, 2); // [10, 12, 14, 16, 18]
 */
export default function range(a, b, step = 1) {
    const [start, end] = b === undefined ? [0, a] : [a, b];

    const result = [];
    for (let i = start; i < end; i += step) result.push(i);
    return result;
}
