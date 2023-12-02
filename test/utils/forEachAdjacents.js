import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import forEachAdjacents from "../../utils/forEachAdjacents.js";

forEachAdjacents([5, 6, 7, 8, 9], (v1, v2, i1, i2) => {
    if (v1 + v2 === 15) simpleAssert(() => assert.deepStrictEqual([v1, v2, i1, i2], [7, 8, 2, 3]));
});
