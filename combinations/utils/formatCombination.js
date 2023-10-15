export default function formatCombination(combination) {
    return combination.map(items => items.join(' ')).join('\n');
}
