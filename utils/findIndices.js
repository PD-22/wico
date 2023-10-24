export default function findIndices(array, predicate) {
    return array
        .map((testResult, index) => predicate(testResult) ? index : null)
        .filter(savedIndex => savedIndex !== null);
}
