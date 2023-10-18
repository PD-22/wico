import { join } from "path";
import { getDirname } from "../utils/debug.js";
import { createCharSequence } from "../utils/general.js";
import testMinDiffPermutations from "./debug/testMinDiffPermutations.js";

const DIRNAME = getDirname(import.meta.url);

testMinDiffPermutations(
    createCharSequence('A', 9),
    join(DIRNAME, 'output.txt'),
    join(DIRNAME, 'output copy.txt')
);
