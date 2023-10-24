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

function test(name, indentation, input, shouldBe) {
    const data = indent(input, indentation);
    if (data === shouldBe) {
        console.log(`TEST: "${name}": SUCCESS`);
    } else {
        console.error(`TEST: "${name}": FAILURE:\n  got:\n\`${data}\`\n  expected:\n\`${shouldBe}\``);
    }
}
