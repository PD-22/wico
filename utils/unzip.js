export default function unzip(zippedArray) {
    const maxLength = Math.max(...zippedArray.map(arr => arr.length));
    const unzipped = [];

    for (let i = 0; i < maxLength; i++) {
        unzipped.push(zippedArray.map(arr => (i < arr.length ? arr[i] : undefined)));
    }

    return unzipped;
}
