import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../debug/assertFileContent.js";
import simpleAssert from "../debug/simpleAssert.js";
import { writeOutputToFile } from "../debug/testCombinatoricsPerformance.js";
import mapValues from "../utils/mapValues.js";
import { getMinDiffDictCombinations } from "./combinationsOptimization.js";
import formatWiring from "./format.js";
import { getMinDiffDictPermutations } from "./permutationsOptimization.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);

const outputFile = join(DIRNAME, 'wiring.txt');
const outputCompareFile = join(DIRNAME, 'wiring-backup.txt');
const wiringSettings = {
    aux: { m: "blue", r: "red", l: "green", g: "copper" },
    sound: { r: "red", g: "copper", l: "green" }
};

const wiringPermutations = mapValues(wiringSettings, getMinDiffDictPermutations);
const wiringCombinations = getMinDiffDictCombinations(wiringPermutations);

const formattedCombinations = formatWiring(wiringCombinations);

writeOutputToFile(formattedCombinations, outputFile);

console.log(`Assert file Content "${outputCompareFile}"...`);
existsSync(outputCompareFile) ?
    simpleAssert(() => assertFileContent(outputCompareFile, formattedCombinations)) :
    console.log("NOT FOUND");
