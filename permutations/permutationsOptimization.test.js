import { join } from "path";
import testCombinatorics from "../combinatorics-debug/testCombinatorics.js";
import validateAdjacencyDiff from "../combinatorics-debug/validateAdjacencyDiff.js";
import getDirname from '../debug/getDirname.js';
import range from "../utils/range.js";
import getMinDiffPermutations from "./permutationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: Array(20).fill(range(1, 8)),
    outputFile: join(DIRNAME, 'permutationsOptimization.txt'),
    compareFile: join(DIRNAME, 'permutationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffPermutations,
    validateAdjacentItems: validateAdjacencyDiff(2)
});
