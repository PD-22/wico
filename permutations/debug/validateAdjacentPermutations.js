import { countListDiff } from "../../utils/general.js";

export default function validateAdjacentPermutations(v1, v2) {
    const isInvalid = countListDiff(v1, v2) !== 2;
    if (isInvalid) throw new Error('Invalid adjacent permutations');
}
