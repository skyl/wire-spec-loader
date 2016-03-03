var esprima = require('esprima');
var escodegen = require('escodegen');
var _ = require('underscore');

var analyzeCode = require('../../assets/analyzeCode');
var traverse = require('../../assets/traverse');
var addImport = require('../../assets/addImport');
var wrapInModuleExportExpression = require('../../assets/wrapInModuleExportExpression');

function parse(resolver, facet, wire) {
    var target = facet.target;
    var raw = target.raw
    resolver.resolve(_.extend(target, {ast: esprima.parse(raw)}));
}

function wrapInExport(resolver, facet, wire) {
    var target = facet.target;
    var ast = target.ast;
    var obj = analyzeCode(ast, traverse);

    resolver.resolve(_.extend(target, 
        {  
            ast: wrapInModuleExportExpression(obj.specComponents),
            imports: obj.imports
        }
    ));
}

function addImports(resolver, facet, wire) {
    var target = facet.target;
    var ast = target.ast;
    var imports = target.imports;

    function addImportsToAst(ast, imports) {
        _.each(imports, function(obj) {
            addImport(ast, obj.name, obj.path);
        })
    }

    addImportsToAst(ast, imports);
    resolver.resolve(_.extend(target, {ast: ast}));
}

function generate(resolver, facet, wire) {
    var target = facet.target;
    var ast = target.ast;
    resolver.resolve(_.extend(target, {result: escodegen.generate(ast)}));
}

module.exports = function(options) {
    return {
        facets: {
            parse: {
                'configure:before': parse
            },
            wrapInExport: {
                'configure:after': wrapInExport
            },
            addImports: {
                'ready:before': addImports
            },
            generate: {
                'ready': generate
            }
        }
    }
}