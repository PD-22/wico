import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import getCombinations from "../../src/combinations.js";

const result = getCombinations([[1, 2, 3], [10, 20, 30], [100, 200, 300]]);
const expected = [
    [1, 10, 100],
    [1, 10, 200],
    [1, 10, 300],
    [1, 20, 100],
    [1, 20, 200],
    [1, 20, 300],
    [1, 30, 100],
    [1, 30, 200],
    [1, 30, 300],
    [2, 10, 100],
    [2, 10, 200],
    [2, 10, 300],
    [2, 20, 100],
    [2, 20, 200],
    [2, 20, 300],
    [2, 30, 100],
    [2, 30, 200],
    [2, 30, 300],
    [3, 10, 100],
    [3, 10, 200],
    [3, 10, 300],
    [3, 20, 100],
    [3, 20, 200],
    [3, 20, 300],
    [3, 30, 100],
    [3, 30, 200],
    [3, 30, 300]
];

simpleAssert(() => assert.deepStrictEqual(result, expected));
