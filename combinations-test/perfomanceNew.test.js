import { join } from "path";
import getCombinations from "../combinations/combinations.js";
import getCombinationsNew from "../combinations/combinationsNew.js";
import { comparePerfomance, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { checkArraysMatch, formatCombinations, testCombinationsPerfomance, writeResult } from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testCombinationsPerfomance(getCombinationsNew, inputs);
const [deltaTime, result] = testCombinationsPerfomance(getCombinations, inputs);

comparePerfomance(deltaTimeNew, deltaTime);

if (!checkArraysMatch(resultNew, result)) {
    writeResult(join(DIRNAME, 'result-new.txt'), formatCombinations(resultNew));
    writeResult(join(DIRNAME, 'result.txt'), formatCombinations(result));
}
