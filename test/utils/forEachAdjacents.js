import assert from "assert";
import forEachAdjacents from "../../utils/forEachAdjacents.js";

forEachAdjacents([5, 6, 7, 8, 9], (v1, v2, i1, i2) => {
    if (v1 + v2 === 15) assert.deepEqual([v1, v2, i1, i2], [7, 8, 2, 3]);
});

console.log('PASS');