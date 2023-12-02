import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import product from "../../utils/product.js";

simpleAssert(() => assert.strictEqual(product([2, 3, 4, 5]), 120));
