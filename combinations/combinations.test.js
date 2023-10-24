import { join } from "path";
import testCombinatorics from "../debug-combinatorics/testCombinatorics.js";
import getDirname from '../debug/getDirname.js';
import range from "../utils/range.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: Array(20).fill(Array(4).fill(range(1, 20))),
    outputFile: join(DIRNAME, 'combinatorics.txt'),
    compareFile: join(DIRNAME, 'combinatorics copy.txt'),
    getCombinatoricsCallback: getCombinations
});
