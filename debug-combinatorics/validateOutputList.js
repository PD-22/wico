import { forEachAdjacents } from "../utils/general.js";

export default function validateOutputList(outputList, validateAdjacentItems) {
    outputList.forEach(output => forEachAdjacents(output, validateAdjacentItems));
}
