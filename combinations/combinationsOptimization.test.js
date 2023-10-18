import { join } from "path";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import testMinDiffCombinations from "./debug/testMinDiffCombinations.js";

const DIRNAME = getDirname(import.meta.url);

testMinDiffCombinations(
    [createCharSequence('A', 4), createCharSequence('a', 4)],
    join(DIRNAME, 'output.txt'),
    join(DIRNAME, 'output copy.txt')
);
