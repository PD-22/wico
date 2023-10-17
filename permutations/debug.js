import { writeFileSync } from "fs";
import { countListDiff, forEachAdjacents } from "../utils/general.js";
import { compareDataToFile } from "../utils/debug.js";
import getMinDiffPermutations from "./permutationsOptimization.js";
import { getPermutations } from "./permutations.js";

export function testPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = getPermutations(input);

    const formattedResult = formatpermutations(result);
    writeFileSync(outputFile, formattedResult);
    console.log(`Output written to "${outputFile}"`);

    if (compareFile) compareDataToFile(formattedResult, compareFile);
}

export function testMinDiffPermutations(input, outputFile, compareFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const result = getMinDiffPermutations(input);

    forEachAdjacents(result, validateAdjacentPermutations);

    const formattedResult = formatpermutations(result);
    writeFileSync(outputFile, formattedResult);
    console.log(`Output written to "${outputFile}"`);

    if (compareFile) compareDataToFile(formattedResult, compareFile);
}

function formatpermutations(permutations) {
    return permutations.map(permutation => permutation.join(' ')).join('\n');
}

function validateAdjacentPermutations(v1, v2) {
    const isInvalid = countListDiff(v1, v2) !== 2;
    if (isInvalid) throw new Error('Invalid adjacent permutations');
}
