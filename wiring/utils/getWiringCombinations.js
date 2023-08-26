import { getMinDiffCombinations } from "../../combinations/combinationsOptimization.js";
import { getMinDiffPermutations } from "../../permutations/permutationsOptimization.js";
import { transformObject, zip } from "../../utils/general.js";

export default function getWiringCombinations(wiringSettings) {
    return getMinDiffCombinations(transformObject(wiringSettings,
        (k, settings) => [settings.name, getWiringPermutations(settings)]
    ));
}

function getWiringPermutations(wiringSetting) {
    return getMinDiffKeyValuePermutations(wiringSetting.points, wiringSetting.wires);
}

function getMinDiffKeyValuePermutations(keys, values) {
    return getMinDiffPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
}
