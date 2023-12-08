import assert from "assert";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import assertFileContent from "../../debug/assertFileContent.js";
import simpleAssert from "../../debug/simpleAssert.js";

const content = 'Lorem ipsum dolor';
const file = path.join(tmpdir(), 'temp.txt');
writeFileSync(file, content, 'utf8');

simpleAssert(() => {
    assertFileContent(file, content);
    assert.throws(() => assertFileContent(file, 'Unexpected content'));
});
