import { writeFileSync } from "fs";
import { join } from "path";
import { getCombinations } from "../combinations/combinations.js";
import { comparePerfomance, getDeltaTime, getDirname } from "../utils/debug.js";
import { deepArrayCompare, range } from "../utils/general.js";
import getCombinationsOld from "./combinationsOld.js";

const DIRNAME = getDirname(import.meta.url);

const input = Array(7).fill(range(1, 7));

const [deltaTimeNew, resultNew] = testInput(getCombinations, input);
const [deltaTimeOld, resultOld] = testInput(getCombinationsOld, input);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

writeResult(resultNew, 'result-new.txt');
writeResult(resultOld, 'result-old.txt');

function testInput(callbackFn, input) {
    console.log(`${callbackFn.name}... `);
    const [deltaTime, result] = getDeltaTime(() => callbackFn(input));
    console.log(`${deltaTime.toFixed(2)} ms\n`);
    return [deltaTime, result];
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
    return result.map(b => b.join(' ')).join('\n');
}
