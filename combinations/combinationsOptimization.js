import unzip from "../utils/unzip.js";
import zip from "../utils/zip.js";
import { getCombinationItemIndex, getCombinationsLength, getGroupSize } from "./combinations.js";

export function getMinDiffDictCombinations(arraysDict) {
    const [keys, values] = unzip(Object.entries(arraysDict));
    return getMinDiffCombinations(values).map(newValues => Object.fromEntries(zip(keys, newValues)));
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
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    const resultIndex = getMinDiffCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
    return array[resultIndex];
}

export function getMinDiffCombinationItemIndex(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
    const shouldReverse = checkShouldReverseGroup(arrays, combIndex, itemIndex, groupSize);

    const array = arrays[itemIndex];
    return shouldReverse ? array.length - 1 - resultIndex : resultIndex;
}

export function checkShouldReverseGroup(
    arrays, combIndex, itemIndex,
    groupSizeCache = getGroupSize(arrays, itemIndex)
) {
    const groupIndex = Math.floor(combIndex / groupSizeCache);
    return groupIndex % 2 === 1;
}
