import { join } from "path";
import getDirname from '../debug/getDirname.js';
import testCombinatoricsPerformance from "../debug/testCombinatoricsPerformance.js";
import range from "../utils/range.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatoricsPerformance({
    inputs: range(20).map(() => range(4).map(() => range(20))),
    outputFile: join(DIRNAME, 'combinations.txt'),
    compareFile: join(DIRNAME, 'combinations copy.txt'),
    getCombinatoricsCallback: getCombinations
});
