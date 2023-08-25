import { mapObjectOrArray, product } from "../utils/general.js";

export function getCombinations(arrays) {
    return Array.from(getCombinationsGenerator(arrays));
}

export function* getCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getCombinationAtIndex(arrays, i);
}

export function getCombinationsLength(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

export function getCombinationAtIndex(arrays, index) {
    return mapObjectOrArray(arrays, (currArray, arrayIndex) => {
        const l1 = currArray.length;
        const l2 = product(Object.values(arrays).slice(arrayIndex).map(x => x.length));
        // NOTE: division should be perfomed last to avoid floating-point rounding Errors
        const resultIndex = Math.floor(index * l1 / l2) % l1;
        return currArray[resultIndex];
    });
}
