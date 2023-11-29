import mapValues from "../utils/mapValues.js";
import product from "../utils/product.js";

/**
 * @template T
 * @param {T[][]} arraysList
 * @returns {T[][]}
 */
export default function getCombinations(arraysList) {
    return Array.from(getCombinationsGenerator(arraysList));
}

/**
 * @template T
 * @param {Record<string, T[]>} arraysDict
 * @returns {Record<string, T>[]}
 */
export function getDictCombinations(arraysDict) {
    return getCombinations(Object.values(arraysDict)).map(newValues =>
        mapValues(arraysDict, (_v, _k, i) => newValues[i])
    );
}

/**
 * @template T
 * @param {T[][]} arrays
 * @yields {T[]}
 */
export function* getCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getCombinationAtIndex(arrays, i, combinationsLength);
}

/**
 * @template T
 * @param {T[][]} arrays
 * @returns {number}
 */
export function getCombinationsLength(arrays) {
    return product(arrays.map(x => x.length));
}

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} combIndex
 * @param {number} combinationsLength
 * @returns {T[]}
 */
export function getCombinationAtIndex(
    arrays, combIndex,
    combinationsLength = getCombinationsLength(arrays)
) {
    let groupSizeCache = combinationsLength;
    return arrays.map((array, itemIndex) => {
        const result = getCombinationItem(arrays, combIndex, itemIndex, groupSizeCache);
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
export function getCombinationItem(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
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
export function getCombinationItemIndex(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    // NOTE: division should be performed last to avoid floating-point rounding errors
    return Math.floor(combIndex * array.length / groupSize) % array.length;
}

/**
 * @template T
 * @param {T[][]} arrays
 * @param {number} itemIndex
 * @returns {number}
 */
export function getGroupSize(arrays, itemIndex) {
    return getCombinationsLength(arrays.slice(itemIndex));
}
