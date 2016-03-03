var esprima = require('esprima');
var _ = require('underscore');

var analyzeCode = require('../../assets/analyzeCode');
var traverse = require('../../assets/traverse');
var wrapInModuleExportExpression = require('../../assets/wrapInModuleExportExpression');

function parse(resolver, facet, wire) {
    var target = facet.target;
    var raw = target.raw
    resolver.resolve(_.extend(target, {ast: esprima.parse(raw)}));
}

function wrapInExport(resolver, facet, wire) {
    var target = facet.target;
    var ast = target.ast;
    var pendingImports = [];
    var specComponents = analyzeCode(ast, traverse, pendingImports);
    resolver.resolve(_.extend(target, 
        {ast: wrapInModuleExportExpression(specComponents)}
    ));
}

function addImports(resolver, facet, wire) {
    var target = facet.target;
    var ast = target.ast;
    resolver.resolve(target);
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
            }
        }
    }
}