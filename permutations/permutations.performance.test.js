import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerformance from "../debug/testCombinatoricsPerformance.js";
import range from "../utils/range.js";
import getPermutations from "./permutations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerformance({
    inputs: range(20).map(() => range(8)),
    outputFile: join(DIRNAME, 'permutations.txt'),
    compareFile: join(DIRNAME, 'permutations copy.txt'),
    getCombinatoricsCallback: getPermutations
});
