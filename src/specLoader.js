var _ = require('underscore');
var wire = require('essential-wire');

var compilationPlugin = require('./plugins/compile');
var translatePlugin = require('./plugins/translate');
var esprimaPlugin = require('./plugins/esprima');

function run(source, callback, options) {
    wire({
        $plugins: [
            compilationPlugin,
            translatePlugin,
            esprimaPlugin
        ],
        source: {
            compile: source,
            translate: {
                reference: true,
                importReference: true
            },
            parse: {},
            analizeAst: {
                markup: options.markup,
                componentsDir: options.componentsDir
            },
            addImports: {},
            generate: {}
        }
    })
    .then(function(context){
        // console.log("context.source.result:::::", context.source.result);
        callback(null, context.source.result);
    })
    .otherwise(function(error){
        callback(error);
    });
}

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var callback = this.async();
    var options = {};

    // TODO: strange, this.query - '?markup=.....'
    // hack:
    var queries = this.query.slice(1);

    if(typeof queries !== 'undefined'){
        queries = queries.split('&');
        _.each(queries, function(query){
            var arr = query.split('=');
            options[arr[0]] = arr[1];
        });
    }

    run(source, callback, options);
};