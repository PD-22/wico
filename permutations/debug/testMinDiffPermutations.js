import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../../utils/debug.js";
import { forEachAdjacents } from "../../utils/general.js";
import getMinDiffPermutations from "../permutationsOptimization.js";
import formatPermutations from "./formatpermutations.js";
import validateAdjacentPermutations from "./validateAdjacentPermutations.js";

export default function testMinDiffPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getMinDiffPermutations)(input);

    forEachAdjacents(result, validateAdjacentPermutations);

    let formattedResult;

    if (outputFile) {
        formattedResult ??= formatPermutations(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"`);
    }

    if (compareFile) {
        formattedResult ??= formatPermutations(result);
        logDeltaTime(compareDataToFile)(formattedResult, compareFile);
    }
}
