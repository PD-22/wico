import { countListDiff } from "../../utils/general.js";

export default function validateAdjacentPermutations(v1, v2) {
    if (countListDiff(v1, v2) === 2) return;;
    throw new Error('Invalid adjacent permutations');
}
