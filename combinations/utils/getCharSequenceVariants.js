import { createCharSequence } from "../../utils/general.js";
import { getCombinations } from "../combinations.js";
import getSequenceVariants from "./getSequenceVariants.js";

export default function getCharSequenceVariants(
    firstChars,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    return getSequenceVariants(
        firstChars,
        possibleLengths,
        createCharSequence,
        getCombinationsCallback
    );
}
