import { join } from "path";
import getPermutations from "../../combinatorics/permutations.js";
import compareDataToFile from "../../debug/compareDataToFile.js";
import { formatCombinatorics, processCombinatorics, writeOutputToFile } from "../../debug/testCombinatoricsPerformance.js";
import range from "../../utils/range.js";

const DIRNAME = 'temp';

const inputs = range(20).map(() => range(8));
const outputFile = join(DIRNAME, 'permutations.txt');
const compareFile = join(DIRNAME, 'permutations copy.txt');

const outputs = processCombinatorics(inputs, getPermutations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);
compareDataToFile(formattedOutputs, compareFile);
