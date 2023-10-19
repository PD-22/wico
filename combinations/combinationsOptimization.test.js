import { join } from "path";
import testCombinatorics from "../debug-combinatorics/testCombinatorics.js";
import validateAdjacencyDiff from "../debug-combinatorics/validateAdjacencyDiff.js";
import getDirname from '../debug/getDirname.js';
import { createCharSequence as ccs } from "../utils/general.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: [[ccs('A', 4), ccs('a', 5)]],
    outputFile: join(DIRNAME, 'combinationsOptimization.txt'),
    compareFile: join(DIRNAME, 'combinationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: validateAdjacencyDiff(1)
});
