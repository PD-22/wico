import { writeFileSync } from "fs";
import { compareDataToFile, logDeltaTime } from "../utils/debug.js";
import { countListDiff, forEachAdjacents } from "../utils/general.js";
import getPermutations from "./permutations.js";
import getMinDiffPermutations from "./permutationsOptimization.js";

export function testPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getPermutations)(input);

    let formattedResult;

    if (outputFile) {
        formattedResult ??= formatpermutations(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"`);
    }

    if (compareFile) {
        formattedResult ??= formatpermutations(result);
        compareDataToFile(formattedResult, compareFile);
    }
}

export function testMinDiffPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = logDeltaTime(getMinDiffPermutations)(input);

    forEachAdjacents(result, validateAdjacentPermutations);

    let formattedResult;

    if (outputFile) {
        formattedResult ??= formatpermutations(result);
        writeFileSync(outputFile, formattedResult);
        console.log(`Output written to "${outputFile}"`);
    }

    if (compareFile) {
        formattedResult ??= formatpermutations(result);
        compareDataToFile(formattedResult, compareFile);
    }
}

function formatpermutations(permutations) {
    return permutations.map(permutation => permutation.join(' ')).join('\n');
}

function validateAdjacentPermutations(v1, v2) {
    const isInvalid = countListDiff(v1, v2) !== 2;
    if (isInvalid) throw new Error('Invalid adjacent permutations');
}
