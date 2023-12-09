import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import delay from "../../debug/delay.js";
import simpleAssert from "../../debug/simpleAssert.js";

const expectedLogs = [
    "Hello, World!",
    "Error message",
    "Information message",
    "Warning message",
    "Process stdout write"
];
const expectedResult = "MOCK_RESULT";

const callbackList = [
    () => console.log("Hello, World!"),
    () => console.error("Error message"),
    () => console.info("Information message"),
    () => console.warn("Warning message"),
    () => process.stdout.write("Process stdout write")
];

(() => {
    const [logs, result] = captureConsole(() => {
        callbackList.forEach(cb => cb());
        return expectedResult;
    });

    simpleAssert(() => {
        assert.deepStrictEqual(logs, expectedLogs);
        assert.strictEqual(result, expectedResult);
    }, 'sync');
})();

(async () => {
    const [logs, result] = await captureConsole(async () => {
        await Promise.all(callbackList.map(cb => delay(50).then(cb)));
        return expectedResult;
    });

    simpleAssert(() => {
        assert.deepStrictEqual(logs, expectedLogs);
        assert.strictEqual(result, expectedResult);
    }, 'async');
})();
