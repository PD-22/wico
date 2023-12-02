import assert from "assert";
import captureConsole from "../debug/captureConsole.js";
import simpleAssert from "../debug/simpleAssert.js";
import simulateProgress from "../debug/simulateProgress.js";

(async () => {
    console.log("Simulating progress...");
    const progress = await simulateProgress(20, 20, 50);

    const expected = "Progress bar overflow!" + "\n";
    const captured = captureConsole(() => progress.increment())[0];
    simpleAssert(() => assert.deepStrictEqual(captured, expected));
})();
