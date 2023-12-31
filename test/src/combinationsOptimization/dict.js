import assert from "assert";
import simpleAssert from "../../../debug/simpleAssert.js";
import { getMinDiffDictCombinations } from "../../../src/combinationsOptimization.js";

const result = getMinDiffDictCombinations({ A: [1, 2, 3], B: [10, 20, 30], C: [100, 200, 300] });
const expected = [
    { A: 1, B: 10, C: 100 },
    { A: 1, B: 10, C: 200 },
    { A: 1, B: 10, C: 300 },
    { A: 1, B: 20, C: 300 },
    { A: 1, B: 20, C: 200 },
    { A: 1, B: 20, C: 100 },
    { A: 1, B: 30, C: 100 },
    { A: 1, B: 30, C: 200 },
    { A: 1, B: 30, C: 300 },
    { A: 2, B: 30, C: 300 },
    { A: 2, B: 30, C: 200 },
    { A: 2, B: 30, C: 100 },
    { A: 2, B: 20, C: 100 },
    { A: 2, B: 20, C: 200 },
    { A: 2, B: 20, C: 300 },
    { A: 2, B: 10, C: 300 },
    { A: 2, B: 10, C: 200 },
    { A: 2, B: 10, C: 100 },
    { A: 3, B: 10, C: 100 },
    { A: 3, B: 10, C: 200 },
    { A: 3, B: 10, C: 300 },
    { A: 3, B: 20, C: 300 },
    { A: 3, B: 20, C: 200 },
    { A: 3, B: 20, C: 100 },
    { A: 3, B: 30, C: 100 },
    { A: 3, B: 30, C: 200 },
    { A: 3, B: 30, C: 300 }
]
// NOTE: difference between every adjacent combination should be only 1

simpleAssert(() => assert.deepStrictEqual(result, expected));
