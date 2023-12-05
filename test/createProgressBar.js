import assert from "assert";
import captureConsole from "../debug/captureConsole.js";
import normalizeEOL from "../debug/normalizeEOL.js";
import simpleAssert from "../debug/simpleAssert.js";
import simulateProgress from "../debug/simulateProgress.js";

const total = 5;
const width = 10;
const interval = 50;
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
        const progress = await simulateProgress(total, width, interval);
        progress.increment();
    });

    simpleAssert(() => assert.deepStrictEqual(normalizeEOL(captured.join('')), expected));
})();
