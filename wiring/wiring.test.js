import { join } from "path";
import getDirname from "../debug/getDirname.js";
import testWiring from "./testWiring.js";

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
    outputFile: join(DIRNAME, 'wiring.txt'),
    outputCompareFile: join(DIRNAME, 'wiring copy.txt'),
});
