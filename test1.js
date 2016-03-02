var coffee = require('coffee-script');
var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');
var _ = require('underscore');

var traverse = require('./src/assets/traverse');
var analyzeCode = require('./src/assets/analyzeCode');
var addImport = require('./src/assets/addImport');
var wrapInModuleExportExpression = require('./src/assets/wrapInModuleExportExpression');

var source = fs.readFileSync('./test/fixture/component.spec.coffee', 'utf-8');
var result = coffee.compile(source, {bare: true});

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

console.log(result);