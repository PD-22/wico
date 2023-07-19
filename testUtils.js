function createProgressBar(total, width) {
    let completed = 0;
    let prevProgressWidth = -1;

    return { increment };

    function increment() {
        completed++;
        const progressWidth = Math.floor((completed / total) * width);

        if (progressWidth === prevProgressWidth) return;

        process.stdout.write(`\rprogress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`);

        prevProgressWidth = progressWidth;

        if (completed === total) process.stdout.write(`\n`);
    };
}

function logDeltaTimeAsync(asyncCallback) {
    return async (...args) => {
        console.log(`${asyncCallback.name}...`);
        const [deltaTime, result] = await getDeltaTimeAsync(asyncCallback.bind(null, ...args));
        console.log(`${asyncCallback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

async function getDeltaTimeAsync(asyncCallback) {
    const startTime = performance.now();
    const result = await asyncCallback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

module.exports = {
    createProgressBar,
    logDeltaTimeAsync,
    getDeltaTimeAsync
};
