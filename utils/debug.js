const fs = require('fs');
const { compareFileContents } = require('./general');

function createProgressBar(total, width) {
    let completed, prevProgressWidth, overflow;

    init();

    return { increment, reset };

    function increment() {
        if (overflow) return;
        completed++;

        if (completed > total) {
            overflow = true;
            console.warn('Progress bar overflow!\n');
            return;
        }

        const progressWidth = Math.floor(completed * width / total);

        if (progressWidth === prevProgressWidth) return;

        process.stdout.write(`\rProgress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`);

        prevProgressWidth = progressWidth;

        if (completed === total) process.stdout.write(`\n`);
    }

    function reset() {
        init();
    }

    function init() {
        completed = 0;
        prevProgressWidth = -1;
        overflow = false;
    }
}

function logDeltaTime(callback) {
    return (...args) => {
        console.log(`${callback.name}...`);
        const [deltaTime, result] = getDeltaTime(callback.bind(null, ...args));
        console.log(`${callback.name}(${deltaTime.toFixed()} ms)`);
        return result;
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

function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

async function getDeltaTimeAsync(asyncCallback) {
    const startTime = performance.now();
    const result = await asyncCallback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

async function compareDataToFile(data, compareFile) {
    try {
        const backupData = fs.readFileSync(compareFile, 'utf8');
        const matches = compareFileContents(backupData, data);
        console.log(`File content matches: ${matches}`);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log('File not found:', compareFile);
    }
}

function comparePerfomance(time1, time2) {
    const total = time1 + time2;
    const diff = time1 - time2;
    const relDiff = Math.sign(diff) * 100 * 2 * Math.abs(diff) / total;

    console.log(`Total: ${total.toFixed(2)} ms`);
    console.log(`Diff: ${diff.toFixed(2)} ms`);
    console.log(`Relative diff: ${relDiff.toFixed(2)}%`);
    console.log();
}

module.exports = {
    createProgressBar,
    logDeltaTime,
    logDeltaTimeAsync,
    getDeltaTime,
    getDeltaTimeAsync,
    compareDataToFile,
    comparePerfomance
};
