import { join } from "path";
import testCombinatorics from "../combinatorics-debug/testCombinatorics.js";
import validateAdjacencyDiff from "../combinatorics-debug/validateAdjacencyDiff.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    input: [createCharSequence('A', 4), createCharSequence('a', 5)],
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: validateAdjacencyDiff(1)
});
