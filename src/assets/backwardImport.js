var _ = require('underscore');
var normalize = require('./normalize');

// TODO: optimize it!
module.exports = function backwardImport(raw) {

    var regex = /<-\s+?([.\/a-zA-Z0-9]+)/g;
    var matches, 
        imports = [];
 
    matches = raw.match(regex);

    if(matches) {
        imports = matches.map(function(str){
            var path = str.replace(/\s+/g, '').replace(/<-/, '');
            var name = normalize(_.last(path.split('/'))) + _.uniqueId();
            var regexBrackets = new RegExp('["\']' + str + '["\']', 'g');
            raw = raw.replace(regexBrackets, name);
            return {
                name: name,
                path: path
            }
        });
    }

    return {
        raw: raw,
        imports: imports
    };
}
