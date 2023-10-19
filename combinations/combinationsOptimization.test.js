import { join } from "path";
import testCombinatorics from "../debug-combinatorics/testCombinatorics.js";
import validateAdjacencyDiff from "../debug-combinatorics/validateAdjacencyDiff.js";
import getDirname from '../debug/getDirname.js';
import { range } from "../utils/general.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: Array(20).fill(Array(4).fill(range(1, 20))),
    outputFile: join(DIRNAME, 'combinationsOptimization.txt'),
    compareFile: join(DIRNAME, 'combinationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: validateAdjacencyDiff(1)
});
