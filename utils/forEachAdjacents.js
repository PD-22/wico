/**
 * @example
 * forEachAdjacents([5, 6, 7, 8, 9], (v1, v2, i1, i2) => {
 *     if (v1 + v2 === 15) console.log(v1, v2, i1, i2); // 7 8 2 3
 * });
 */
export default function forEachAdjacents(array, callback) {
    return array.forEach((v2, i2) => {
        if (i2 === 0) return;
        const i1 = i2 - 1;
        const v1 = array[i1];
        return callback(v1, v2, i1, i2, array);
    });
}
