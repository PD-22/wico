import { join } from "path";
import compareDataToFile from "../debug/compareDataToFile.js";
import getDirname from '../debug/getDirname.js';
import { formatCombinatorics, processCombinatorics, writeOutputToFile } from "../debug/testCombinatoricsPerformance.js";
import range from "../utils/range.js";
import getPermutations from "./permutations.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = range(20).map(() => range(8));
const outputFile = join(DIRNAME, 'permutations.txt');
const compareFile = join(DIRNAME, 'permutations copy.txt');

const outputs = processCombinatorics(inputs, getPermutations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);
compareDataToFile(formattedOutputs, compareFile);
