import { getMinDiffCombinations } from "../../combinations/combinationsOptimization.js";
import { getMinDiffPermutations } from "../../permutations/permutationsOptimization.js";
import { mapValues, zip } from "../../utils/general.js";

export default function getWiringCombinations(wiringSettings) {
    return getMinDiffKeyValueCombinations(mapValues(wiringSettings, settings => getMinDiffKeyValuePermutations(settings)));
}

function getMinDiffKeyValueCombinations(wiringPermutations) {
    return getMinDiffCombinations(Object.values(wiringPermutations)).map(
        valuesCombination => Object.fromEntries(zip(Object.keys(wiringPermutations), valuesCombination))
    );
}

function getMinDiffKeyValuePermutations(wiringSetting) {
    return getMinDiffPermutations(Object.values(wiringSetting)).map(
        valuesPermutation => Object.fromEntries(zip(Object.keys(wiringSetting), valuesPermutation))
    );
}
