import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerformance from "../debug/testCombinatoricsPerformance.js";
import countListDiff from "../utils/countListDiff.js";
import range from "../utils/range.js";
import getMinDiffPermutations from "./permutationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerformance({
    inputs: range(20).map(() => range(8)),
    outputFile: join(DIRNAME, 'permutationsOptimization.txt'),
    compareFile: join(DIRNAME, 'permutationsOptimization copy.txt'),
    getCombinatoricsCallback: getMinDiffPermutations,
    validateAdjacentItems: (v1, v2) => countListDiff(v1, v2) === 2
});
