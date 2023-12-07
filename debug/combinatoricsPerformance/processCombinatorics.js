import createProgressBar from '../createProgressBar.js';
import getDeltaTime from "../getDeltaTime.js";

/**
 * @template T, V
 * @param {T[]} inputs
 * @param {(input: T) => V[][]} getCombinatoricsCallback
 * @returns {V[][][]}
 */
export default function processCombinatorics(inputs, getCombinatoricsCallback) {
    console.log(`${getCombinatoricsCallback.name}...`);

    const progressBar = createProgressBar(inputs.length, 20);
    const [deltaTime, outputList] = getDeltaTime(() => inputs.map(input => {
        const result = getCombinatoricsCallback(input);
        progressBar.increment();
        return result;
    }));

    console.log(`${deltaTime.toFixed()} ms`);
    return outputList;
}
