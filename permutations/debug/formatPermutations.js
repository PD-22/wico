export default function formatPermutations(permutations) {
    return permutations.map(permutation => permutation.join(' ')).join('\n');
}
