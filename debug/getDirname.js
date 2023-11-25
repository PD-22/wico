import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * returns location of current file
 * 
 * @param {ImportMeta["url"]} importMetaUrl import.meta.url of the file
 * @returns {string} directory of the file
 * 
 * @example
 * getDirname(import.meta.url); // ...\wico\debug
 */
export default function getDirname(importMetaUrl) {
    return dirname(fileURLToPath(importMetaUrl));
}
