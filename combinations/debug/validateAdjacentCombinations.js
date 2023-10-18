import { countListDiff, forEachAdjacents } from "../../utils/general.js";

export default function validateAdjacentCombinations(v1, v2) {
    if (countListDiff(v1, v2) === 1) return;
    throw new Error('Invalid adjacent combinations');
}
