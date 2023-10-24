export default function mapObject(obj, callbackfn) {
    return Object.entries(obj).map(([k, v], i) => callbackfn(v, k, i, obj));
}
