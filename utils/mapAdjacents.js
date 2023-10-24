import forEachAdjacents from "./forEachAdjacents";

export default function mapAdjacents(array, callback) {
    const result = Array(array.length - 1);

    forEachAdjacents(array, (v1, v2, i1, i2) => {
        result[i1] = callback(v1, v2, i1, i2, array);
    });

    return result;
}
