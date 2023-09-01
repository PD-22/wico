import { mapValues, product } from "../utils/general.js";
import { getCombinationAtIndex, getCombinationsLength } from "./combinations.js";

export function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

export function* getMinDiffCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getMinDiffCombinationAtIndex(arrays, i);
}

export function getMinDiffCombinationAtIndex(arrays, index) {
    const alterReversedArrays = mapValues(arrays, (array, key, i) => {
        if (i <= 0) return array;
        const groupSize = product(Object.values(arrays).slice(i).map(x => x.length));
        const groupIndex = Math.floor(index / groupSize);
        const shouldReverse = groupIndex % 2 === 1;
        return shouldReverse ? array.toReversed() : array;
    });
    return getCombinationAtIndex(alterReversedArrays, index);
}
