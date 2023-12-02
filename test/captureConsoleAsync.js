import assert from "assert";
import captureConsoleAsync from "../debug/captureConsoleAsync.js";
import simpleAssert from "../debug/simpleAssert.js";

(async () => {
    const captured = await captureConsoleAsync(async () => {
        console.log("Hello, World!"); await delay(50);
        console.error("Error message"); await delay(50);
        console.info("Information message"); await delay(50);
        console.warn("Warning message"); await delay(50);
    });

    simpleAssert(() => assert.deepStrictEqual(captured, [
        "Hello, World!",
        "Error message",
        "Information message",
        "Warning message"
    ]));
})();

/**
 * @param {number | undefined} [ms]
 * @returns {Promise<unknown>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
