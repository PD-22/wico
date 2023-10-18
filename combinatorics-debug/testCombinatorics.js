import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../utils/debug.js";
import { forEachAdjacents } from "../utils/general.js";
import formatArrayList from "./formatArrayList.js";

export default function testCombinatorics({
    input,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile,
}) {
    console.log(`input: ${JSON.stringify(input)}\n`);

    const result = logDeltaTime(getCombinatoricsCallback)(input);

    if (validateAdjacentItems) forEachAdjacents(result, validateAdjacentItems);

    let formattedResult;

    if (outputFile) {
        formattedResult ??= formatArrayList(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"\n`);
    }

    if (compareFile) {
        formattedResult ??= formatArrayList(result);
        logDeltaTime(compareDataToFile)(formattedResult, compareFile);
    }
}
