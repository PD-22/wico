import { AssertionError } from "assert";

/** @param {() => void} assertCallback */
export default function simpleAssert(assertCallback) {
    try {
        assertCallback();
        console.log('PASS');
    } catch (error) {
        if (error instanceof AssertionError) {
            console.error(`FAIL: ${error.message}`)
        } else {
            console.error(error);
        }
    }
}
