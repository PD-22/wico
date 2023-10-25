import { writeFileSync } from "fs";
import { getMinDiffDictCombinations } from "../combinations/combinationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import { getMinDiffDictPermutations } from "../permutations/permutationsOptimization.js";
import compareDataToFile from "./compareDataToFile.js";
import formatWiringCombinations from "./formatWiringCombinations.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getMinDiffDictCombinations(
        mapValues(wiringSettings, getMinDiffDictPermutations)
    );

    const formattedCombinations = formatWiringCombinations(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
