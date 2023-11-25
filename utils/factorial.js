/**
 * @param {number} n 
 * @returns {number}
 * 
 * @example
 * factorial(4); // 24
 */
export default function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}
