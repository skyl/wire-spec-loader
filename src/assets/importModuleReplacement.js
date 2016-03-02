module.exports = function importModuleReplacement(source) {

    var regex = /<-\s+?([.\/a-zA-Z0-9]+)/g;
    var matches, result = [];
 
    matches = source.match(regex);

    var result = matches.map(function(str){
        return str.replace(/\s+/g, '').replace(/<-/, '');
    });

    return result;
}