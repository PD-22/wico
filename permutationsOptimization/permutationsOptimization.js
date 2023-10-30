import unzip from "../utils/unzip.js";
import zip from "../utils/zip.js";
import { getPermutationAtIndex, getPermutationsLength } from "../permutations/permutations.js";

export default function getMinDiffPermutations(set) {
    const callback = Array.isArray(set) ?
        getMinDiffArrayPermutations :
        getMinDiffDictPermutations;
    return callback(set);
}

export function getMinDiffDictPermutations(setDict) {
    const [keys, values] = unzip(Object.entries(setDict));
    return getMinDiffArrayPermutations(values).map(newValues => Object.fromEntries(zip(keys, newValues)));
}

export function getMinDiffArrayPermutations(setArray) {
    return Array.from(getMinDiffPermutationsGenerator(setArray));
}

export function* getMinDiffPermutationsGenerator(set) {
    const totalLength = getPermutationsLength(set.length);
    for (let index = 0; index < totalLength; index++)
        yield getMinDiffPermutationAtIndex(set, index, totalLength);
}

export function getMinDiffPermutationAtIndex(set, index, totalLength = getPermutationsLength(set)) {
    const swappedIndex = getMinDiffPermutationSwapIndex(set, index, totalLength);
    return getPermutationAtIndex(set, swappedIndex, totalLength);
}

export function getMinDiffPermutationSwapIndex(set, index, totalLength = getPermutationsLength(set)) {
    if (index < 0 || index >= totalLength) throw new RangeError();

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
