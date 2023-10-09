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
    for (let i = 0; i < combinationsLength; i++)
        yield getCombinationAtIndex(arrays, i, combinationsLength);
}

export function getCombinationsLength(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

export function getCombinationAtIndex(arrays, index, totalLength = getCombinationsLength(arrays)) {
    return arrays.map(array => {
        const length = array.length;
        // NOTE: division should be perfomed last to avoid floating-point rounding Errors
        const resultIndex = Math.floor(index * length / totalLength) % length;
        totalLength /= length;
        return array[resultIndex];
    });
}
