import { getArrayOrDictCombinatorics } from "../combinatoric-utils/getArrayOrDictCombinatorics.js";
import { getDictCombinatorics } from "../combinatoric-utils/getDictCombinatorics.js";
import factorial from "../utils/factorial.js";

export default function getPermutations(set) {
    return getArrayOrDictCombinatorics(set, getArrayPermutations, getDictPermutations);
}

export function getDictPermutations(setDict) {
    return getDictCombinatorics(setDict, getPermutations);
}

export function getArrayPermutations(setList) {
    return Array.from(getPermutationsGenerator(setList));
}

export function* getPermutationsGenerator(set) {
    const totalLength = getPermutationsLength(set.length);
    for (let index = 0; index < totalLength; index++)
        yield getPermutationAtIndex(set, index, totalLength);
}

export function getPermutationsLength(setLength) {
    return factorial(setLength);
}

export function getPermutationAtIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    if (index < 0 || index >= totalLength) throw new RangeError();

    let remainingSet = set.slice();
    let result = [];

    for (let i = set.length - 1; i >= 0; i--) {
        totalLength /= i + 1;
        const quotient = Math.floor(index / totalLength);
        result.push(...remainingSet.splice(quotient, 1));
        index %= totalLength;
    }

    return result;
}
