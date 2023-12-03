import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import range from "../../utils/range.js";

simpleAssert(
    () => assert.deepStrictEqual(range(5), [0, 1, 2, 3, 4]),
    'end'
);

simpleAssert(
    () => assert.deepStrictEqual(range(5, 10), [5, 6, 7, 8, 9]),
    'start, end'
);

simpleAssert(
    () => assert.deepStrictEqual(range(10, 20, 2), [10, 12, 14, 16, 18]),
    'start, end, step'
);
