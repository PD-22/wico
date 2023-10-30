import { writeFileSync } from "fs";
import forEachAdjacents from "../utils/forEachAdjacents.js";
import compareDataToFile from "./compareDataToFile.js";
import createProgressBar from './createProgressBar.js';
import getDeltaTime from "./getDeltaTime.js";

const PROGRESS_BAR_WIDTH = 20;

export default function testCombinatoricsPerfomance({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile
}) {
    const outputList = processCombinatorics(inputs, getCombinatoricsCallback);

    if (validateAdjacentItems) validateOutputList(outputList, validateAdjacentItems);

    if (outputFile) writeOutputToFile(outputList, outputFile);

    if (compareFile) compareDataToFile(formatCombinatorics(outputList), compareFile);
}

function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);

    const progressBar = createProgressBar(inputs.length, PROGRESS_BAR_WIDTH);
    const [deltaTime, outputList] = getDeltaTime(() => inputs.map(input => {
        const result = getCombinatoricsCallback(input);
        progressBar.increment();
        return result;
    }));

    console.log(`${deltaTime.toFixed()} ms\n`);
    return outputList;
}

function validateOutputList(outputList, validateAdjacentItems) {
    outputList.forEach(output => forEachAdjacents(output, (v1, v2) => {
        if (validateAdjacentItems(v1, v2)) return;
        throw new Error('Invalid adjacency');
    }));
}

function writeOutputToFile(outputList, outputFile) {
    console.log(`Writing output to "${outputFile}"...`);
    const formattedOutputList = formatCombinatorics(outputList);
    writeFileSync(outputFile, formattedOutputList);
    console.log(`Done\n`);
}

function formatCombinatorics(combinatoricsList) {
    return combinatoricsList.map(
        combinatorics => combinatorics.map(
            combinatoric => combinatoric.join(' ')
        ).join('\n')
    ).join('\n\n');
}
