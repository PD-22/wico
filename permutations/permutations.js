import combineDict from "../utils/combineDict.js";
import { factorial } from "../utils/general.js";

export default function getPermutations(set) {
    const resultList = [];

    for (let index = 0; index < factorial(set.length); index++) {
        const remainingSet = set.slice();
        const result = [];

        let cacheB = index;
        for (let j = set.length - 1; j >= 0; j--) {
            const quotient = Math.floor(cacheB / factorial(j));

            result.push(remainingSet[quotient]);
            remainingSet.splice(quotient, 1);

            cacheB %= factorial(j);
        }

        resultList[index] = result;
    }

    return resultList;
}

export function getKeyValuePermutations(set) {
    return combineDict(set, getPermutations);
}
