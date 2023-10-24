export default function countPartition(arr, predicate) {
    let passed = 0; let notPassed = 0;
    for (const item of arr) predicate(item) ? passed++ : notPassed++;
    return [passed, notPassed];
}
