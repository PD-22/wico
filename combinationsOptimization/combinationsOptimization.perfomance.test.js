import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerfomance from "../debug/testCombinatoricsPerfomance.js";
import countListDiff from "../utils/countListDiff.js";
import range from "../utils/range.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerfomance({
    inputs: Array(20).fill(Array(4).fill(range(1, 20))),
    outputFile: join(DIRNAME, 'combinationsOptimization.txt'),
    compareFile: join(DIRNAME, 'combinationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: (v1, v2) => countListDiff(v1, v2) === 1
});
