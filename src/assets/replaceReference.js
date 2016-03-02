module.exports = function replaceReference(source) {
    var refRegex = /~\s?([a-zA-Z0-9]+)/g;

    return source.replace(refRegex, function(m, reference) {
        return "{$ref: '" + reference + "'}";
    });
}