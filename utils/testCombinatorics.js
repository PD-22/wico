import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "./debug.js";
import { countListDiff, forEachAdjacents } from "./general.js";

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
        formattedResult ??= formatCombinatorics(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"\n`);
    }

    if (compareFile) {
        formattedResult ??= formatCombinatorics(result);
        logDeltaTime(compareDataToFile)(formattedResult, compareFile);
    }
}

function formatCombinatorics(combinatorics) {
    return combinatorics.map(combinatoric => combinatoric.join(' ')).join('\n');
}

export function validateAdjacencyDiff(desiredAmount) {
    return (v1, v2) => {
        if (countListDiff(v1, v2) === desiredAmount) return;
        throw new Error('Invalid adjacency');
    };
}
