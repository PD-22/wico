import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import createProgressBar from "../../debug/createProgressBar.js";
import normalizeEOL from "../../debug/normalizeEOL.js";
import simpleAssert from "../../debug/simpleAssert.js";

const total = 5;
const width = 10;
const delay = () => new Promise(resolve => setTimeout(resolve, 50));
const expected = `
Progress: [==        ]
Progress: [====      ]
Progress: [======    ]
Progress: [========  ]
Progress: [==========]
Progress bar overflow!
`;

(async () => {
    const captured = await captureConsole(async () => {
        const progress = createProgressBar(total, width);
        await delay(); progress.increment();
        await delay(); progress.increment();
        await delay(); progress.increment();
        await delay(); progress.increment();
        await delay(); progress.increment();
        await delay(); progress.increment();
    });

    simpleAssert(() => assert.deepStrictEqual(normalizeEOL(captured.join('')), expected));
})();
