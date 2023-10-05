import { createNumSequence } from "../../utils/general.js";
import getSequenceVariants from "./getSequenceVariants.js";

export default function getNumSequenceVariants(firstNums, possibleLengths) {
    return getSequenceVariants(firstNums, possibleLengths, createNumSequence);
}
