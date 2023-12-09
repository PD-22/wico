import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../../../debug/assertFileContent.js";
import assertDiffCount from "../../../debug/combinatoricsPerformance/assertDiffCount.js";
import formatCombinatorics from "../../../debug/combinatoricsPerformance/formatCombinatorics.js";
import processCombinatorics from "../../../debug/combinatoricsPerformance/processCombinatorics.js";
import simpleAssert from "../../../debug/simpleAssert.js";
import writeOutput from "../../../debug/writeOutput.js";
import getMinDiffPermutations from "../../../src/permutationsOptimization.js";
import range from "../../../utils/range.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'permutationsOptimization.txt');
const compareFile = join(DIRNAME, 'permutationsOptimization-backup.txt');

const inputs = range(20).map(() => range(8));
const outputs = processCombinatorics(inputs, getMinDiffPermutations);

const formattedOutputs = formatCombinatorics(outputs);
writeOutput(outputFile, formattedOutputs);

console.log("Assert combinatorics optimization...");
simpleAssert(() => assertDiffCount(outputs, 2));

console.log(`Assert file Content "${compareFile}"...`);
existsSync(compareFile) ?
    simpleAssert(() => assertFileContent(compareFile, formattedOutputs)) :
    console.log("NOT FOUND");
