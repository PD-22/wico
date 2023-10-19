import createProgressBar from "./createProgressBar.js";

testProgressBar();

function simulateProgress(progressBar, totalSteps, interval) {
    let currentStep = 0;

    const progressInterval = setInterval(() => {
        if (currentStep < totalSteps) {
            progressBar.increment();
            currentStep++;
        } else {
            clearInterval(progressInterval);
        }
    }, interval);
}

function testProgressBar() {
    const totalSteps = 20;
    const progressBarWidth = 20;
    const progressBar = createProgressBar(totalSteps, progressBarWidth);

    console.log('Simulating progress:');
    simulateProgress(progressBar, totalSteps, 50);
}
