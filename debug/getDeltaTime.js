/**
 * @template T
 * @param {() => T} callback
 * @returns {[number, T]}
 */
export default function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}
