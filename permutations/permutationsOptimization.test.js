import { join } from "path";
import testCombinatorics, { validateAdjacencyDiff } from "../utils/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence as ccs } from "../utils/general.js";
import getMinDiffPermutations from "./permutationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: [ccs('A', 9)],
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getMinDiffPermutations,
    validateAdjacentItems: validateAdjacencyDiff(2)
});
