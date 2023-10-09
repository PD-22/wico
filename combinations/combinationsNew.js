import { combineDict } from "../utils/combinatorics.js";
import { product } from "../utils/general.js";

export function getKeyValueCombinationsNew(arrays) {
    return combineDict(arrays, getCombinationsNew);
}

export default function getCombinationsNew(arrays) {
    return Array.from(getCombinationsGeneratorNew(arrays));
}

export function* getCombinationsGeneratorNew(arrays) {
    const combinationsLength = getCombinationsLengthNew(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getCombinationAtIndexNew(arrays, i);
}

export function getCombinationsLengthNew(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

export function getCombinationAtIndexNew(arrays, index) {
    return arrays.map((currArray, arrayIndex) => {
        const l1 = currArray.length;
        const l2 = product(Object.values(arrays).slice(arrayIndex).map(x => x.length));
        // NOTE: division should be perfomed last to avoid floating-point rounding Errors
        const resultIndex = Math.floor(index * l1 / l2) % l1;
        return currArray[resultIndex];
    });
}
