import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import lines from "../../utils/lines.js";

simpleAssert(() => assert.strictEqual(lines('alpha', 'beta', 'charlie'), "alpha\nbeta\ncharlie"));
