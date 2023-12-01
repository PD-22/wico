import { join } from "path";
import getMinDiffCombinations from "../../combinatorics/combinationsOptimization.js";
import compareDataToFile from "../../debug/compareDataToFile.js";
import { formatCombinatorics, processCombinatorics, validateOutputList, writeOutputToFile } from "../../debug/testCombinatoricsPerformance.js";
import countListDiff from "../../utils/countListDiff.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputFile = join(DIRNAME, 'combinationsOptimization.txt');
const compareFile = join(DIRNAME, 'combinationsOptimization copy.txt');

const outputs = processCombinatorics(inputs, getMinDiffCombinations);
validateOutputList(outputs, (v1, v2) => countListDiff(v1, v2) === 1);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);
compareDataToFile(formattedOutputs, compareFile);
