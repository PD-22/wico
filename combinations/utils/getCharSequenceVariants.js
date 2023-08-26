import { createCharSequence, zip } from "../../utils/general.js";
import { getCombinations } from "../combinations.js";

export default function getCharSequenceVariants(
    firstChars,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    const firstCharLengthCombinations = getCombinationsCallback(
        Array(firstChars.length).fill(possibleLengths)
    );

    const firstCharLengthPairListCombinations = firstCharLengthCombinations.map(
        firstCharsLength => zip(firstChars, firstCharsLength)
    );

    return firstCharLengthPairListCombinations.map(
        pairList => pairList.map(([firstChar, length]) => createCharSequence(firstChar, length))
    );
}
