import { join } from "path";
import testCombinatorics from "../combinatorics-debug/testCombinatorics.js";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

testCombinatorics({
    input: [createCharSequence('A', 4), createCharSequence('a', 4)],
    outputFile: join(DIRNAME, 'output.txt'),
    compareFile: join(DIRNAME, 'output copy.txt'),
    getCombinatoricsCallback: getCombinations
});
