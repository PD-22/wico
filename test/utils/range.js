import assert from "assert";
import range from "../../utils/range.js";

assert.deepStrictEqual(range(5), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(range(5, 10), [5, 6, 7, 8, 9]);
assert.deepStrictEqual(range(10, 20, 2), [10, 12, 14, 16, 18]);

console.log('PASS');
