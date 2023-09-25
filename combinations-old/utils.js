import { writeFileSync } from "fs";
import { deepArrayCompare } from "../utils/general.js";

export function checkResultsMatch(result1, result2) {
    console.log("Testing results...");
    const resultsMatch = deepArrayCompare(result1, result2);
    if (resultsMatch) {
        console.log('Results match\n');
    } else {
        console.error('Different results!\n');
    }
}

export function writeCombinations(result, file) {
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, result);
    console.log('Done\n');
}
