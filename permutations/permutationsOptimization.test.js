import { join } from "path";
import testCombinatorics from "../debug-combinatorics/testCombinatorics.js";
import validateAdjacencyDiff from "../debug-combinatorics/validateAdjacencyDiff.js";
import getDirname from '../debug/getDirname.js';
import { createCharSequence as ccs } from "../utils/general.js";
import getMinDiffPermutations from "./permutationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: [ccs('A', 9)],
    outputFile: join(DIRNAME, 'permutationsOptimization.txt'),
    compareFile: join(DIRNAME, 'permutationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffPermutations,
    validateAdjacentItems: validateAdjacencyDiff(2)
});
