import { join } from "path";
import getDirname from "../debug/getDirname.js";
import { writeFileSync } from "fs";
import { getMinDiffDictCombinations } from "../combinationsOptimization/combinationsOptimization.js";
import compareDataToFile from "../debug/compareDataToFile.js";
import { getMinDiffDictPermutations } from "../permutationsOptimization/permutationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import formatWiring from "./formatWiring.js";

const DIRNAME = getDirname(import.meta.url);

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
