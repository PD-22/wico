import { join } from "path";
import { getDirname } from "../utils/debug.js";
import { testWiring } from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

testWiring({
    wiringSettings: [
        {
            name: "aux",
            points: "mrlg".split(""),
            wires: "blue red green copper".split(" "),
        },
        {
            name: "sound",
            points: "rgl".split(""),
            wires: "red copper green".split(" "),
        }
    ],
    outputFile: join(DIRNAME, 'output.txt'),
    outputCompareFile: join(DIRNAME, 'output copy.txt'),
});
