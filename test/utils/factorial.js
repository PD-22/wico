import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import factorial from "../../utils/factorial.js";

simpleAssert(() => assert.strictEqual(factorial(4), 24));
