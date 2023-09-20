import { getMinDiffKeyValueCombinations } from "../../combinations/combinationsOptimization.js";
import { getMinDiffKeyValuePermutations } from "../../permutations/permutationsOptimization.js";
import { mapValues } from "../../utils/general.js";

export default function getWiringCombinations(wiringSettings) {
    return getMinDiffKeyValueCombinations(getWiringPermutations(wiringSettings));
}

function getWiringPermutations(wiringSettings) {
    return mapValues(wiringSettings, getMinDiffKeyValuePermutations);
}
