import checkMatch from "../debug/checkMatch.js";
import { getMinDiffDictPermutations } from "./permutationsOptimization.js";

const result = getMinDiffDictPermutations({ A: 1, B: 2, C: 3, D: 4 });
const expected = [
    { A: 1, B: 2, C: 3, D: 4 },
    { A: 1, B: 2, C: 4, D: 3 },
    { A: 1, B: 3, C: 4, D: 2 },
    { A: 1, B: 3, C: 2, D: 4 },
    { A: 1, B: 4, C: 2, D: 3 },
    { A: 1, B: 4, C: 3, D: 2 },
    { A: 2, B: 4, C: 3, D: 1 },
    { A: 2, B: 4, C: 1, D: 3 },
    { A: 2, B: 3, C: 1, D: 4 },
    { A: 2, B: 3, C: 4, D: 1 },
    { A: 2, B: 1, C: 4, D: 3 },
    { A: 2, B: 1, C: 3, D: 4 },
    { A: 3, B: 1, C: 2, D: 4 },
    { A: 3, B: 1, C: 4, D: 2 },
    { A: 3, B: 2, C: 4, D: 1 },
    { A: 3, B: 2, C: 1, D: 4 },
    { A: 3, B: 4, C: 1, D: 2 },
    { A: 3, B: 4, C: 2, D: 1 },
    { A: 4, B: 3, C: 2, D: 1 },
    { A: 4, B: 3, C: 1, D: 2 },
    { A: 4, B: 2, C: 1, D: 3 },
    { A: 4, B: 2, C: 3, D: 1 },
    { A: 4, B: 1, C: 3, D: 2 },
    { A: 4, B: 1, C: 2, D: 3 }
];
// difference between every adjacent permutation is only 2
checkMatch(result, expected);
