import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import simpleAssert from "../../debug/simpleAssert.js";

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

simpleAssert(() => assert.deepStrictEqual(actual, expected));
