var _ = require('underscore');

module.exports = function analyzeCode(ast, traverseFunc, pendingImports) {
    var specComponents;
    var pendingPlugins = [];

    traverseFunc(ast, function(node) {
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