export function getArrayOrDictCombinatorics(arrays, processArray, processDict) {
    const isArray = Array.isArray(arrays);
    const callback = isArray ? processArray : processDict;
    return callback(arrays);
}
