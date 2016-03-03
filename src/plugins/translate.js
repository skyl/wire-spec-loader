var replaceReference = require('../assets/replaceReference');
var _ = require('underscore');

function translate(resolver, facet, wire) {
    var target = facet.target;
    var raw = target.raw
    if(facet.options.reference) {
        raw = replaceReference(raw);
    }
    resolver.resolve(_.extend(target, {raw: raw}));
}

module.exports = function(options) {
    return {
        facets: {
            translate: {
                'create:after': translate
            }
        }
    }
}