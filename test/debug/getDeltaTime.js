import assert from "assert";
import getDeltaTime from "../../debug/getDeltaTime.js";
import simpleAssert from "../../debug/simpleAssert.js";

const [deltaTime, result] = getDeltaTime(() => {
    for (let i = 0; i < 1_000_000; i++) { }
    return "MOCK_RESULT";
});

simpleAssert(() => {
    assert.strictEqual(result, "MOCK_RESULT");
    assert.ok(deltaTime >= 0, "Delta time should be greater than or equal to 0");
})
