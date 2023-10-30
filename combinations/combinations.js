import product from "../utils/product.js";
import unzip from "../utils/unzip.js";
import zip from "../utils/zip.js";

export default function getCombinations(arrays) {
    const callback = Array.isArray(arrays) ?
        getArrayCombinations :
        getDictCombinations;
    return callback(arrays);
}

export function getDictCombinations(arraysDict) {
    const [keys, values] = unzip(Object.entries(arraysDict));
    return getArrayCombinations(values).map(newValues => Object.fromEntries(zip(keys, newValues)));
}

export function getArrayCombinations(arraysList) {
    return Array.from(getCombinationsGenerator(arraysList));
}

export function* getCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getCombinationAtIndex(arrays, i, combinationsLength);
}

export function getCombinationsLength(arrays) {
    return product(arrays.map(x => x.length));
}

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

export function getCombinationItem(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex, groupSize);
    return array[resultIndex];
}

export function getCombinationItemIndex(
    arrays, combIndex, itemIndex,
    groupSize = getGroupSize(arrays, itemIndex)
) {
    const array = arrays[itemIndex];
    // NOTE: division should be performed last to avoid floating-point rounding errors
    return Math.floor(combIndex * array.length / groupSize) % array.length;
}

export function getGroupSize(arrays, itemIndex) {
    return getCombinationsLength(arrays.slice(itemIndex));
}
