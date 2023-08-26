import { zip } from "../../utils/general.js";
import { getCombinations } from "../combinations.js";

export default function getSequenceVariants(
    firstItems,
    possibleLengths,
    createSequenceCallback,
    getCombinationsCallback = getCombinations
) {
    const firstItemsLengthCombinations = getCombinationsCallback(
        Array(firstItems.length).fill(possibleLengths)
    );

    const firstItemLengthPairListCombinations = firstItemsLengthCombinations.map(
        firstItemsLength => zip(firstItems, firstItemsLength)
    );

    return firstItemLengthPairListCombinations.map(
        pairList => pairList.map(([firstItem, length]) => createSequenceCallback(firstItem, length))
    );
}
