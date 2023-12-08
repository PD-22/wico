import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import simpleAssert from "../../debug/simpleAssert.js";

const actual = captureConsole(() => {
    simpleAssert(() => assert.strictEqual(1 + 2, 3));
    simpleAssert(() => assert.strictEqual(1 + 2, '3'));
});

const expected = "PASS\nFAIL: Expected values to be strictly equal:\n\n3 !== '3'\n";

console.log(actual.join('\n') === expected ? "PASS" : "FAIL");
