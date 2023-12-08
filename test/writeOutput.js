import assert from "assert";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import assertFileContent from "../debug/assertFileContent.js";
import captureConsole from "../debug/captureConsole.js";
import simpleAssert from "../debug/simpleAssert.js";
import writeOutput from "../debug/writeOutput.js";

const content = 'Lorem ipsum dolor';
const file = path.join(tmpdir(), 'temp.txt');
writeFileSync(file, content, 'utf8');

simpleAssert(() => {
    const captured = captureConsole(() => writeOutput(file, content));
    assertFileContent(file, content);
    assert.strictEqual(captured.join('\n'), `Writing output to "${file}"...\nDONE`);
});
