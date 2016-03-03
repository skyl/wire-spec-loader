var coffee = require('coffee-script');
var esprima = require('esprima');
var escodegen = require('escodegen');
var _ = require('underscore');

var traverse = require('./assets/traverse');
var analyzeCode = require('./assets/analyzeCode');
var addImport = require('./assets/addImport');
var replaceReference = require('./assets/replaceReference');
var wrapInModuleExportExpression = require('./assets/wrapInModuleExportExpression');

var wire = require('essential-wire');

var compilationPlugin = require('./plugins/compile');
var translatePlugin = require('./plugins/translate');
var esprimaPlugin = require('./plugins/esprima');

function run(source, callback) {
    wire({
        $plugins: [
            compilationPlugin,
            translatePlugin,
            esprimaPlugin
        ],
        source: {
            compile: source,
            translate: {
                reference: true
            },
            parse: {},
            wrapInExport: {},
            addImports: {},
            generate: {}
        }
    })
    .then(function(context){
        callback(null, context.source.result);
    })
    .otherwise(function(error){
        callback(error);
    });
}

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var callback = this.async();
    run(source, callback);
};