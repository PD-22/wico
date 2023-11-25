/**
 * @example
 * countListDiff([1, 2, 3, 4, 5], [1, 2, 0, 0, 5]); // 2
 */
export default function countListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}
