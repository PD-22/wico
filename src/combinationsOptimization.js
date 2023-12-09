import mapValues from "../utils/mapValues.js";
import { getCombinationItemIndex, getCombinationsLength, getGroupSize } from "./combinations.js";

/**
 * @template T
 * @param {T[][]} arraysList
 * @returns {T[][]}
 */
export default function getMinDiffCombinations(arraysList) {
    return Array.from(getMinDiffCombinationsGenerator(arraysList));
}

/**
 * @template T
 * @param {Record<string, T[]>} arraysDict
 * @returns {Record<string, T>[]}
 */
export function getMinDiffDictCombinations(arraysDict) {
    return getMinDiffCombinations(Object.values(arraysDict)).map(newValues =>
        mapValues(arraysDict, (_v, _k, i) => newValues[i])
    );
}

/**
 * @template T
 * @param {T[][]} arrays
 * @yields {T[]}
 */
export function* getMinDiffCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getMinDiffCombinationAtIndex(arrays, i, combinationsLength);
}

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} combIndex
 * @param {number} combinationsLength
 * @returns {T[]}
 */
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

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} combIndex
 * @param {number} itemIndex
 * @param {number} groupSize
 * @returns {T}
 */
export function getMinDiffCombinationItem(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    const resultIndex = getMinDiffCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
    return array[resultIndex];
}

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} combIndex
 * @param {number} itemIndex
 * @param {number} groupSize
 * @returns {number}
 */
export function getMinDiffCombinationItemIndex(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
    const shouldReverse = checkShouldReverseGroup(arrays, combIndex, itemIndex, groupSize);

    const array = arrays[itemIndex];
    return shouldReverse ? array.length - 1 - resultIndex : resultIndex;
}

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} combIndex
 * @param {number} itemIndex
 * @param {number} groupSizeCache
 * @returns {boolean}
 */
export function checkShouldReverseGroup(
    arrays, combIndex, itemIndex,
    groupSizeCache = getGroupSize(arrays, itemIndex)
) {
    const groupIndex = Math.floor(combIndex / groupSizeCache);
    return groupIndex % 2 === 1;
}
