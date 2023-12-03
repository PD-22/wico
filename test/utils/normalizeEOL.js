import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import normalizeEOL from "../../utils/normalizeEOL.js";

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
