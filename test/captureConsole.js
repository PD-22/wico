import assert from "assert";
import captureConsole from "../debug/captureConsole.js";
import simpleAssert from "../debug/simpleAssert.js";

(() => {
    const captured = captureConsole(() => {
        console.log("Hello, World!");
        console.error("Error message");
        console.info("Information message");
        console.warn("Warning message");
        process.stdout.write("Process stdout write");
    });

    simpleAssert(() => assert.deepStrictEqual(captured, [
        "Hello, World!",
        "Error message",
        "Information message",
        "Warning message",
        "Process stdout write"
    ]));
})();

(async () => {
    /** @param {number} [ms] @returns {Promise<void>} */
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const captured = await captureConsole(async () => {
        await delay(100); console.log("Hello, World!");
        await delay(100); console.error("Error message");
        await delay(100); console.info("Information message");
        await delay(100); console.warn("Warning message");
        await delay(100); process.stdout.write("Process stdout write");
    });

    simpleAssert(() => assert.deepStrictEqual(captured, [
        "Hello, World!",
        "Error message",
        "Information message",
        "Warning message",
        "Process stdout write"
    ]));
})();
