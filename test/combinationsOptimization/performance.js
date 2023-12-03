import { join } from "path";
import getMinDiffCombinations from "../../combinatorics/combinationsOptimization.js";
import assertFileContent from "../../debug/assertFileContent.js";
import simpleAssert from "../../debug/simpleAssert.js";
import {
    assertCombinatoricsOptimization,
    formatCombinatorics,
    processCombinatorics,
    writeOutputToFile
} from "../../debug/testCombinatoricsPerformance.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputFile = join(DIRNAME, 'combinationsOptimization.txt');
const compareFile = join(DIRNAME, 'combinationsOptimization-backup.txt');

const outputs = processCombinatorics(inputs, getMinDiffCombinations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log("Assert combinatorics optimization...");
simpleAssert(() => assertCombinatoricsOptimization(outputs, 1));

console.log(`Assert file Content "${compareFile}"...`);
simpleAssert(() => assertFileContent(compareFile, formattedOutputs));
