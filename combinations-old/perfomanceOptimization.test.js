import { join } from "path";
import { getMinDiffCombinations } from "../combinations/combinationsOptimization.js";
import { comparePerfomance, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { getMinDiffCombinationsOld } from "./combinationsOldOptimization.js";
import { checkResultsMatch, testInputs, writeResult } from "./perfomanceUtils.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testInputs(getMinDiffCombinations, inputs);
const [deltaTimeOld, resultOld] = testInputs(getMinDiffCombinationsOld, inputs);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(join(DIRNAME, 'result-new.txt'), formatResult(resultNew));
writeResult(join(DIRNAME, 'result-old.txt'), formatResult(resultOld));

function formatResult(result) {
    return result.map(a => a.map(b => b.join(' ')).join('\n')).join('\n\n');
}
