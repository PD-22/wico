import { countListDiff, mapAdjacents } from "../../utils/general.js";

export class AdjacencyError extends Error {
    constructor(value1, value2, index1, index2) {
        super(`Invalid adjacent values ${value1} at index ${index1} and ${value2} at index ${index2}`);
        this.name = 'AdjacencyError';
    }
}

export default function validateMinDiffCombination(combination) {
    mapAdjacents(combination, (value1, value2, index1, index2) => {
        if (countListDiff(value1, value2) === 1) return;
        throw new AdjacencyError(value1, value2, index1, index2);
    });
}
