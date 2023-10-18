import { join } from "path";
import testCombinatorics from "../combinatorics-debug/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import getMinDiffPermutations from "./permutationsOptimization.js";
import validateAdjacencyDiff from "../combinatorics-debug/validateAdjacencyDiff.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    input: createCharSequence('A', 9),
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getMinDiffPermutations,
    validateAdjacentItems: validateAdjacencyDiff(2)
});
