import assert from "assert";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import assertFileContent from "../../debug/assertFileContent.js";
import captureConsole from "../../debug/captureConsole.js";
import simpleAssert from "../../debug/simpleAssert.js";
import writeOutput from "../../debug/writeOutput.js";

const content = 'Lorem ipsum dolor';
const file = path.join(tmpdir(), 'temp.txt');
writeFileSync(file, content, 'utf8');

const [logs] = captureConsole(() =>
    writeOutput(file, content)
);
const expectedLogs = [`Writing output to "${file}"...`, 'DONE'];

simpleAssert(() => {
    assertFileContent(file, content);
    assert.deepStrictEqual(logs, expectedLogs);
});
