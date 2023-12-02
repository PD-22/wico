/**
 * @param {() => Promise<unknown>} callback
 * @returns {Promise<unknown[]>}
 */
export default async function captureConsoleAsync(callback) {
    /** @type {unknown[]} */
    const capturedLogs = [];

    const consoleLog = console.log;
    const consoleError = console.error;
    const consoleInfo = console.info;
    const consoleWarn = console.warn;
    const processStdoutWrite = process.stdout.write;

    console.log = (...args) => capturedLogs.push(...args);
    console.error = (...args) => capturedLogs.push(...args);
    console.info = (...args) => capturedLogs.push(...args);
    console.warn = (...args) => capturedLogs.push(...args);
    process.stdout.write = (...args) => {
        capturedLogs.push(...args);
        return false;
    };

    try {
        await callback();
    } finally {
        console.log = consoleLog;
        console.error = consoleError;
        console.info = consoleInfo;
        console.warn = consoleWarn;
        process.stdout.write = processStdoutWrite;
    }

    return capturedLogs;
}
