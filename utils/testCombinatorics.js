import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "./debug.js";
import { countListDiff, forEachAdjacents } from "./general.js";

export default function testCombinatorics({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile,
}) {
    const results = inputs.map(
        input => logDeltaTime(getCombinatoricsCallback)(input)
    );

    if (validateAdjacentItems) results.forEach(
        result => forEachAdjacents(result, validateAdjacentItems)
    );

    let formattedResults;

    if (outputFile) {
        formattedResults ??= formatCombinatorics(results);
        writeFileSync(outputFile, formattedResults);
        console.log(`Output written to "${outputFile}"\n`);
    }

    if (compareFile) {
        formattedResults ??= formatCombinatorics(results);
        logDeltaTime(compareDataToFile)(formattedResults, compareFile);
    }
}

function formatCombinatorics(combinatoricsList) {
    return combinatoricsList.map(
        combinatorics => combinatorics.map(
            combinatoric => combinatoric.join(' ')
        ).join('\n')
    ).join('\n\n');
}

export function validateAdjacencyDiff(desiredAmount) {
    return (v1, v2) => {
        if (countListDiff(v1, v2) === desiredAmount) return;
        throw new Error('Invalid adjacency');
    };
}
