/**
 * @example
 * product([2, 3, 4, 5]); // 120
 */
export default function product(numbers) {
    return numbers.reduce((product, number) => product * number, 1);
}
