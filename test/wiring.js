import { writeFileSync } from "fs";
import { join } from "path";
import { getMinDiffDictCombinations } from "../combinatorics/combinationsOptimization.js";
import { getMinDiffDictPermutations } from "../combinatorics/permutationsOptimization.js";
import compareDataToFile from "../debug/compareDataToFile.js";
import formatWiring from "../debug/formatWiring.js";
import mapValues from "../utils/mapValues.js";

const DIRNAME = 'temp';

const outputFile = join(DIRNAME, 'wiring.txt');
const outputCompareFile = join(DIRNAME, 'wiring copy.txt');
const wiringSettings = {
    aux: { m: "blue", r: "red", l: "green", g: "copper" },
    sound: { r: "red", g: "copper", l: "green" }
};

const wiringCombinations = getMinDiffDictCombinations(mapValues(wiringSettings, getMinDiffDictPermutations));
const formattedCombinations = formatWiring(wiringCombinations);

writeFileSync(outputFile, formattedCombinations);
console.log(`result: "${outputFile}"`);

if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
