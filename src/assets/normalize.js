var _ = require('underscore');

module.exports = function normalize (str) {
    if(str.indexOf('.') != -1) {
        var arr = str.split('.');
        var firstFragment = arr.shift();
        _.last(arr) == 'coffee' || 'js' ? arr.pop() : void 0;
        return _.reduce(arr, function(res, current){
            return res += current.slice(0, 1).toUpperCase() + current.slice(1);
        }, firstFragment)
    } else {
        return str;
    }
}