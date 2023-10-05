import { join } from "path";
import { getMinDiffCombinations } from "../combinations/combinationsOptimization.js";
import { comparePerfomance, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { getMinDiffCombinationsOld } from "./combinationsOldOptimization.js";
import { checkResultsMatch, testInputs, writeResult } from "./debug.js";
import { formatCombinations } from "./debug.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testInputs(getMinDiffCombinations, inputs);
const [deltaTimeOld, resultOld] = testInputs(getMinDiffCombinationsOld, inputs);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(join(DIRNAME, 'result-new.txt'), formatCombinations(resultNew));
writeResult(join(DIRNAME, 'result-old.txt'), formatCombinations(resultOld));
