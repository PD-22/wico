import { createCharSequence, zip } from "../../utils/general.js";
import { getCombinations } from "../combinations.js";

export default function getCharSequenceVariants(
    firstChars,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    return getCombinationsCallback(
        Array(firstChars.length).fill(possibleLengths)
    ).map(
        lengths => zip(firstChars, lengths).map(args => createCharSequence(...args))
    );
}
