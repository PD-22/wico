import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function getDirname(importMetaUrl) {
    return dirname(fileURLToPath(importMetaUrl));
}
