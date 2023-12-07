import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import createProgressBar from "../../debug/createProgressBar.js";
import delay from "../../debug/delay.js";
import normalizeEOL from "../../debug/normalizeEOL.js";
import simpleAssert from "../../debug/simpleAssert.js";

const total = 5;
const width = 10;
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
        await delay(50); progress.increment();
        await delay(50); progress.increment();
        await delay(50); progress.increment();
        await delay(50); progress.increment();
        await delay(50); progress.increment();
        await delay(50); progress.increment();
    });

    simpleAssert(() => assert.deepStrictEqual(normalizeEOL(captured.join('')), expected));
})();
