import { combineDict } from "../utils/combinatorics.js";
import { product } from "../utils/general.js";
import { getCombinationAtIndex, getCombinationsLength } from "./combinations.js";

export function getMinDiffKeyValueCombinations(arrays) {
    return combineDict(arrays, getMinDiffCombinations);
}

export default function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

export function* getMinDiffCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getMinDiffCombinationAtIndex(arrays, i, combinationsLength);
}

export function getMinDiffCombinationAtIndex(arrays, index, totalLength) {
    const alterReversedArrays = arrays.map((array, i) => {
        const groupSize = product(Object.values(arrays).slice(i).map(x => x.length));
        const groupIndex = Math.floor(index / groupSize);
        const shouldReverse = groupIndex % 2 === 1;
        return shouldReverse ? array.toReversed() : array;
    });
    return getCombinationAtIndex(alterReversedArrays, index, totalLength);
}
