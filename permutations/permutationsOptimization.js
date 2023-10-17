import combineDict from "../utils/combineDict.js";
import { factorial } from "../utils/general.js";

export default function getMinDiffPermutations(set) {
    const resultList = [];

    for (let index = 0; index < factorial(set.length); index++) {
        const permutationsLength = factorial(set.length);

        let groupSize = set.length;
        let height = permutationsLength / groupSize--;
        let offset = 0;

        let cacheA = index;
        while (groupSize > 1) {
            const leftover = Math.floor(cacheA / height);
            const isOdd = leftover % 2 === 1;
            offset += leftover * height;
            cacheA %= height;
            if (isOdd) cacheA = height - cacheA - 1;
            height /= groupSize--;
        }

        const minDiffPermutationSwapIndex = cacheA + offset;

        const remainingSet = set.slice();
        const result = [];

        let cacheB = minDiffPermutationSwapIndex;
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

export function getMinDiffKeyValuePermutations(set) {
    return combineDict(set, getMinDiffPermutations);
}
