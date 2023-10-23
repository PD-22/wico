import { writeFileSync } from "fs";
import { getMinDiffKeyValueCombinations } from "../combinations/combinationsOptimization.js";
import { getMinDiffKeyValuePermutations } from "../permutations/permutationsOptimization.js";
import { mapValues } from "../utils/general.js";
import compareDataToFile from "./compareDataToFile.js";
import formatWiringCombinations from "./formatWiringCombinations.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getMinDiffKeyValueCombinations(
        mapValues(wiringSettings, getMinDiffKeyValuePermutations)
    );

    const formattedCombinations = formatWiringCombinations(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
