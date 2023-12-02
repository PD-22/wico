import assert from "assert";
import captureConsole from "../debug/captureConsole.js";
import simpleAssert from "../debug/simpleAssert.js";

const captured = captureConsole(() => {
    console.log("Hello, World!");
    console.error("Error message");
    console.info("Information message");
    console.warn("Warning message");
});

simpleAssert(() => assert.deepStrictEqual(captured, [
    "Hello, World!",
    "Error message",
    "Information message",
    "Warning message"
]));
