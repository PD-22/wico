export default function createCharSequence(startChar, length) {
    return Array.from({ length }, (_, i) => String.fromCharCode(startChar.charCodeAt(0) + i));
}
