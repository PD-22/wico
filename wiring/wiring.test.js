import { join } from "path";
import getDirname from "../debug/getDirname.js";
import testWiring from "./utils/testWiring.js";

const DIRNAME = getDirname(import.meta.url);

testWiring({
    wiringSettings: {
        aux: {
            m: "blue",
            r: "red",
            l: "green",
            g: "copper"
        },
        sound: {
            r: "red",
            g: "copper",
            l: "green",
        }
    },
    outputFile: join(DIRNAME, 'output.txt'),
    outputCompareFile: join(DIRNAME, 'output copy.txt'),
});
