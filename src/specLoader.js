var coffee = require('coffee-script');

var defaultModuleRegex = /\.(module|create)$/;
var defaultSpecRegex = /\.(wire\.spec|wire)$/;
var removeCommentsRx = /\/\*[\s\S]*?\*\//g;
var replaceIdsRegex = /(\bdefine)\s*\(\s*(?:\s*'([^']*)'|"([^"]*)"\s*,)?(?:\s*\[([^\]]*)\]\s*,)?/;

function scanObj(obj, path) {
    // Scan all keys.  This might be the spec itself,
    // or any sub-object-literal in the spec.
    for (var name in obj) {
        scanItem(obj[name], createPath(path, name));
    }
}

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var result = coffee.compile(source);
    // result = 'module.exports = ' + result;

    result.replace(removeCommentsRx, '')
        .replace(replaceIdsRegex, function (m, def, mid1, mid2, depIds) {
            console.log(m, def, mid1, mid2, depIds);
        });
    return result;
};