import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerformance from "../debug/testCombinatoricsPerformance.js";
import range from "../utils/range.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerformance({
    inputs: Array(20).fill(Array(4).fill(range(1, 20))),
    outputFile: join(DIRNAME, 'combinations.txt'),
    compareFile: join(DIRNAME, 'combinations copy.txt'),
    getCombinatoricsCallback: getCombinations
});
