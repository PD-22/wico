import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import delay from "../../debug/delay.js";
import simpleAssert from "../../debug/simpleAssert.js";

(() => {
    const actual = captureConsole(() => {
        console.log("Hello, World!");
        console.error("Error message");
        console.info("Information message");
        console.warn("Warning message");
        process.stdout.write("Process stdout write");
    });

    const expected = [
        "Hello, World!",
        "Error message",
        "Information message",
        "Warning message",
        "Process stdout write"
    ];

    simpleAssert(() => assert.deepStrictEqual(actual, expected), 'sync');
})();

(async () => {
    const actual = await captureConsole(async () => {
        await delay(50); console.log("Hello, World!");
        await delay(50); console.error("Error message");
        await delay(50); console.info("Information message");
        await delay(50); console.warn("Warning message");
        await delay(50); process.stdout.write("Process stdout write");
    });

    const expected = [
        "Hello, World!",
        "Error message",
        "Information message",
        "Warning message",
        "Process stdout write"
    ];

    simpleAssert(() => assert.deepStrictEqual(actual, expected), 'async');
})();
