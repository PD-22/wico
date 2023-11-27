import { getPermutationAtIndex, getPermutationsLength } from "../permutations/permutations.js";
import mapValues from "../utils/mapValues.js";

export default function getMinDiffPermutations(set) {
    const callback = Array.isArray(set) ?
        getMinDiffArrayPermutations :
        getMinDiffDictPermutations;
    return callback(set);
}

export function getMinDiffDictPermutations(setDict) {
    return getMinDiffArrayPermutations(Object.values(setDict)).map(
        newValues => mapValues(setDict, (_v, _k, i) => newValues[i])
    );
}

export function getMinDiffArrayPermutations(setArray) {
    return Array.from(getMinDiffPermutationsGenerator(setArray));
}

export function* getMinDiffPermutationsGenerator(set) {
    const totalLength = getPermutationsLength(set.length);
    for (let index = 0; index < totalLength; index++)
        yield getMinDiffPermutationAtIndex(set, index, totalLength);
}

export function getMinDiffPermutationAtIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    const swappedIndex = getMinDiffPermutationSwapIndex(set, index, totalLength);
    return getPermutationAtIndex(set, swappedIndex, totalLength);
}

export function getMinDiffPermutationSwapIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    let length = set.length;
    totalLength /= length--;
    let offset = 0;

    while (length > 1) {
        const leftover = Math.floor(index / totalLength);
        const isOdd = leftover % 2 === 1;
        offset += leftover * totalLength;
        index %= totalLength;
        if (isOdd) index = totalLength - index - 1;
        totalLength /= length--;
    }

    return index + offset;
}
