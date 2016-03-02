var esprima = require('esprima');

var defaultModuleRegex = /\.(module|create)$/;
var defaultSpecRegex = /\.(wire\.spec|wire)$/;
var removeCommentsRx = /\/\*[\s\S]*?\*\/|\/\//g;
var replaceIdsRegex = /(\bdefine)\s*\(\s*(?:\s*'([^']*)'|"([^"]*)"\s*,)?(?:\s*\[([^\]]*)\]\s*,)?/;

// var source = "controller: {         " +
// "    /* comment                   */" +
// "    create: '../fixture/controller'" +
// "}";

var source = "{" +
"    two: [1,2,3],              " +
"    one: {$ref: 'two'},        " +
"    controller: {              " +
"    create: '../fixture/controller'" +
"  }," +
"  template: '..someTpl'" +
"}"

source = source.replace(removeCommentsRx, '')

function scanObj(obj, path) {
    // Scan all keys.  This might be the spec itself,
    // or any sub-object-literal in the spec.
    for (var name in obj) {
        console.log(obj[name], name);
        // scanItem(obj[name], createPath(path, name));
    }
}

analyzeCode(source);

function analyzeCode(code) {
    var ast = esprima.parse(code);
    traverse(ast, function(node) {
        if(node.label && node.label.name) {
            console.log(node.label.name);
        }
        // console.log(node.type, "BODY:::", node);
    });
}

function traverse(node, func) {
    func(node);//1
    for (var key in node) { //2
        if (node.hasOwnProperty(key)) { //3
            var child = node[key];
            if (typeof child === 'object' && child !== null) { //4

                if (Array.isArray(child)) {
                    child.forEach(function(node) { //5
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func); //6
                }
            }
        }
    }
}