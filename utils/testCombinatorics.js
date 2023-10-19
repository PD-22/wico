import { readFileSync, writeFileSync } from "fs";
import { createProgressBar, getDeltaTime } from "./debug.js";
import { compareFileContents, countListDiff, forEachAdjacents } from "./general.js";

const PROGRESS_BAR_WIDTH = 20;

export default function testCombinatorics({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile
}) {
    const outputList = processCombinatorics(inputs, getCombinatoricsCallback)

    if (validateAdjacentItems) outputList.forEach(output => forEachAdjacents(output, validateAdjacentItems));

    let formattedOutputList;

    if (outputFile) {
        console.log(`Writing output to "${outputFile}"...`);
        formattedOutputList ??= formatCombinatorics(outputList);
        writeFileSync(outputFile, formattedOutputList);
        console.log(`Done\n`);
    }

    if (compareFile) {
        console.log(`Compare output to "${compareFile}"...`);
        formattedOutputList ??= formatCombinatorics(outputList);
        const formattedCompareData = readFileSync(compareFile, 'utf8');
        const matches = compareFileContents(formattedCompareData, formattedOutputList);
        console.log(`Match: ${matches}`)
    }
}

function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);
    const progressBar = createProgressBar(inputs.length, PROGRESS_BAR_WIDTH);
    const [deltaTime, outputList] = getDeltaTime(() =>
        inputs.map(input => {
            const result = getCombinatoricsCallback(input);
            progressBar.increment();
            return result;
        })
    );

    console.log(`${deltaTime.toFixed()} ms\n`);
    return outputList;
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
