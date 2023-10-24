export default function createNumSequence(startNum, length) {
    return Array.from({ length }, (_, i) => startNum + i);
}
