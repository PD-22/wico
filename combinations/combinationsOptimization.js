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
    for (let i = 0; i < total; i++) {
        let totalCopy = total;

        yield arrays.map(array => {
            const groupIndex = Math.floor(i / totalCopy);
            const shouldReverse = groupIndex % 2 === 1;

            const length = array.length;
            const resultIndex = Math.floor(i * length / totalCopy) % length;
            const reverseResultIndex = length - 1 - resultIndex;
            const alterReversedResultIndex = shouldReverse ? reverseResultIndex : resultIndex;

            const result = array[alterReversedResultIndex];
            totalCopy /= length;
            return result;
        })
    };
}
