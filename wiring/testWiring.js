import { writeFileSync } from "fs";
import getMinDiffCombinations from "../combinationsOptimization/combinationsOptimization.js";
import compareDataToFile from "../debug/compareDataToFile.js";
import { getMinDiffDictPermutations } from "../permutationsOptimization/permutationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import formatWiring from "./formatWiring.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getMinDiffCombinations(mapValues(wiringSettings, getMinDiffDictPermutations));

    const formattedCombinations = formatWiring(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
