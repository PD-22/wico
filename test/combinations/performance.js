import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../../debug/assertFileContent.js";
import formatCombinatorics from "../../debug/combinatoricsPerformance/formatCombinatorics.js";
import processCombinatorics from "../../debug/combinatoricsPerformance/processCombinatorics.js";
import writeOutputToFile from "../../debug/combinatoricsPerformance/writeOutputToFile.js";
import simpleAssert from "../../debug/simpleAssert.js";
import getCombinations from "../../src/combinations.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'combinations.txt');
const compareFile = join(DIRNAME, 'combinations-backup.txt');

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputs = processCombinatorics(inputs, getCombinations);

const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log(`Assert file Content "${compareFile}"...`);
existsSync(compareFile) ?
    simpleAssert(() => assertFileContent(compareFile, formattedOutputs)) :
    console.log("NOT FOUND");
