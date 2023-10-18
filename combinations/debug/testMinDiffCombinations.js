import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../../utils/debug.js";
import { forEachAdjacents } from "../../utils/general.js";
import getMinDiffCombinations from "../combinationsOptimization.js";
import formatCombinations from "./formatCombinations.js";
import validateAdjacentCombinations from "./validateAdjacentCombinations.js";

export default function testMinDiffCombinations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getMinDiffCombinations)(input);

    forEachAdjacents(result, validateAdjacentCombinations);

    let formattedResult;

    if (outputFile) {
        formattedResult ??= formatCombinations(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"`);
    }

    if (compareFile) {
        formattedResult ??= formatCombinations(result);
        logDeltaTime(compareDataToFile)(formattedResult, compareFile);
    }
}
