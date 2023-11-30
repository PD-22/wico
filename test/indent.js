import indent from "../utils/indent.js";

const IDENT = '-';

test(
  'easy',
  "One\nTwo\nThree",
  "-One\n-Two\n-Three"
);

test(
  'newline middle',
  "One\n\nTwo\nThree",
  "-One\n\n-Two\n-Three"
);

test(
  'double newline middle',
  "One\n\n\nTwo\nThree",
  "-One\n\n\n-Two\n-Three"
);

test(
  'start newline',
  "\nOne\nTwo\nThree",
  "\n-One\n-Two\n-Three"
);

test(
  'start newline whitespace',
  "    \nOne\nTwo\nThree",
  "    \n-One\n-Two\n-Three"
);

test(
  'start newline whitespace newline',
  "    \n\nOne\nTwo\nThree",
  "    \n\n-One\n-Two\n-Three"
);

test(
  'start whitespace newline',
  "    \nOne\nTwo\nThree",
  "    \n-One\n-Two\n-Three"
);

test(
  'end newline',
  "One\nTwo\nThree\n",
  "-One\n-Two\n-Three\n"
);

test(
  'end newline whitespace',
  "One\nTwo\nThree\n",
  "-One\n-Two\n-Three\n"
);

test(
  'end newline whitespace newline',
  "One\nTwo\nThree\n    \n",
  "-One\n-Two\n-Three\n    \n"
);

test(
  'end whitespace newline',
  "One\nTwo\nThree    \n",
  "-One\n-Two\n-Three    \n"
);

test(
  'start lines whitespace',
  "  One\n  Two\n  Three",
  "-  One\n-  Two\n-  Three"
);

/**
 * @param {string} description
 * @param {string} input
 * @param {string} expected
 * @returns {void}
 */
function test(description, input, expected) {
  const result = indent(input, IDENT);
  if (result === expected)
    console.log(`PASS: ${description}`);
  else
    console.error(`FAIL: ${description}. Expected ${JSON.stringify(expected)}, Got ${JSON.stringify(result)}`);
}
