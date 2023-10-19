import { countListDiff } from "../utils/general.js";

export default function validateAdjacencyDiff(desiredAmount) {
    return (v1, v2) => {
        if (countListDiff(v1, v2) === desiredAmount) return;
        throw new Error('Invalid adjacency');
    };
}
