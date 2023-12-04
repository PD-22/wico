import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import getMinDiffPermutations from "../../combinatorics/permutationsOptimization.js";
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
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);

const inputs = range(20).map(() => range(8));
const outputFile = join(DIRNAME, 'permutationsOptimization.txt');
const compareFile = join(DIRNAME, 'permutationsOptimization-backup.txt');

const outputs = processCombinatorics(inputs, getMinDiffPermutations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log("Assert combinatorics optimization...");
simpleAssert(() => assertCombinatoricsOptimization(outputs, 1));

console.log(`Assert file Content "${compareFile}"...`);
simpleAssert(() => assertFileContent(compareFile, formattedOutputs));
