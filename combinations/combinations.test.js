import { join } from "path";
import testCombinatorics from "../utils/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence as ccs } from "../utils/general.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    inputs: [[ccs('A', 2), ccs('a', 2)]],
    outputFile: join(DIRNAME, 'combinatorics.txt'),
    compareFile: join(DIRNAME, 'combinatorics copy.txt'),
    getCombinatoricsCallback: getCombinations
});
