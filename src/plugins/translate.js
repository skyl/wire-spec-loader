var replaceReference = require('../assets/replaceReference');
var backwardImport = require('../assets/backwardImport');
var _ = require('underscore');

function translate(resolver, facet, wire) {
    var target = facet.target;
    var raw = target.raw;
    var imports = [];
    if(facet.options.reference) {
        raw = replaceReference(raw);
    }
    if(facet.options.importReference) {
        var obj = backwardImport(raw);
        raw     = obj.raw;
        imports = obj.imports;
    }
    resolver.resolve(_.extend(target, {raw: raw, imports: imports}));
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