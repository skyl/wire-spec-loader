var wire = require('essential-wire');
var fs = require('fs');

var compilationPlugin = require('./src/plugins/compile');
var translatePlugin = require('./src/plugins/translate');
var esprimaPlugin = require('./src/plugins/esprima');

function run(source) {
    wire({
        $plugins: [
            compilationPlugin,
            translatePlugin,
            esprimaPlugin
        ],
        source: {
            compile: source,
            translate: {
                reference: true,
                importReference: true
            },
            parse: {},
            analizeAst: {
                markup: 'component'
            },
            addImports: {},
            generate: {}
        }
    })
    .then(function(context){
        console.log(context.source.result);
    })
    .otherwise(function(error){
        console.error("ERROR:::", error);
    });
}

var source = fs.readFileSync('./test/fixture/component.spec.coffee', 'utf-8');
run(source)