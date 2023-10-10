import { zip } from "../../utils/general.js";
import getCombinations from "../combinations.js";

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
