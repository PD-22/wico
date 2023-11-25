/**
 * @example
 * indent("A\nB\nC", '-'); // "-A\n-B\n-C"
 */
export default function indent(text, indentation = '  ') {
    return text.replaceAll(
        /(^|\n)(?=.*?\S.*?(\n|$))/g,
        (_match, newline) => (newline ? '\n' : '') + indentation
    );
}
