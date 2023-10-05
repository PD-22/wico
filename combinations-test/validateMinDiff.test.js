import { join } from "path";
import { getMinDiffCombinations } from "../combinations/combinationsOptimization.js";
import getCharSequenceVariants from "../combinations/utils/getCharSequenceVariants.js";
import { getDirname } from "../utils/debug.js";
import { getMinDiffCombinationsOld } from "../combinations-old/combinationsOldOptimization.js";
import { formatCombinations, validateMinDiffCombinations, writeResult } from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = [
    ...getCharSequenceVariants('Aa'.split(''), [2, 3]),
    ...getCharSequenceVariants('Aa1'.split(''), [2, 3])
];

const resultNew = validateMinDiffCombinations(inputs, getMinDiffCombinations);
const resultOld = validateMinDiffCombinations(inputs, getMinDiffCombinationsOld);

writeResult(join(DIRNAME, 'result-new.txt'), formatCombinations(resultNew));
writeResult(join(DIRNAME, 'result-old.txt'), formatCombinations(resultOld));
