import factorial from "../utils/factorial.js";
import mapValues from "../utils/mapValues.js";

export default function getPermutations(set) {
    const callback = Array.isArray(set) ?
        getArrayPermutations :
        getDictPermutations;
    return callback(set);
}

export function getDictPermutations(setDict) {
    return getArrayPermutations(Object.values(setDict)).map(
        newValues => mapValues(setDict, (_v, _k, i) => newValues[i])
    );
}

export function getArrayPermutations(setArray) {
    return Array.from(getPermutationsGenerator(setArray));
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
