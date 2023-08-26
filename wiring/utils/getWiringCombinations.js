import { getMinDiffCombinations } from "../../combinations/combinationsOptimization.js";
import { getMinDiffPermutations } from "../../permutations/permutationsOptimization.js";
import { zip } from "../../utils/general.js";

export default function getWiringCombinations(wiringSettings) {
    const [settings1, settings2] = wiringSettings;

    const permutations1 = getWiringPermutations(settings1);
    const permutations2 = getWiringPermutations(settings2);

    return getMinDiffCombinations({
        [settings1.name]: permutations1,
        [settings2.name]: permutations2
    });
}

function getWiringPermutations(wiringSetting) {
    return getMinDiffKeyValuePermutations(wiringSetting.points, wiringSetting.wires);
}

function getMinDiffKeyValuePermutations(keys, values) {
    return getMinDiffPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
}
