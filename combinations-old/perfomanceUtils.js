import { writeFileSync } from "fs";
import { createProgressBar, getDeltaTime } from "../utils/debug.js";
import { deepArrayCompare } from "../utils/general.js";

export function testInputs(callbackFn, inputs) {
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

export function checkResultsMatch(result1, result2) {
    console.log("Results match...");
    const resultsMatch = deepArrayCompare(result1, result2);
    console.log(`${Boolean(resultsMatch)}\n`);
}

export function writeTestResult(file, data) {
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, data);
    console.log('Done\n');
}
