import { join } from "path";
import { getCombinations } from "../combinations/combinations.js";
import getNumSequenceVariants from "../combinations/utils/getNumSequenceVariants.js";
import { comparePerfomance, getDeltaTime, getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import getCombinationsOld from "./combinationsOld.js";
import { checkResultsMatch, writeCombinations } from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

const possibleLengths = range(2, 50);
const testInputs = range(2, 3).map(x => ({ firstNums: Array(x).fill(0), possibleLengths }));

const [deltaTimeNew, newCombinationsResult] = measurePerfomance(getCombinations, testInputs);
const [deltaTimeOld, oldCombinationsResult] = measurePerfomance(getCombinationsOld, testInputs);

comparePerfomance(deltaTimeNew, deltaTimeOld);

checkResultsMatch(newCombinationsResult, oldCombinationsResult);

writeResult(newCombinationsResult, 'output-new-combinations.txt');
writeResult(oldCombinationsResult, 'output-old-combinations.txt');

function measurePerfomance(methodCallback, testInputs) {
    console.log(`${methodCallback.name}...`);
    const [deltaTime, result] = getDeltaTime(() =>
        testInputs.flatMap(({ firstNums, possibleLengths }) =>
            getNumSequenceVariants(firstNums, possibleLengths, methodCallback)
        )
    );
    console.log(`${deltaTime.toFixed(2)} ms\n`);

    return [deltaTime, result];
}

function writeResult(combinationsResult, fileName) {
    return writeCombinations(formatCombinations(combinationsResult), join(DIRNAME, fileName));
}

function formatCombinations(combinations) {
    return combinations.map(sequence => sequence.map(item => item.join(' ')).join(' | ')).join('\n');
}
