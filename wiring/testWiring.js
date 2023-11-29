import { writeFileSync } from "fs";
import { getMinDiffDictCombinations } from "../combinationsOptimization/combinationsOptimization.js";
import compareDataToFile from "../debug/compareDataToFile.js";
import { getMinDiffDictPermutations } from "../permutationsOptimization/permutationsOptimization.js";
import mapValues from "../utils/mapValues.js";
import formatWiring from "./formatWiring.js";

/**
 * @param {Record<string, Record<string, string>>} wiringSettings
 * @param {import("fs").PathOrFileDescriptor} outputFile
 * @param {import("fs").PathOrFileDescriptor} outputCompareFile
 */
export default function testWiring(wiringSettings, outputFile, outputCompareFile) {
    const wiringCombinations = getMinDiffDictCombinations(mapValues(wiringSettings, getMinDiffDictPermutations));

    const formattedCombinations = formatWiring(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
