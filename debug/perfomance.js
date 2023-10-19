export function logDeltaTime(callback) {
    return (...args) => {
        console.log(`${callback.name}...`);
        const [deltaTime, result] = getDeltaTime(callback.bind(null, ...args));
        console.log(`${callback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

export function logDeltaTimeAsync(asyncCallback) {
    return async (...args) => {
        console.log(`${asyncCallback.name}...`);
        const [deltaTime, result] = await getDeltaTimeAsync(asyncCallback.bind(null, ...args));
        console.log(`${asyncCallback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

export function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

export async function getDeltaTimeAsync(asyncCallback) {
    const startTime = performance.now();
    const result = await asyncCallback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}
