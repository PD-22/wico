import checkMatch from "../../debug/checkMatch.js";
import getMinDiffPermutations from "../../combinatorics/permutationsOptimization.js";

const result = getMinDiffPermutations([1, 2, 3, 4]);
const expected = [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 4, 2],
    [1, 3, 2, 4],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 4, 3, 1],
    [2, 4, 1, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 1, 4, 3],
    [2, 1, 3, 4],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 4, 1],
    [3, 2, 1, 4],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 3, 2, 1],
    [4, 3, 1, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 1, 3, 2],
    [4, 1, 2, 3]
];
// difference between every adjacent permutation is only 2
checkMatch(result, expected);