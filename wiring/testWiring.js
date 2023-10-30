import { writeFileSync } from "fs";
import { getMinDiffDictCombinations } from "../combinations/combinationsOptimization.js";
import { getMinDiffDictPermutations } from "../permutations/permutationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import compareDataToFile from "./compareDataToFile.js";
import formatWiringCombinations from "./formatWiringCombinations.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const minDiffPermutations = mapValues(wiringSettings, getMinDiffDictPermutations);
    const minDiffCombinations = getMinDiffDictCombinations(minDiffPermutations);

    const formattedCombinations = formatWiringCombinations(minDiffCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
