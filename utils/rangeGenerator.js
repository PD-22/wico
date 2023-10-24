export default function* rangeGenerator(start, end, step = 1) {
    for (let i = start; i <= end; i += step) yield i;
}
