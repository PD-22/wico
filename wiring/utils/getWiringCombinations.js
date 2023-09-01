import { getMinDiffCombinations } from "../../combinations/combinationsOptimization.js";
import { getMinDiffPermutations } from "../../permutations/permutationsOptimization.js";
import { mapValues, zip } from "../../utils/general.js";

export default function getWiringCombinations(wiringSettings) {
    return getMinDiffCombinations(mapValues(wiringSettings, settings => getMinDiffKeyValuePermutations(settings)));
}

function getMinDiffKeyValuePermutations(wiringSetting) {
    return getMinDiffPermutations(Object.values(wiringSetting)).map(
        valuesPermutation => Object.fromEntries(zip(Object.keys(wiringSetting), valuesPermutation))
    );
}
