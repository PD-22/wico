import { writeFileSync } from "fs";
import { createProgressBar, getDeltaTime } from "../utils/debug.js";
import { deepArrayCompare } from "../utils/general.js";
import validateMinDiffCombination from "../combinations/utils/validateMinDiffCombination.js";

export function testCombinationsPerfomance(callbackFn, inputs) {
    console.log(`${callbackFn.name}... `);
    const progressBar = createProgressBar(inputs.length, 20);

    const [deltaTime, results] = getDeltaTime(() => inputs.map(input => {
        const result = callbackFn(input);
        progressBar.increment();
        return result;
    }));

    console.log(`${deltaTime.toFixed(2)} ms\n`);
    return [deltaTime, results];
}

export function checkArraysMatch(result1, result2) {
    console.log("Results match...");
    const resultsMatch = deepArrayCompare(result1, result2);
    console.log(`${Boolean(resultsMatch)}\n`);
    return resultsMatch;
}

export function writeResult(file, data) {
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, data);
    console.log('Done\n');
}

export function formatCombinations(combinations) {
    return combinations.map(formatCombination).join('\n\n');
}

export function formatCombination(combination) {
    return combination.map(items => items.join(' ')).join('\n');
}

export function validateMinDiffCombinations(inputs, getCombinationsCallback) {
    console.log(`Validate ${getCombinationsCallback.name}... `);
    const result = inputs.map(input => {
        const result = getCombinationsCallback(input);
        validateMinDiffCombination(result);
        return result;
    });
    console.log("Valid\n");
    return result;
}
