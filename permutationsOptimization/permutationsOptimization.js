import { getPermutationAtIndex, getPermutationsLength } from "../permutations/permutations.js";
import mapValues from "../utils/mapValues.js";

/**
 * @template T
 * @overload
 * @param {T[]} setArray 
 * @returns {T[][]}
 */

/**
 * @template T
 * @overload
 * @param {Record<string, T>} setDict 
 * @returns {Record<string, T>[]}
 */

/**
 * @template T
 * @param {T[] | Record<string, T>} set
 * @returns {(T[] | Record<string, T>)[]}
 */
export default function getMinDiffPermutations(set) {
    return Array.isArray(set) ?
        getMinDiffArrayPermutations(set) :
        getMinDiffDictPermutations(set);
}

/**
 * @template T
 * @param {Record<string, T>} setDict 
 * @returns {Record<string, T>[]}
 */
export function getMinDiffDictPermutations(setDict) {
    return getMinDiffArrayPermutations(Object.values(setDict)).map(
        newValues => mapValues(setDict, (_v, _k, i) => newValues[i])
    );
}

/**
 * @template T
 * @param {T[]} setArray 
 * @returns {T[][]}
 */
export function getMinDiffArrayPermutations(setArray) {
    return Array.from(getMinDiffPermutationsGenerator(setArray));
}

/**
 * @template T
 * @param {T[]} set
 * @yields {T[]} 
 */
export function* getMinDiffPermutationsGenerator(set) {
    const totalLength = getPermutationsLength(set.length);
    for (let index = 0; index < totalLength; index++)
        yield getMinDiffPermutationAtIndex(set, index, totalLength);
}

/**
 * @template T
 * @param {T[]} set 
 * @param {number} index 
 * @param {number} totalLength 
 * @returns {T[]}
 */
export function getMinDiffPermutationAtIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    const swappedIndex = getMinDiffPermutationSwapIndex(set, index, totalLength);
    return getPermutationAtIndex(set, swappedIndex, totalLength);
}

/**
 * @param {any[]} set
 * @param {number} index
 * @returns {number}
 */
export function getMinDiffPermutationSwapIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    let length = set.length;
    totalLength /= length--;
    let offset = 0;

    while (length > 1) {
        const leftover = Math.floor(index / totalLength);
        const isOdd = leftover % 2 === 1;
        offset += leftover * totalLength;
        index %= totalLength;
        if (isOdd) index = totalLength - index - 1;
        totalLength /= length--;
    }

    return index + offset;
}
