var escodegen = require('escodegen');

function generate(resolver, compDef, wire) {
    wire(compDef.options).then(function(ast){
        resolver.resolve(escodegen.generate(ast));
    })
}

module.exports = function(options) {
    return {
        factories: {
            generate: generate
        }
    }
}