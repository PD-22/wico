/**
 * @template Value
 * @param {Value[]} array 
 * @param {(v1: Value, v2: Value, i1: number, i2: number, array: Value[]) => void} callback 
 * @returns {void}
 */
export default function forEachAdjacents(array, callback) {
    return array.forEach((v2, i2) => {
        if (i2 === 0) return;
        const i1 = i2 - 1;
        const v1 = array[i1];
        return callback(v1, v2, i1, i2, array);
    });
}
