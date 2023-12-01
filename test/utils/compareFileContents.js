import assert from "assert";
import compareFileContents from "../../utils/compareFileContents.js";

const lines = "A\nB";

assert.strictEqual(compareFileContents(lines, "A\nB"), true);
assert.strictEqual(compareFileContents(lines, "A\rB"), true);
assert.strictEqual(compareFileContents(lines, "A\r\nB"), true);
assert.strictEqual(compareFileContents(lines, "AB"), false);

console.log('PASS');
