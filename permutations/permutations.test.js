import { join } from "path";
import testCombinatorics from "../debug-combinatorics/testCombinatorics.js";
import getDirname from '../debug/getDirname.js';
import { range } from "../utils/general.js";
import getPermutations from "./permutations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: Array(20).fill(range(1, 8)),
    outputFile: join(DIRNAME, 'permutations.txt'),
    compareFile: join(DIRNAME, 'permutations copy.txt'),
    getCombinatoricsCallback: getPermutations
});
