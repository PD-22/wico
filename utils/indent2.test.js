import indent from "./indent.js";

test('easy', '-',
    `One
Two
Three`,
    `-One
-Two
-Three`
);

test('newline middle', '-',
    `One

Two
Three`,
    `-One

-Two
-Three`
);

test('double newline middle', '-',
    `One


Two
Three`,
    `-One


-Two
-Three`
);

test('start newline', '-',
    `
One
Two
Three`,
    `
-One
-Two
-Three`
);

test('start newline whitespace', '-',
    `    
One
Two
Three`,
    `    
-One
-Two
-Three`
);

test('start newline whitespace newline', '-',
    `    

One
Two
Three`,
    `    

-One
-Two
-Three`
);

test('start whitespace newline', '-',
    `    
One
Two
Three`,
    `    
-One
-Two
-Three`
);

test('end newline', '-',
    `One
Two
Three
`,
    `-One
-Two
-Three
`
);

test('end newline whitespace', '-',
    `One
Two
Three
    `,
    `-One
-Two
-Three
    `
);

test('end newline whitespace newline', '-',
    `One
Two
Three
    
`,
    `-One
-Two
-Three
    
`
);

test('end whitespace newline', '-',
    `One
Two
Three    
`,
    `-One
-Two
-Three    
`
);

test('start lines whitespace', '-',
    `  One
  Two
  Three`,
    `-  One
-  Two
-  Three`
);

function test(description, indentation, input, expected) {
    const result = indent(input, indentation);
    if (result === expected) return;
    console.error(`Fail: Expected ${JSON.stringify(expected)}, Got ${JSON.stringify(result)} in "${description}"`);
}
