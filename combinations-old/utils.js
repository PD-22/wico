import { writeFileSync } from "fs";
import { join } from "path";
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

export function createWriteResult(formatResult = () => { }, DIRNAME = '') {
    return (combinationsResult, fileName) => {
        const file = join(DIRNAME, fileName);
        console.log(`Writing to "${file}"...`);
        writeFileSync(file, formatResult(combinationsResult));
        console.log('Done\n');
    }
}
