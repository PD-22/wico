import combineDict from "../utils/combineDict.js";
import { product } from "../utils/general.js";

export default function getCombinations(arrays) {
    const result = [];
    const amount = product(arrays.map(x => x.length));

    for (let i = 0; i < amount; i++) {
        let groupSize = amount;
        result.push(arrays.map(array => {
            const l = array.length;
            // NOTE: division should be performed last to avoid floating-point rounding errors
            const resultIndex = Math.floor(i * l / groupSize) % l;
            groupSize /= l;
            return array[resultIndex];
        }));
    }

    return result;
}

export function getKeyValueCombinations(arrays) {
    return combineDict(arrays, getCombinations);
}
