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
var esprimaPlugin = require('./plugins/esprima/parse');
var escodegenPlugin = require('./plugins/esprima/codegen');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var callback = this.async();

    wire({
        $plugins: [
            compilationPlugin,
            translatePlugin,
            esprimaPlugin,
            escodegenPlugin
        ],
        source: {
            compile: source,
            translate: {
                reference: true
            }
        },
        // ast: {
        //     parse: {$ref: 'source'},
        //     recordImports: {}
        // },
        // code: {
        //     generate: {$ref: 'ast'}
        // }
    })
    .then(function(context){
        console.log("context::::", context.source);
        callback(null, context.source);
    })
    .otherwise(function(error){
        console.error("ERROR:::", error);
        callback(error);
    });

    return;
    // -------------

    var result = coffee.compile(source, {bare: true});

    result = replaceReference(result)

    var pendingImports = [];

    function addImports(ast) {
        _.each(pendingImports, function(obj) {
            addImport(ast, obj.name, obj.path);
        })
    }

    var specComponents = analyzeCode(esprima.parse(result), traverse, pendingImports);

    var ast = wrapInModuleExportExpression(specComponents);
    addImports(ast);

    result = escodegen.generate(ast);

    return result;
};