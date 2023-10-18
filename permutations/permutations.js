import combineDict from "../utils/combineDict.js";
import { factorial } from "../utils/general.js";

export default function getPermutations(set) {
    const resultList = [];

    const totalLength = factorial(set.length);
    for (let index = 0; index < totalLength; index++) {
        const remainingSet = set.slice();
        const result = [];

        let cacheB = index;
        let factCache = totalLength;
        for (let j = set.length - 1; j >= 0; j--) {
            factCache /= (j + 1);
            const quotient = Math.floor(cacheB / factCache);

            result.push(remainingSet[quotient]);
            remainingSet.splice(quotient, 1);

            cacheB %= factCache;
        }

        resultList[index] = result;
    }

    return resultList;
}

export function getKeyValuePermutations(set) {
    return combineDict(set, getPermutations);
}
