export default function formatArrayList(permutations) {
    return permutations.map(permutation => permutation.join(' ')).join('\n');
}
