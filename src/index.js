import { writeFileSync } from "fs";
import { join } from "path";
import { getMinDiffDictCombinations } from "../combinatorics/combinationsOptimization.js";
import { getMinDiffDictPermutations } from "../combinatorics/permutationsOptimization.js";
import assertFileContent from "../debug/assertFileContent.js";
import mapValues from "../utils/mapValues.js";
import formatWiring from "./format.js";

const DIRNAME = 'output';

const outputFile = join(DIRNAME, 'wiring.txt');
const outputCompareFile = join(DIRNAME, 'wiring-backup.txt');
const wiringSettings = {
    aux: { m: "blue", r: "red", l: "green", g: "copper" },
    sound: { r: "red", g: "copper", l: "green" }
};

const wiringPermutations = mapValues(wiringSettings, getMinDiffDictPermutations);
const wiringCombinations = getMinDiffDictCombinations(wiringPermutations);

const formattedCombinations = formatWiring(wiringCombinations);

writeFileSync(outputFile, formattedCombinations);
console.log(`result: "${outputFile}"`);

assertFileContent(outputCompareFile, formattedCombinations);
