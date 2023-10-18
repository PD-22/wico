import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../../utils/debug.js";
import getPermutations from "../permutations.js";
import formatPermutations from "./formatpermutations.js";

export default function testPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getPermutations)(input);

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
