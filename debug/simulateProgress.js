import createProgressBar from "./createProgressBar.js";

/**
 * @param {number} total
 * @param {number} width
 * @param {number} interval
 * @returns {Promise<{ increment: (...args: unknown[]) => void; }>}
 */
export default function simulateProgress(total, width, interval) {
    return new Promise(resolve => {
        const progressBar = createProgressBar(total, width);
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            if (currentStep < total) {
                progressBar.increment();
                currentStep++;
            } else {
                clearInterval(progressInterval);
                resolve(progressBar);
            }
        }, interval);
    });
}
