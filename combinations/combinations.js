import { combineDict } from "../utils/combinatorics.js";
import { product, range } from "../utils/general.js";

export function getKeyValueCombinations(arrays) {
    return combineDict(arrays, getCombinations);
}

export default function getCombinations(arrays) {
    return Array.from(getCombinationsGenerator(arrays));
}

export function* getCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getCombination(arrays, i, combinationsLength);
}

export function getCombinationsLength(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

export function getCombination(arrays, combIndex) {
    const itemIndices = range(0, arrays.length - 1);
    return itemIndices.map(itemIndex => getCombinationItem(arrays, combIndex, itemIndex));
}

export function getCombinationItem(arrays, combIndex, itemIndex) {
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex);
    const array = arrays[itemIndex];
    return array[resultIndex];
}

export function getCombinationItemIndex(arrays, combIndex, itemIndex) {
    const groupSize = product(Object.values(arrays).slice(itemIndex).map(x => x.length));
    const array = arrays[itemIndex];
    // NOTE: division should be perfomed last to avoid floating-point rounding Errors
    return Math.floor(combIndex * array.length / groupSize) % array.length;
}
