var coffee = require('coffee-script');

function compile(resolver, compDef, wire) {
    var result = coffee.compile(compDef.options, {bare: true});
    resolver.resolve(result);
}

module.exports = function(options) {
    return {
        factories: {
            compile: compile 
        },
        facets: {
            
        }
    }
}