import { combineDict } from "../utils/combinatorics.js";
import { product } from "../utils/general.js";

export function getKeyValueCombinations(arrays) {
    return combineDict(arrays, getCombinations);
}

export default function getCombinations(arrays) {
    return Array.from(getCombinationsGenerator(arrays));
}

export function* getCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    let lengthCount = product(Object.values(arrays).map(x => x.length));
    for (let i = 0; i < combinationsLength; i++)
        yield getCombinationAtIndex(arrays, i, lengthCount);
}

export function getCombinationsLength(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

// TODO: maybe remove l2 dependency
export function getCombinationAtIndex(arrays, index, l2) {
    return arrays.map(currArray => {
        const l1 = currArray.length;
        // NOTE: division should be perfomed last to avoid floating-point rounding Errors
        const resultIndex = Math.floor(index * l1 / l2) % l1;
        l2 /= l1;
        return currArray[resultIndex];
    });
}
