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
 * @param {number} step
 * @returns {number[]}
 */

/**
 * @param {number} a
 * @param {number} [b]
 * @param {number} [step]
 * @returns {number[]}
 */
export default function range(a, b, step = 1) {
    const [start, end] = b === undefined ? [0, a] : [a, b];

    const result = [];
    for (let i = start; i < end; i += step) result.push(i);
    return result;
}
