/**
 * @param {number} total
 * @param {number} width
 * @returns {{ increment: () => void; }}
 */
export default function createProgressBar(total, width) {
    let completed = 0;
    let prevProgressWidth = -1;
    let overflow = false;

    return { increment };

    function increment() {
        if (overflow) return;
        completed++;

        if (completed > total) {
            overflow = true;
            console.warn('Progress bar overflow!\n');
            return;
        }

        const progressWidth = Math.floor(completed * width / total);

        if (progressWidth === prevProgressWidth) return;

        process.stdout.write(
            `\rProgress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`
        );

        prevProgressWidth = progressWidth;

        if (completed === total) process.stdout.write(`\n`);
    }
}
