import { readFileSync } from "fs";
import compareFileContents from "../utils/compareFileContents.js";

/**
 * @param {string} data
 * @param {import("fs").PathOrFileDescriptor} compareFile
 * @throws {Error}
 */
export default async function compareDataToFile(data, compareFile) {
    try {
        console.log(`Compare data to "${compareFile}"...`);
        const backupData = readFileSync(compareFile, 'utf8');
        const matches = compareFileContents(backupData, data);
        console.log(`File content matches: ${matches}`);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log(`File not found: "${compareFile}`);
    }
}
