/** @typedef {() => Promise<unknown>} PF */
/** @typedef {Promise<R>} PR */
/** @overload @param {PF} callback @returns {PR} */

/** @typedef {() => unknown} F */
/** @typedef {unknown[]} R */
/** @overload @param {F} callback @returns {R} */

/**
 * @param {PF | F} callback
 * @returns {PR | R }
 */
export default function captureConsole(callback) {
    /** @type {PR | R} */
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
