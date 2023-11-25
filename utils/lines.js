/**
 * @example
 * lines('alpha', 'beta', 'charlie'); // "alpha\nbeta\ncharlie"
 */
export default function lines(...stringList) {
    return stringList.join('\n');
}
