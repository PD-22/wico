import { join } from "path";
import getDirname from '../debug/getDirname.js';
import { range } from "../utils/general.js";
import testCombinatorics from "../utils/testCombinatorics.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: Array(20).fill(Array(5).fill(range(1, 12))),
    outputFile: join(DIRNAME, 'combinatorics.txt'),
    compareFile: join(DIRNAME, 'combinatorics copy.txt'),
    getCombinatoricsCallback: getCombinations
});
