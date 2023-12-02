import { join } from "path";
import getCombinations from "../../combinatorics/combinations.js";
import assertFileContent from "../../debug/assertFileContent.js";
import simpleAssert from "../../debug/simpleAssert.js";
import { formatCombinatorics, processCombinatorics, writeOutputToFile } from "../../debug/testCombinatoricsPerformance.js";
import range from "../../utils/range.js";

const DIRNAME = 'output';

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputFile = join(DIRNAME, 'combinations.txt');
const compareFile = join(DIRNAME, 'combinations-backup.txt');

const outputs = processCombinatorics(inputs, getCombinations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);

console.log(`Assert file Content "${compareFile}"...`);
simpleAssert(() => assertFileContent(compareFile, formattedOutputs));
