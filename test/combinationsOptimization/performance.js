import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../../debug/assertFileContent.js";
import simpleAssert from "../../debug/simpleAssert.js";
import {
    assertCombinatoricsOptimization,
    formatCombinatorics,
    processCombinatorics,
    writeOutputToFile
} from "../../debug/testCombinatoricsPerformance.js";
import getMinDiffCombinations from "../../src/combinationsOptimization.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'combinationsOptimization.txt');
const compareFile = join(DIRNAME, 'combinationsOptimization-backup.txt');

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputs = processCombinatorics(inputs, getMinDiffCombinations);

const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log("Assert combinatorics optimization...");
simpleAssert(() => assertCombinatoricsOptimization(outputs, 1));

console.log(`Assert file Content "${compareFile}"...`);
existsSync(compareFile) ?
    simpleAssert(() => assertFileContent(compareFile, formattedOutputs)) :
    console.log("NOT FOUND");
