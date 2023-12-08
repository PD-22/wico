import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../../../debug/assertFileContent.js";
import formatCombinatorics from "../../../debug/combinatoricsPerformance/formatCombinatorics.js";
import processCombinatorics from "../../../debug/combinatoricsPerformance/processCombinatorics.js";
import simpleAssert from "../../../debug/simpleAssert.js";
import writeOutput from "../../../debug/writeOutput.js";
import getPermutations from "../../../src/permutations.js";
import range from "../../../utils/range.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'permutations.txt');
const compareFile = join(DIRNAME, 'permutations-backup.txt');

const inputs = range(20).map(() => range(8));
const outputs = processCombinatorics(inputs, getPermutations);

const formattedOutputs = formatCombinatorics(outputs);
writeOutput(outputFile, formattedOutputs);

console.log(`Assert file Content "${compareFile}"...`);
existsSync(compareFile) ?
    simpleAssert(() => assertFileContent(compareFile, formattedOutputs)) :
    console.log("NOT FOUND");
