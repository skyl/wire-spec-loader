var esprima = require('esprima');
var _ = require('underscore');

function parse(resolver, facet, wire) {
    var target = facet.target;
    var raw = target.raw
    resolver.resolve(_.extend(target, {ast: esprima.parse(raw)}));
}

function recordImports(resolver, facet, wire) {
    resolver.resolve(facet.target);
}

module.exports = function(options) {
    return {
        facets: {
            parse: {
                'ready:before': parse
            },
            recordImports: {
                'configure:before': recordImports
            }
        }
    }
}