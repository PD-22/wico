import { join } from "path";
import getCombinations from "../combinations/combinations.js";
import { getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import getCombinationsOld from "../combinations-old/combinationsOld.js";
import { checkArraysMatch, formatCombination, writeResult } from "./utils.js";

/* NOTE: test for division accuracy bug
2 / 98 * 49 = 0.9999999999999999
2 * 49 / 98 = 1
*/

const DIRNAME = getDirname(import.meta.url);

const testInput = [[1, 2], range(1, 49)];

const resultNew = getCombinations(testInput);
const resultOld = getCombinationsOld(testInput);

checkArraysMatch(resultNew, resultOld);

writeResult(join(DIRNAME, 'result-new.txt'), formatCombination(resultNew));
writeResult(join(DIRNAME, 'result-old.txt'), formatCombination(resultOld));
