import { combineDict } from "../utils/combinatorics.js";
import { product } from "../utils/general.js";

export default function getMinDiffCombinations(arrays) {
    const result = [];
    const amount = product(arrays.map(x => x.length));

    for (let i = 0; i < amount; i++) {
        let groupSize = amount;
        result.push(arrays.map(array => {
            const l = array.length;
            // NOTE: division should be performed last to avoid floating-point rounding errors
            const resultIndex = Math.floor(i * l / groupSize) % l;
            const shouldReverse = Math.floor(i / groupSize) % 2 === 1;
            groupSize /= l;
            return array[shouldReverse ? l - 1 - resultIndex : resultIndex];
        }));
    }

    return result;
}

export function getMinDiffKeyValueCombinations(arrays) {
    return combineDict(arrays, getMinDiffCombinations);
}
