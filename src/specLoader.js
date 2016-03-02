var coffee = require('coffee-script');
var esprima = require('esprima');
var escodegen = require('escodegen');
var _ = require('underscore');

var traverse = require('./assets/traverse');
var analyzeCode = require('./assets/analyzeCode');
var addImport = require('./assets/addImport');
var replaceReference = require('./assets/replaceReference');
var wrapInModuleExportExpression = require('./assets/wrapInModuleExportExpression');

module.exports = function(source) {
    this.cacheable && this.cacheable();
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