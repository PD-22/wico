import simpleAssert from "../debug/simpleAssert.js";
import simulateProgress from "../debug/simulateProgress.js";

(async () => {
    console.log("Simulating progress...");
    await simulateProgress(20, 20, 50);
    simpleAssert(() => { });
})();
