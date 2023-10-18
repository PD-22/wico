export default function formatCombinations(combinations) {
    return combinations.map(combination => combination.join(' ')).join('\n');
}
