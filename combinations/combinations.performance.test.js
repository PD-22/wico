import { join } from "path";
import compareDataToFile from "../debug/compareDataToFile.js";
import getDirname from '../debug/getDirname.js';
import { formatCombinatorics, processCombinatorics, writeOutputToFile } from "../debug/testCombinatoricsPerformance.js";
import range from "../utils/range.js";
import getCombinations from "./combinations.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputFile = join(DIRNAME, 'combinations.txt');
const compareFile = join(DIRNAME, 'combinations copy.txt');

const outputs = processCombinatorics(inputs, getCombinations);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);
compareDataToFile(formattedOutputs, compareFile);
