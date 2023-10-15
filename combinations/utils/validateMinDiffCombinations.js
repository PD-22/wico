import validateMinDiffCombination from "./validateMinDiffCombination.js";

export default function validateMinDiffCombinations(inputs, getCombinationsCallback) {
    console.log(`Validate ${getCombinationsCallback.name}... `);
    const result = inputs.map(input => {
        const result = getCombinationsCallback(input);
        validateMinDiffCombination(result);
        return result;
    });
    console.log("Valid\n");
    return result;
}
