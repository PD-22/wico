/**
 * @overload
 * @param {() => Promise<unknown>} callback
 * @returns {Promise<unknown[]>}
 */

/**
 * @overload @param {() => unknown} callback
 * @returns {unknown[]}
 */

/**
 * @param {(() => Promise<unknown>) | (() => unknown)} callback
 * @returns {Promise<unknown[]> | unknown[] }
 */
export default function captureConsole(callback) {
    /** @type {Promise<unknown[]> | unknown[]} */
    const result = [];

    const log = console.log;
    const error = console.error;
    const info = console.info;
    const warn = console.warn;
    const write = process.stdout.write;

    console.log = (...args) => result.push(...args);
    console.error = (...args) => result.push(...args);
    console.info = (...args) => result.push(...args);
    console.warn = (...args) => result.push(...args);
    process.stdout.write = (...args) => { result.push(...args); return false; };

    const maybePromise = callback();

    const onfinally = () => {
        console.log = log;
        console.error = error;
        console.info = info;
        console.warn = warn;
        process.stdout.write = write;
    };

    if (maybePromise instanceof Promise) return maybePromise.then(() => result).finally(onfinally);

    onfinally();
    return result;
}
