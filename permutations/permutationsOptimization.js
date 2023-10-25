import { getDictCombinatorics } from "../combinatoric-utils/getDictPermutations.js";
import { getPermutationAtIndex, getPermutationsLength } from "./permutations.js";

export default function getMinDiffPermutations(set) {
    const isArray = Array.isArray(set);
    const callback = isArray ? getMinDiffArrayPermutations : getMinDiffDictPermutations;
    return callback(set);
}

export function getMinDiffDictPermutations(setDict) {
    return getDictCombinatorics(setDict, getMinDiffPermutations);
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
    return getPermutationAtIndex(set, getMinDiffPermutationSwapIndex(set.length, index, totalLength));
}

export function getMinDiffPermutationSwapIndex(length, index, totalLength = getPermutationsLength(set)) {
    if (index < 0 || index >= totalLength) throw new RangeError();

    let height = totalLength / length--;
    let offset = 0;

    while (length > 1) {
        const leftover = Math.floor(index / height);
        const isOdd = leftover % 2 === 1;
        offset += leftover * height;
        index %= height;
        if (isOdd) index = height - index - 1;
        height /= length--;
    }

    return index + offset;
}
