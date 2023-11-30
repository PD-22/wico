import { join } from "path";
import compareDataToFile from "../debug/compareDataToFile.js";
import getDirname from '../debug/getDirname.js';
import { formatCombinatorics, processCombinatorics, validateOutputList, writeOutputToFile } from "../debug/testCombinatoricsPerformance.js";
import countListDiff from "../utils/countListDiff.js";
import range from "../utils/range.js";
import getMinDiffCombinations from "./combinationsOptimization.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = range(20).map(() => range(4).map(() => range(20)));
const outputFile = join(DIRNAME, 'combinationsOptimization.txt');
const compareFile = join(DIRNAME, 'combinationsOptimization copy.txt');
const validateAdjacentItems = (v1, v2) => countListDiff(v1, v2) === 1;

const outputs = processCombinatorics(inputs, getMinDiffCombinations);
validateOutputList(outputs, validateAdjacentItems);
const formattedOutputs = formatCombinatorics(outputs);
writeOutputToFile(formattedOutputs, outputFile);
compareDataToFile(formattedOutputs, compareFile);
