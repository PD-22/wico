import { combineDict } from "../utils/combinatorics.js";
import { getCombinationItemIndex, getCombinationsLength, getGroupSize } from "./combinations.js";

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

export function getMinDiffCombinationAtIndex(
    arrays, combIndex,
    combinationsLength = getCombinationsLength(arrays)
) {
    let groupSizeCache = combinationsLength;
    return arrays.map((array, itemIndex) => {
        const result = getMinDiffCombinationItem(arrays, combIndex, itemIndex, groupSizeCache);
        groupSizeCache /= array.length;
        return result;
    });
}

export function getMinDiffCombinationItem(
    arrays, combIndex, itemIndex,
    groupSizeCache = getGroupSize(arrays, itemIndex)
) {
    const resultIndex = getMinDiffCombinationItemIndex(arrays, combIndex, itemIndex, groupSizeCache);
    const array = arrays[itemIndex];
    return array[resultIndex];
}

export function getMinDiffCombinationItemIndex(
    arrays, combIndex, itemIndex,
    groupSizeCache = getGroupSize(arrays, itemIndex)
) {
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex, groupSizeCache);
    const shouldReverse = checkShouldReverseGroup(arrays, combIndex, itemIndex, groupSizeCache);

    const array = arrays[itemIndex];
    const reverseResultIndex = array.length - 1 - resultIndex;
    return shouldReverse ? reverseResultIndex : resultIndex;
}

export function checkShouldReverseGroup(
    arrays, combIndex, itemIndex,
    groupSizeCache = getGroupSize(arrays, itemIndex)
) {
    const groupIndex = Math.floor(combIndex / groupSizeCache);
    return groupIndex % 2 === 1;
}
