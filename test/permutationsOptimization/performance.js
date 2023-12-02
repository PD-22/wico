import { join } from "path";
import getMinDiffPermutations from "../../combinatorics/permutationsOptimization.js";
import assertFileContent from "../../debug/assertFileContent.js";
import simpleAssert from "../../debug/simpleAssert.js";
import { formatCombinatorics, processCombinatorics, validateOutputList, writeOutputToFile } from "../../debug/testCombinatoricsPerformance.js";
import countListDiff from "../../utils/countListDiff.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';

const inputs = range(20).map(() => range(8));
const outputFile = join(DIRNAME, 'permutationsOptimization.txt');
const compareFile = join(DIRNAME, 'permutationsOptimization-backup.txt');

const outputs = processCombinatorics(inputs, getMinDiffPermutations);
validateOutputList(outputs, (v1, v2) => countListDiff(v1, v2) === 2);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log(`Assert file Content "${compareFile}"...`);
simpleAssert(() => assertFileContent(compareFile, formattedOutputs));
