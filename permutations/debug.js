import { writeFileSync } from "fs";
import { countListDiff, forEachAdjacents } from "../utils/general.js";
import { getMinDiffPermutations } from "./permutationsOptimization.js";

export function testMinDiffPermutations(input, outputFile) {
    console.log(`input: ${JSON.stringify(input)}`);

    const permutations = getMinDiffPermutations(input);

    forEachAdjacents(permutations, validateAdjacentPermutations);

    writeFileSync(outputFile, formatpermutations(permutations));
    console.log(`Output written to "${outputFile}"`);
}

function formatpermutations(permutations) {
    return permutations.map(permutation => permutation.join(' ')).join('\n');
}

function validateAdjacentPermutations(v1, v2) {
    const isInvalid = countListDiff(v1, v2) !== 2;
    if (isInvalid) throw new Error('Invalid adjacent permutations');
}
