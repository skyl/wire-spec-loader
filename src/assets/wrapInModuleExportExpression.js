module.exports = function wrapInModuleExportExpression(properties) {
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