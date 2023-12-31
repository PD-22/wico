/**
 * @param {string} text 
 * @param {string} indentation 
 * @returns {string}
 */
export default function indent(text, indentation = '  ') {
    return text.replaceAll(
        /(^|\n)(?=.*?\S.*?(\n|$))/g,
        (_match, newline) => (newline ? '\n' : '') + indentation
    );
}
