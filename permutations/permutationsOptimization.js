import { combineDict } from "../utils/combinatorics.js";
import { getPermutationAtIndex, getPermutationsLength } from "./permutations.js";

export function getMinDiffKeyValuePermutations(set) {
    return combineDict(set, getMinDiffPermutations);
}

export function getMinDiffPermutations(set) {
    return Array.from(getMinDiffPermutationsGenerator(set));
}

export function* getMinDiffPermutationsGenerator(set) {
    for (let i = 0; i < getPermutationsLength(set.length); i++)
        yield getMinDiffPermutationAtIndex(set, i);
}

export function getMinDiffPermutationAtIndex(set, index) {
    const minDiffPermutationSwapIndex = getMinDiffPermutationSwapIndex(set.length, index);
    return getPermutationAtIndex(set, minDiffPermutationSwapIndex);
}

export function getMinDiffPermutationSwapIndex(length, index) {
    const permutationsLength = getPermutationsLength(length);

    if (index < 0 || index >= permutationsLength) throw new RangeError();

    let height = permutationsLength / length--;
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
