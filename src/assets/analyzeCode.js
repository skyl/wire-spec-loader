var _ = require('underscore');
var normalize = require('./normalize');

module.exports = function analyzeCode(ast, traverseFunc) {
    var specComponents;
    var imports = [];
    var plugins = [];

    function changeComponentDescription(props) {
        var path = props.value.value;
        var moduleName = normalize(_.last(path.split('/'))) + _.uniqueId();
        imports.push({name: moduleName, path: path});
        props.value = _.extend(props.value, 
            {
                type: "Identifier",
                name: moduleName
            }
        );
    }

    traverseFunc(ast, function(node) {
        if(node.type === 'ExpressionStatement' ){
            specComponents = node.expression.properties
            _.each(specComponents, function(component){
                if(component.value.type === 'ArrayExpression' && component.key.name === '$plugins'){
                    _.each(component.value.elements, function(element, index, elements){
                        var path = element.value;
                        var pluginName = normalize(_.last(path.split('/'))) + _.uniqueId();
                        imports.push({name: pluginName, path: path});
                        plugins.push({name: pluginName, path: path});
                        elements[index] = element;
                    });
                    
                    component.value.elements = [];
                    _.each(plugins, function(plugin){
                        component.value.elements.push({
                            type: "Identifier",
                            name: plugin.name
                        });
                    })
                }

                if(component.value.type === 'ObjectExpression'){
                    _.each(component.value.properties, function(props){
                        if(props.key.type === 'Identifier' && 
                            (props.key.name === 'create' || props.key.name === 'module' || props.key.name === 'wire' )
                        ){
                            if(props.value.type === 'Literal') {
                                changeComponentDescription(props);
                            }
                        }

                        if(props.key.type === 'Identifier' && props.key.name === 'wire'){
                            if(props.value.type === 'ObjectExpression') {
                                _.each(props.value.properties, function(props){
                                    if(props.key.type === 'Identifier' && props.key.name === 'spec'){
                                        changeComponentDescription(props);
                                    }
                                });
                            }
                        }
                    })
                }
            })
        }
    });
    return {
        specComponents: specComponents,
        imports: imports
    }
}