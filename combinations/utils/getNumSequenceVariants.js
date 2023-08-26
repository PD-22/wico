import { createNumSequence } from "../../utils/general.js";
import { getCombinations } from "../combinations.js";
import getSequenceVariants from "./getSequenceVariants.js";

export default function getNumSequenceVariants(
    firstNums,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    return getSequenceVariants(
        firstNums,
        possibleLengths,
        createNumSequence,
        getCombinationsCallback
    );
}
