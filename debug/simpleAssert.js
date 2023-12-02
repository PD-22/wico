import { AssertionError } from "assert";

/**
 * @param {() => void} assertCallback
 * @param {string} [text]
 * @returns {void}
 */
export default function simpleAssert(assertCallback, text) {
    const textAppend = text ? ': ' + text : '';
    try {
        assertCallback();
        console.log(`PASS${textAppend}`);
    } catch (error) {
        if (error instanceof AssertionError) {
            // TODO: add text
            console.error(`FAIL${textAppend}: ${error.message}`)
        } else {
            console.error(error);
        }
    }
}
