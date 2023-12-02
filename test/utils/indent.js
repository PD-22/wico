import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import indent from "../../utils/indent.js";

simpleAssert(() => assert.strictEqual(indent("A\nB\nC", '-'), "-A\n-B\n-C"))
