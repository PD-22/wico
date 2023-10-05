import { createCharSequence } from "../../utils/general.js";
import getSequenceVariants from "./getSequenceVariants.js";

export default function getCharSequenceVariants(firstChars, possibleLengths) {
    return getSequenceVariants(firstChars, possibleLengths, createCharSequence);
}
