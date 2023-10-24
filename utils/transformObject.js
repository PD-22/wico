import mapObject from "./mapObject.js";

export default function transformObject(obj, callbackfn) {
    return Object.fromEntries(mapObject(obj, callbackfn));
}
