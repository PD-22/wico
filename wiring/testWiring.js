import { writeFileSync } from "fs";
import getMinDiffCombinations from "../combinationsOptimization/combinationsOptimization.js";
import getMinDiffPermutations from "../permutationsOptimization/permutationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import compareDataToFile from "../debug/compareDataToFile.js";
import formatWiringCombinations from "./formatWiringCombinations.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getMinDiffCombinations(mapValues(wiringSettings, getMinDiffPermutations));

    const formattedCombinations = formatWiringCombinations(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
