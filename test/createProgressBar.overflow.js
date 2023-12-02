import simulateProgress from "../debug/simulateProgress.js";

(async () => {
    console.log("Simulating progress...");
    const progress = await simulateProgress(20, 20, 50);
    console.log(`Should print: ${JSON.stringify("Progress bar overflow!")}`);
    progress.increment();
})();
