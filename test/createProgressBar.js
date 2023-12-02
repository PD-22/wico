import assert from "assert";
import captureConsoleAsync from "../debug/captureConsoleAsync.js";
import simpleAssert from "../debug/simpleAssert.js";
import simulateProgress from "../debug/simulateProgress.js";
import normalizeEOL from "../utils/normalizeEOL.js";

const total = 20;
const width = 20;
const interval = 50;
const expected = `
Progress: [=                   ]
Progress: [==                  ]
Progress: [===                 ]
Progress: [====                ]
Progress: [=====               ]
Progress: [======              ]
Progress: [=======             ]
Progress: [========            ]
Progress: [=========           ]
Progress: [==========          ]
Progress: [===========         ]
Progress: [============        ]
Progress: [=============       ]
Progress: [==============      ]
Progress: [===============     ]
Progress: [================    ]
Progress: [=================   ]
Progress: [==================  ]
Progress: [=================== ]
Progress: [====================]
Progress bar overflow!
`;

(async () => {
    const captured = await captureConsoleAsync(async () => {
        const progress = await simulateProgress(total, width, interval);
        progress.increment();
    });

    simpleAssert(() => assert.deepStrictEqual(normalizeEOL(captured.join('')), expected));
})();
