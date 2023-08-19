const fs = require('fs');
const { compareFileContents } = require('./general');

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

async function compareDataToFile(data, backupFile) {
    try {
        const backupData = fs.readFileSync(backupFile, 'utf8');
        const matches = compareFileContents(backupData, data);
        console.log(`File content matches: ${matches}`);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log('File not found:', backupFile);
    }
}

module.exports = {
    createProgressBar,
    logDeltaTime,
    logDeltaTimeAsync,
    getDeltaTime,
    getDeltaTimeAsync,
    compareDataToFile
};