import { writeFileSync } from "fs";

export default function writeResult(file, data) {
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, data);
    console.log('Done\n');
}
