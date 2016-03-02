var _ = require('underscore');
var normalize = require('./normalize');

module.exports = function importModules(source) {

    var regex = /<-\s+?([.\/a-zA-Z0-9]+)/g;
    var matches, result = [];
 
    matches = source.match(regex);

    if(matches) {
        result = matches.map(function(str){
            var path = str.replace(/\s+/g, '').replace(/<-/, '');
            return {
                name: normalize(_.last(path.split('/'))) + _.uniqueId(),
                path: path
            }
        });
    }

    return result;
}