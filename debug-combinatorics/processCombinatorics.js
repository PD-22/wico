import { getDeltaTime } from "../debug/perfomance.js";
import createProgressBar from '../debug/createProgressBar.js';
import { PROGRESS_BAR_WIDTH } from "./testCombinatorics.js";

export default function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);
    const progressBar = createProgressBar(inputs.length, PROGRESS_BAR_WIDTH);
    const [deltaTime, outputList] = getDeltaTime(() => inputs.map(input => {
        const result = getCombinatoricsCallback(input);
        progressBar.increment();
        return result;
    })
    );

    console.log(`${deltaTime.toFixed()} ms\n`);
    return outputList;
}
