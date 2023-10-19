import { readFileSync, writeFileSync } from "fs";
import { createProgressBar, getDeltaTime } from "./debug.js";
import { compareFileContents, countListDiff, forEachAdjacents } from "./general.js";

export default function testCombinatorics({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile,
    progressBarWidth = 20
}) {
    const progressBar = createProgressBar(inputs.length, progressBarWidth);

    const results = [];
    let totalDeltaTime = 0;

    console.log(`${getCombinatoricsCallback.name}...`);
    inputs.map(input => {
        const [deltaTime, result] = getDeltaTime(() => getCombinatoricsCallback(input))
        progressBar.increment();
        results.push(result);
        totalDeltaTime += deltaTime;
    });
    console.log(`${totalDeltaTime.toFixed()} ms\n`);

    if (validateAdjacentItems) results.forEach(
        result => forEachAdjacents(result, validateAdjacentItems)
    );

    let formattedResults;

    if (outputFile) {
        console.log(`Writing output to "${outputFile}"...`);
        formattedResults ??= formatCombinatorics(results);
        writeFileSync(outputFile, formattedResults);
        console.log(`Done\n`);
    }

    if (compareFile) {
        console.log(`Compare output to "${compareFile}"...`);
        formattedResults ??= formatCombinatorics(results);
        const formattedCompareData = readFileSync(compareFile, 'utf8');
        const matches = compareFileContents(formattedCompareData, formattedResults);
        console.log(`Match: ${matches}`)
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
