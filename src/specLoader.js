var coffee = require('coffee-script');
var esprima = require('esprima');
var escodegen = require('escodegen');
var _ = require('underscore');

var imports = '';
var pendingImports = [];
var pendingPlugins = [];

var defaultSpecRegex = /\.(wire\.spec|wire)$/;
var removeCommentsRx = /\/\*[\s\S]*?\*\//g;


module.exports = function(source) {
    this.cacheable && this.cacheable();
    var result = coffee.compile(source, {bare: true});

    var specComponents = analyzeCode(result);

    var ast = wrapInModuleExportExpression(specComponents);
    addImports(ast);

    result = escodegen.generate(ast);

    console.log(result);

    return result;
};

function analyzeCode(code) {
    var ast = esprima.parse(code);

    var specComponents;
    traverse(ast, function(node) {
        if(node.type === 'ExpressionStatement' ){
            specComponents = node.expression.properties
            _.each(specComponents, function(component){
                if(component.value.type === 'ArrayExpression' && component.key.name === '$plugins'){
                    _.each(component.value.elements, function(element, index, elements){
                        var path = element.value;
                        var pluginName = _.last(path.split('/')) + _.uniqueId();
                        pendingImports.push({name: pluginName, path: path});
                        pendingPlugins.push({name: pluginName, path: path});
                        elements[index] = element;
                    });
                    
                    component.value.elements = [];
                    _.each(pendingPlugins, function(plugin){
                        component.value.elements.push({
                            type: "Identifier",
                            name: plugin.name
                        });
                    })
                }

                if(component.value.type === 'ObjectExpression'){
                    _.each(component.value.properties, function(props){
                        if(props.key.type === 'Identifier' && (props.key.name === 'create' || props.key.name === 'module')){
                            if(props.value.type === 'Literal') {
                                var path = props.value.value;
                                var moduleName = _.last(path.split('/')) + _.uniqueId();
                                pendingImports.push({name: moduleName, path: path});
                                props.value = _.extend(props.value, 
                                    {
                                        type: "Identifier",
                                        name: moduleName
                                    }
                                );
                            }
                        }
                    })
                }
            })
        }
    });
    return specComponents;
}

function traverse(node, func) {
    func(node);
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            var child = node[key];
            if (typeof child === 'object' && child !== null) {
                if (Array.isArray(child)) {
                    child.forEach(function(node) {
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func);
                }
            }
        }
    }
}

function addImports(ast) {
    _.each(pendingImports, function(obj) {
        addImport(ast, obj.name, obj.path);
    })
}

function addImport(ast, varName, path) {
    ast.body.unshift({
        "type": "VariableDeclaration",
        "declarations": [
            {
                "type": "VariableDeclarator",
                "id": {
                    "type": "Identifier",
                    "name": varName
                },
                "init": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "require"
                    },
                    "arguments": [
                        {
                            "type": "Literal",
                            "value": path,
                            "raw": "'" + path + "'"
                        }
                    ]
                }
            }
        ],
        "kind": "var"
    });
}

function wrapInModuleExportExpression(properties) {
    var ast = {
        "type": "Program",
        "body": [],
        "sourceType": "script"
    }

    ast.body.push({
        "type": "ExpressionStatement",
        "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                    "type": "Identifier",
                    "name": "module"
                },
                "property": {
                    "type": "Identifier",
                    "name": "exports"
                }
            },
            "right": {
                "type": "ObjectExpression",
                "properties": properties
            }
        }
    });
    
    return ast;
}