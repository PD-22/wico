import { writeFileSync } from "fs";

/**
 * @param {string} output
 * @param {import("fs").PathLike} file
 */
export default function writeOutput(file, output) {
    console.log(`Writing output to "${file}"...`);
    writeFileSync(file, output);
    console.log(`DONE`);
}
