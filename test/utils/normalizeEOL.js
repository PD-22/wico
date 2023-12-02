import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import normalizeEOL from "../../utils/normalizeEOL.js";

const lines = "A\nB";

simpleAssert(() => assert.strictEqual(lines, normalizeEOL("A\nB")));
simpleAssert(() => assert.strictEqual(lines, normalizeEOL("A\rB")));
simpleAssert(() => assert.strictEqual(lines, normalizeEOL("A\r\nB")));
simpleAssert(() => assert.notStrictEqual(lines, normalizeEOL("AB")));
