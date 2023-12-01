import assert from "assert";
import countListDiff from "../../utils/countListDiff.js";

assert.strictEqual(countListDiff([1, 2, 3, 4, 5], [1, 2, 0, 0, 5]), 2);

console.log('PASS');
