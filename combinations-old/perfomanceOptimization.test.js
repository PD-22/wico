import { writeFileSync } from "fs";
import { join } from "path";
import { getMinDiffCombinations } from "../combinations/combinationsOptimization.js";
import { comparePerfomance, createProgressBar, getDeltaTime, getDirname } from "../utils/debug.js";
import { deepArrayCompare, range } from "../utils/general.js";
import { getMinDiffCombinationsOld } from "./combinationsOldOptimization.js";

const DIRNAME = getDirname(import.meta.url);

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testInputs(getMinDiffCombinations, inputs);
const [deltaTimeOld, resultOld] = testInputs(getMinDiffCombinationsOld, inputs);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(resultNew, 'result-new.txt');
writeResult(resultOld, 'result-old.txt');

function testInputs(callbackFn, inputs) {
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

function checkResultsMatch(result1, result2) {
    console.log("Results match...");
    const resultsMatch = deepArrayCompare(result1, result2);
    console.log(`${Boolean(resultsMatch)}\n`);
}

function writeResult(combinationsResult, fileName) {
    const file = join(DIRNAME, fileName);
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, formatResult(combinationsResult));
    console.log('Done\n');
}

function formatResult(result) {
    return result.map(a => a.map(b => b.join(' ')).join('\n')).join('\n\n');
}
