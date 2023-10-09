import getCombinations from "../combinations/combinations.js";
import getCombinationsNew from "../combinations/combinationsNew.js";
import { comparePerfomance } from "../utils/debug.js";
import { range } from "../utils/general.js";
import { checkArraysMatch, testCombinationsPerfomance } from "./utils.js";

const inputs = Array(20).fill(Array(5).fill(range(1, 8)));

const [deltaTimeNew, resultNew] = testCombinationsPerfomance(getCombinationsNew, inputs);
const [deltaTime, result] = testCombinationsPerfomance(getCombinations, inputs);

checkArraysMatch(resultNew, result);

comparePerfomance(deltaTimeNew, deltaTime);
