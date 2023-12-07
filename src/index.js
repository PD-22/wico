import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import writeOutputToFile from "../debug/combinatoricsPerformance/writeOutputToFile.js";
import mapValues from "../utils/mapValues.js";
import { getMinDiffDictCombinations } from "./combinationsOptimization.js";
import formatWiring from "./formatWiring.js";
import { getMinDiffDictPermutations } from "./permutationsOptimization.js";

const DIRNAME = 'output';
if (!existsSync(DIRNAME)) mkdirSync(DIRNAME);
const outputFile = join(DIRNAME, 'wiring.txt');

const settings = {
    Jack: {
        L: "Green",
        R: "Red",
        G: "Copper",
        M: "Blue"
    },
    Speakers: {
        L: "Green",
        R: "Red",
        G: "Copper"
    }
};

const permutations = mapValues(settings, getMinDiffDictPermutations);
const combinations = getMinDiffDictCombinations(permutations);

writeOutputToFile(formatWiring(combinations), outputFile);
