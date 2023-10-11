import { combineDict } from "../utils/combinatorics.js";
import { product, range } from "../utils/general.js";
import { getCombinationItemIndex, getCombinationsLength } from "./combinations.js";

export function getMinDiffKeyValueCombinations(arrays) {
    return combineDict(arrays, getMinDiffCombinations);
}

export default function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

export function* getMinDiffCombinationsGenerator(arrays) {
    const combinationsLength = getCombinationsLength(arrays);
    for (let i = 0; i < combinationsLength; i++)
        yield getMinDiffCombination(arrays, i, combinationsLength);
}

export function getMinDiffCombination(arrays, combIndex) {
    const itemIndices = range(0, arrays.length - 1);
    return itemIndices.map(itemIndex => getMinDiffCombinationItem(arrays, combIndex, itemIndex));
}

export function getMinDiffCombinationItem(arrays, combIndex, itemIndex) {
    const resultIndex = getMinDiffCombinationItemIndex(arrays, combIndex, itemIndex);
    const array = arrays[itemIndex];
    return array[resultIndex];
}

export function getMinDiffCombinationItemIndex(arrays, combIndex, itemIndex) {
    const resultIndex = getCombinationItemIndex(arrays, combIndex, itemIndex);
    const shouldReverse = checkShouldReverseCombinationGroup(arrays, combIndex, itemIndex);

    const array = arrays[itemIndex];
    const reverseResultIndex = array.length - 1 - resultIndex;
    return shouldReverse ? reverseResultIndex : resultIndex;
}

export function checkShouldReverseCombinationGroup(arrays, combIndex, itemIndex) {
    const groupSize = product(Object.values(arrays).slice(itemIndex).map(x => x.length));
    const groupIndex = Math.floor(combIndex / groupSize);
    return groupIndex % 2 === 1;
}
