import { writeFileSync } from "fs";
import forEachAdjacents from "../utils/forEachAdjacents.js";
import createProgressBar from './createProgressBar.js';
import getDeltaTime from "./getDeltaTime.js";

export function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);

    const progressBar = createProgressBar(inputs.length, 20);
    const [deltaTime, outputList] = getDeltaTime(() => inputs.map(input => {
        const result = getCombinatoricsCallback(input);
        progressBar.increment();
        return result;
    }));

    console.log(`${deltaTime.toFixed()} ms\n`);
    return outputList;
}

export function validateOutputList(outputList, validateAdjacentItems) {
    outputList.forEach(output => forEachAdjacents(output, (v1, v2) => {
        if (validateAdjacentItems(v1, v2)) return;
        throw new Error('Invalid adjacency');
    }));
}

export function writeOutputToFile(formattedOutputList, outputFile) {
    console.log(`Writing output to "${outputFile}"...`);
    writeFileSync(outputFile, formattedOutputList);
    console.log(`Done\n`);
}

export function formatCombinatorics(combinatoricsList) {
    return combinatoricsList.map(
        combinatorics => combinatorics.map(
            combinatoric => combinatoric.join(' ')
        ).join('\n')
    ).join('\n\n');
}
