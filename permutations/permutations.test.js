import { join } from "path";
import testCombinatorics from "../utils/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import getPermutations from "./permutations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    input: createCharSequence('A', 9),
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getPermutations
});
