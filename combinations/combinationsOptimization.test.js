import { join } from "path";
import testCombinatorics, { validateAdjacencyDiff } from "../utils/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence as ccs } from "../utils/general.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: [[ccs('A', 4), ccs('a', 5)]],
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: validateAdjacencyDiff(1)
});
