export default function product(numbers) {
    return numbers.reduce((product, number) => product * number, 1);
}
