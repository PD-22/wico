export default function compareFileContents(fileContent1, fileContent2) {
    return normalizeEOL(fileContent1) === normalizeEOL(fileContent2);

    function normalizeEOL(str) {
        return str.replace(/\r\n|\r|\n/g, '\n');
    }
}
