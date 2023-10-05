import { join } from "path";
import { getMinDiffCombinations } from "../combinations/combinationsOptimization.js";
import { comparePerfomance, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { getMinDiffCombinationsOld } from "./combinationsOldOptimization.js";
import { checkResultsMatch, testInputs, writeTestResult } from "./perfomanceUtils.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testInputs(getMinDiffCombinations, inputs);
const [deltaTimeOld, resultOld] = testInputs(getMinDiffCombinationsOld, inputs);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(resultNew, 'result-new.txt');
writeResult(resultOld, 'result-old.txt');

function writeResult(combinationsResult, fileName) {
    return writeTestResult(join(DIRNAME, fileName), formatResult(combinationsResult));
}

function formatResult(result) {
    return result.map(a => a.map(b => b.join(' ')).join('\n')).join('\n\n');
}
