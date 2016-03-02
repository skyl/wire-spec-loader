var esprima = require('esprima');

function parse(resolver, compDef, wire) {
    wire(compDef.options).then(function(source){
        resolver.resolve(esprima.parse(source));
    })
}

function recordImports(resolver, facet, wire) {
    resolver.resolve(facet.target);
}

module.exports = function(options) {
    return {
        factories: {
            parse: parse 
        },
        facets: {
            recordImports: {
                'configure:before': recordImports
            }
        }
    }
}