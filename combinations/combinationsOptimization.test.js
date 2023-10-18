import { join } from "path";
import { getDirname, logDeltaTime } from "../utils/debug.js";
import getMinDiffCombinations from "./combinationsOptimization.js";
import testCombinations from "./utils/testCombinations.js";
import { getCharSequenceVariants } from "../utils/sequenceUtils.js";

const DIRNAME = getDirname(import.meta.url);

logDeltaTime(testCombinations)({
    testInputs: [
        ...getCharSequenceVariants('Aa'.split(''), [2, 3]),
        ...getCharSequenceVariants('Aa1'.split(''), [2, 3])
    ],
    outputFile: join(DIRNAME, 'output.txt'),
    outputCompareFile: join(DIRNAME, "output copy.txt"),
    getMinDiffCombinationsCallback: getMinDiffCombinations
});
