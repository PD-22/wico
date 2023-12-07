import assert from "assert";
import simpleAssert from "../../debug/simpleAssert.js";
import indent from "../../utils/indent.js";

/**
 * @param {string} input
 * @param {string} expected
 * @param {string} description
 */
function test(description, input, expected) {
  return simpleAssert(() => assert.strictEqual(indent(input, "-"), expected), description);
}

test("easy",                               "A\nB\nC",            "-A\n-B\n-C");
test("newline middle",                     "A\n\nB\nC",          "-A\n\n-B\n-C");
test("double newline middle",              "A\n\n\nB\nC",        "-A\n\n\n-B\n-C");
test("start newline",                      "\nA\nB\nC",          "\n-A\n-B\n-C");
test("start newline whitespace",           "    \nA\nB\nC",      "    \n-A\n-B\n-C");
test("start newline whitespace newline",   "\n    \nA\nB\nC",    "\n    \n-A\n-B\n-C");
test("start whitespace newline",           "    \nA\nB\nC",      "    \n-A\n-B\n-C");
test("end newline",                        "A\nB\nC\n",          "-A\n-B\n-C\n");
test("end newline whitespace",             "A\nB\nC\n    ",      "-A\n-B\n-C\n    ");
test("end newline whitespace newline",     "A\nB\nC\n    \n",    "-A\n-B\n-C\n    \n");
test("end whitespace newline",             "A\nB\nC    \n",      "-A\n-B\n-C    \n");
test("start lines whitespace",             "  A\n  B\n  C",      "-  A\n-  B\n-  C");
