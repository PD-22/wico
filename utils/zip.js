export default function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const zipped = [];

    for (let i = 0; i < maxLength; i++)
        zipped.push(arrays.map(arr => arr[i]));

    return zipped;
}
