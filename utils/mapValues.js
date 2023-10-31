export default function mapValues(object, callback) {
    return Object.fromEntries(Object.entries(object).map(([key, value], index) =>
        [key, callback(value, key, index, object)]
    ));
}
