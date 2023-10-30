import { join } from "path";
import testCombinatoricsPerfomance from "../combinatorics-debug/testCombinatorics.js";
import validateAdjacencyDiff from "../combinatorics-debug/validateAdjacencyDiff.js";
import getDirname from '../debug/getDirname.js';
import range from "../utils/range.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerfomance({
    inputs: Array(20).fill(Array(4).fill(range(1, 20))),
    outputFile: join(DIRNAME, 'combinationsOptimization.txt'),
    compareFile: join(DIRNAME, 'combinationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: validateAdjacencyDiff(1)
});
