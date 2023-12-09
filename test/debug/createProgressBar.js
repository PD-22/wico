import assert from "assert";
import captureConsole from "../../debug/captureConsole.js";
import createProgressBar from "../../debug/createProgressBar.js";
import delay from "../../debug/delay.js";
import simpleAssert from "../../debug/simpleAssert.js";

const total = 5;
const width = 10;
const expectedLogs = [
    "\rProgress: [==        ]",
    "\rProgress: [====      ]",
    "\rProgress: [======    ]",
    "\rProgress: [========  ]",
    "\rProgress: [==========]",
    "\n",
    "Progress bar overflow!\n",
];

(async () => {
    const [logs] = await captureConsole(async () => {
        const progress = createProgressBar(total, width);
        for (let i = 0; i < 6; i++) await delay(50).then(progress.increment);
    });

    simpleAssert(() => assert.deepStrictEqual(logs, expectedLogs));
})();
