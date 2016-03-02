module.exports = function addImport(ast, varName, path) {
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