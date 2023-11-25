/**
 * @template T
 * @param {() => T} callback
 * @returns {[number, T]}
 * 
 * @example
 * const [deltaTime, result] = getDeltaTime(() => {
 *     let sum = 0;
 *     for (let i = 0; i < 100000000; i++) sum += i;
 *     return sum;
 * });
 * console.log(deltaTime.toFixed(), result); // 4999999950000000 114
 */
export default function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}
