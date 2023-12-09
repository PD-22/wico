/**
 * @typedef {unknown[]} Logs
 */

/**
 * @template T
 * @typedef {[Logs, T]} LogsAndResult
 */

/**
 * @template T
 * @overload
 * @param {() => Promise<T>} callback
 * @returns {Promise<LogsAndResult<T>>}
 */

/**
 * @template T
 * @overload
 * @param {() => T} callback
 * @returns {LogsAndResult<T>}
 */

/**
 * @template T
 * @param {(() => Promise<T>) | (() => T)} callback
 * @returns {Promise<LogsAndResult<T>> | LogsAndResult<T>}
 */
export default function captureConsole(callback) {
    /** @type {Logs} */
    const logs = [];

    const log = console.log;
    const error = console.error;
    const info = console.info;
    const warn = console.warn;
    const write = process.stdout.write;

    console.log = (...args) => logs.push(...args);
    console.error = (...args) => logs.push(...args);
    console.info = (...args) => logs.push(...args);
    console.warn = (...args) => logs.push(...args);
    process.stdout.write = (...args) => { logs.push(...args); return false; };

    const resultOrPromise = callback();

    const onfinally = () => {
        console.log = log;
        console.error = error;
        console.info = info;
        console.warn = warn;
        process.stdout.write = write;
    };

    if (resultOrPromise instanceof Promise) {
        return resultOrPromise
            .then(/** @returns {LogsAndResult<T>} */result => [logs, result])
            .finally(onfinally);
    }

    onfinally();
    return [logs, resultOrPromise];
}
