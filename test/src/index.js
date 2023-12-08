import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import assertFileContent from "../../debug/assertFileContent.js";
import writeOutputToFile from "../../debug/combinatoricsPerformance/writeOutputToFile.js";
import simpleAssert from "../../debug/simpleAssert.js";
import { getMinDiffDictCombinations } from "../../src/combinationsOptimization.js";
import formatIndex from "../../src/formatWiring.js";
import { getMinDiffDictPermutations } from "../../src/permutationsOptimization.js";
import mapValues from "../../utils/mapValues.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'wiring.txt');
const outputCompareFile = join(DIRNAME, 'wiring-backup.txt');

const settings = {
    Jack: {
        L: "Green",
        R: "Red",
        G: "Copper",
        M: "Blue"
    },
    Speakers: {
        L: "Green",
        R: "Red",
        G: "Copper"
    }
};

const permutations = mapValues(settings, getMinDiffDictPermutations);
const combinations = getMinDiffDictCombinations(permutations);

const formatted = formatIndex(combinations);

writeOutputToFile(formatted, outputFile);

console.log(`Assert file Content "${outputCompareFile}"...`);
existsSync(outputCompareFile) ?
    simpleAssert(() => assertFileContent(outputCompareFile, formatted)) :
    console.log("NOT FOUND");
