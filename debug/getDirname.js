import { dirname } from 'path';
import { fileURLToPath } from 'url';

// returns location of current file
// requires import.meta.url of the file
export default function getDirname(importMetaUrl) {
    return dirname(fileURLToPath(importMetaUrl));
}
