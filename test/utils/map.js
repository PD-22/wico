import assert from "assert";
import map from "../../utils/map.js";
import simpleAssert from "../../debug/simpleAssert.js";

simpleAssert(() => assert.deepStrictEqual(
    map({ a: 1, b: 2, c: 3 }, (v, k, i) => [v, k, i].join(' ')),
    ["1 a 0", "2 b 1", "3 c 2"]
));
