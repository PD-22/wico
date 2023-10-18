import getCombinations from "../combinations/combinations.js";
import { createCharSequence, createNumSequence, zip } from "./general.js";

export default function getSequenceVariants(firstItems, possibleLengths, createSequenceCallback) {
    const firstItemsLengthCombinations = getCombinations(
        Array(firstItems.length).fill(possibleLengths)
    );

    const firstItemLengthPairListCombinations = firstItemsLengthCombinations.map(
        firstItemsLength => zip(firstItems, firstItemsLength)
    );

    return firstItemLengthPairListCombinations.map(
        pairList => pairList.map(([firstItem, length]) => createSequenceCallback(firstItem, length))
    );
}

export function getNumSequenceVariants(firstNums, possibleLengths) {
    return getSequenceVariants(firstNums, possibleLengths, createNumSequence);
}

export function getCharSequenceVariants(firstChars, possibleLengths) {
    return getSequenceVariants(firstChars, possibleLengths, createCharSequence);
}
