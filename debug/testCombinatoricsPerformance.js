import assert from "assert";
import { writeFileSync } from "fs";
import countListDiff from "../utils/countListDiff.js";
import forEachAdjacents from "../utils/forEachAdjacents.js";
import createProgressBar from './createProgressBar.js';
import getDeltaTime from "./getDeltaTime.js";

/**
 * @template T, V
 * @param {T[]} inputs
 * @param {(input: T) => V[][]} getCombinatoricsCallback
 * @returns {V[][][]}
 */
export function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);

    const progressBar = createProgressBar(inputs.length, 20);
    const [deltaTime, outputList] = getDeltaTime(() => inputs.map(input => {
        const result = getCombinatoricsCallback(input);
        progressBar.increment();
        return result;
    }));

    console.log(`${deltaTime.toFixed()} ms`);
    return outputList;
}

/**
 * @template T
 * @param {T[][][]} outputList
 * @param {number} expectedDiffCount
 * @throws {AssertionError}
 */
export function assertCombinatoricsOptimization(outputList, expectedDiffCount) {
    outputList.forEach(output => forEachAdjacents(output, (v1, v2) =>
        assert.strictEqual(countListDiff(v1, v2), expectedDiffCount)
    ))
}

/**
 * @param {string} formattedOutputList
 * @param {import("fs").PathLike} outputFile
 */
export function writeOutputToFile(formattedOutputList, outputFile) {
    console.log(`Writing output to "${outputFile}"...`);
    writeFileSync(outputFile, formattedOutputList);
    console.log(`Done`);
}

/**
 * @template T
 * @param {T[][][]} combinatoricsList
 * @returns {string}
 */
export function formatCombinatorics(combinatoricsList) {
    return combinatoricsList.map(
        combinatorics => combinatorics.map(
            combinatoric => combinatoric.join(' ')
        ).join('\n')
    ).join('\n\n');
}
