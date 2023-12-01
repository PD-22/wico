/**
 * @param {number[]} numbers 
 * @returns {number}
 */
export default function product(numbers) {
    return numbers.reduce((product, number) => product * number, 1);
}
