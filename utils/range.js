export default function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) result.push(i);
    return result
}
