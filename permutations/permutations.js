import factorial from "../utils/factorial.js";
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
export default function getPermutations(set) {
    return Array.isArray(set) ?
        getArrayPermutations(set) :
        getDictPermutations(set);
}

/**
 * @template T
 * @param {Record<string, T>} setDict 
 * @returns {Record<string, T>[]}
 */
export function getDictPermutations(setDict) {
    return getArrayPermutations(Object.values(setDict)).map(
        newValues => mapValues(setDict, (_v, _k, i) => newValues[i])
    );
}

/**
 * @template T
 * @param {T[]} setArray 
 * @returns {T[][]}
 */
export function getArrayPermutations(setArray) {
    return Array.from(getPermutationsGenerator(setArray));
}

/**
 * @template T
 * @param {T[]} set
 * @yields {T[]} 
 */
export function* getPermutationsGenerator(set) {
    const totalLength = getPermutationsLength(set.length);
    for (let index = 0; index < totalLength; index++)
        yield getPermutationAtIndex(set, index, totalLength);
}

/**
 * @param {number} setLength 
 * @returns {number}
 */
export function getPermutationsLength(setLength) {
    return factorial(setLength);
}

/**
 * @template T
 * @param {T[]} set 
 * @param {number} index 
 * @param {number} totalLength 
 * @returns {T[]}
 */
export function getPermutationAtIndex(set, index, totalLength = getPermutationsLength(set.length)) {
    let remainingSet = set.slice();
    let result = [];

    for (let i = set.length - 1; i >= 0; i--) {
        totalLength /= i + 1;
        const quotient = Math.floor(index / totalLength);
        result.push(...remainingSet.splice(quotient, 1));
        index %= totalLength;
    }

    return result;
}
