import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import countListDiff from "../../utils/countListDiff.js";

simpleAssert(() => assert.strictEqual(countListDiff([1, 2, 3, 4, 5], [1, 2, 0, 0, 5]), 2));
