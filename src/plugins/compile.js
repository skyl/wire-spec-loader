var coffee = require('coffee-script');

function compile(resolver, compDef, wire) {
    resolver.resolve({
        raw: coffee.compile(compDef.options, {bare: true}),
        ast: null
    });
}

module.exports = function(options) {
    return {
        factories: {
            compile: compile 
        }
    }
}