import { combineDict } from "../utils/combinatorics.js";
import { getCombinationsLength } from "./combinations.js";

export function getMinDiffKeyValueCombinations(arrays) {
    return combineDict(arrays, getMinDiffCombinations);
}

export default function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

export function* getMinDiffCombinationsGenerator(arrays) {
    const total = getCombinationsLength(arrays);
    for (let i = 0; i < total; i++)
        yield getMinDiffCombinationAtIndex(total, arrays, i);
}

function getMinDiffCombinationAtIndex(total, arrays, i) {
    return arrays.map(array => {
        const groupIndex = Math.floor(i / total);
        const shouldReverse = groupIndex % 2 === 1;

        const length = array.length;
        const resultIndex = Math.floor(i * length / total) % length;
        const reverseResultIndex = length - 1 - resultIndex;
        const alterReversedResultIndex = shouldReverse ? reverseResultIndex : resultIndex;

        const result = array[alterReversedResultIndex];
        total /= length;
        return result;
    });
}
