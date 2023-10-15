import formatCombination from "./formatCombination.js";

export function formatCombinations(combinations) {
    return combinations.map(formatCombination).join('\n\n');
}
