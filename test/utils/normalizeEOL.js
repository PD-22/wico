import assert from "assert";
import normalizeEOL from "../../utils/normalizeEOL.js";

const lines = "A\nB";

assert.strictEqual(lines, normalizeEOL("A\nB"));
assert.strictEqual(lines, normalizeEOL("A\rB"));
assert.strictEqual(lines, normalizeEOL("A\r\nB"));
assert.notStrictEqual(lines, normalizeEOL("AB"));

console.log('PASS');
