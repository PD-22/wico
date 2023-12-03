import assert, { AssertionError } from "assert";
import { readFileSync } from "fs";
import normalizeEOL from "../utils/normalizeEOL.js";

/**
 * @param {import("fs").PathLike} actualFile
 * @param {string} expectedContent
 * @throws {AssertionError}
 */
export default function assertFileContent(actualFile, expectedContent) {
    const actualContent = readFileSync(actualFile, 'utf8');
    const match = normalizeEOL(actualContent) === normalizeEOL(expectedContent);
    assert.ok(match, "File content does not match");
}
