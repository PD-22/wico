import assert from "assert";
import normalizeEOL from "../../debug/normalizeEOL.js";
import simpleAssert from "../../debug/simpleAssert.js";

const expected = "A\nB";

simpleAssert(
    () => assert.strictEqual(expected, normalizeEOL("A\nB")),
    "line feed"
);

simpleAssert(
    () => assert.strictEqual(expected, normalizeEOL("A\rB")),
    "carriage return"
);

simpleAssert(
    () => assert.strictEqual(expected, normalizeEOL("A\r\nB")),
    "carriage return line feed"
);

simpleAssert(
    () => assert.notStrictEqual(expected, normalizeEOL("AB")),
    "empty"
);
