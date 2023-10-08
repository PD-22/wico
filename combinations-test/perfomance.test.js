import { join } from "path";
import getCombinationsOld from "../combinations-old/combinationsOld.js";
import getCombinations from "../combinations/combinations.js";
import { comparePerfomance, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { checkArraysMatch, formatCombinations, testCombinationsPerfomance, writeResult } from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testCombinationsPerfomance(getCombinations, inputs);
const [deltaTimeOld, resultOld] = testCombinationsPerfomance(getCombinationsOld, inputs);

checkArraysMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(join(DIRNAME, 'result-new.txt'), formatCombinations(resultNew));
writeResult(join(DIRNAME, 'result-old.txt'), formatCombinations(resultOld));
