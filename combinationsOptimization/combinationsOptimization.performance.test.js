import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerformance from "../debug/testCombinatoricsPerformance.js";
import countListDiff from "../utils/countListDiff.js";
import range from "../utils/range.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerformance({
    inputs: range(20).map(() => range(4).map(() => range(20))),
    outputFile: join(DIRNAME, 'combinationsOptimization.txt'),
    compareFile: join(DIRNAME, 'combinationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffCombinations,
    validateAdjacentItems: (v1, v2) => countListDiff(v1, v2) === 1
});
