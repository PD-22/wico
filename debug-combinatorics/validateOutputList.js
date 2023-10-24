import forEachAdjacents from "../utils/forEachAdjacents.js";

export default function validateOutputList(outputList, validateAdjacentItems) {
    outputList.forEach(output => forEachAdjacents(output, validateAdjacentItems));
}
