import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../../utils/debug.js";
import getCombinations from "../combinations.js";
import formatCombinations from "./formatCombinations.js";

export default function testCombinations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getCombinations)(input);

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
