function generate(resolver, compDef, wire) {
    resolver.resolve();
}

module.exports = function(options) {
    return {
        factories: {
            generate: generate 
        },
        facets: {
            
        }
    }
}