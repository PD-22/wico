import assert from "assert";
import delay from "../../debug/delay.js";
import simpleAssert from "../../debug/simpleAssert.js";

(async () => {
    const ms = 300;
    const startTime = performance.now();
    await delay(ms);
    const deltaTime = performance.now() - startTime;
    simpleAssert(() => assert.ok(deltaTime >= ms, `Expected delay of at least ${ms} ms`));
})();
