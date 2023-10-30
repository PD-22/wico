import factorial from "../utils/factorial.js";
import unzip from "../utils/unzip.js";
import zip from "../utils/zip.js";

export function getDictPermutations(setDict) {
    const [keys, values] = unzip(Object.entries(setDict));
    return getPermutations(values).map(newValues => Object.fromEntries(zip(keys, newValues)));
}

export default function getPermutations(set) {
    return Array.from(getPermutationsGenerator(set));
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
