import assert from "assert";
import { readFileSync } from "fs";
import normalizeEOL from "../utils/normalizeEOL.js";

/**
 * @param {import("fs").PathLike} actualFile
 * @param {string} expectedContent
 * @throws {Error}
 */
export default async function assertFileContent(actualFile, expectedContent) {
    console.log(`Assert file Content "${actualFile}"...`);
    const actualContent = readFileSync(actualFile, 'utf8');
    const match = normalizeEOL(actualContent) === normalizeEOL(expectedContent);
    assert.ok(match, "File content does not match");
    console.log(`PASS`);
}
