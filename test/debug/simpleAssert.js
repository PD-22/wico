import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import simpleAssert from "../../debug/simpleAssert.js";

const [logs] = captureConsole(() => {
    simpleAssert(() => assert.strictEqual(1 + 2, 3));
    simpleAssert(() => assert.strictEqual(1 + 2, '3'));
});

const expectedLogs = "PASS\nFAIL: Expected values to be strictly equal:\n\n3 !== '3'\n";

console.log(logs.join('\n') === expectedLogs ? "PASS" : "FAIL");
