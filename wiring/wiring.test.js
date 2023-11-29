import { join } from "path";
import getDirname from "../debug/getDirname.js";
import testWiring from "./testWiring.js";

const DIRNAME = getDirname(import.meta.url);

testWiring(
    {
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
    join(DIRNAME, 'wiring.txt'),
    join(DIRNAME, 'wiring copy.txt'),
);
