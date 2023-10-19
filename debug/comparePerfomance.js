export default function comparePerfomance(time1, time2) {
    const total = time1 + time2;
    const diff = time1 - time2;
    const relDiff = Math.sign(diff) * Math.abs(diff) / total;

    console.log(`Total: ${total.toFixed(2)} ms`);
    console.log(`Diff: ${diff.toFixed(2)} ms`);
    console.log(`Relative diff: ${(100 * relDiff).toFixed(2)}%\n`);
}
