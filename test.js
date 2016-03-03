var wire = require('essential-wire');
var fs = require('fs');

var compilationPlugin = require('./src/plugins/compile');
var translatePlugin = require('./src/plugins/translate');
var esprimaPlugin = require('./src/plugins/esprima');
var escodegenPlugin = require('./src/plugins/esprima/codegen');

function run(source) {
    this.cacheable && this.cacheable();

    wire({
        $plugins: [
            compilationPlugin,
            translatePlugin,
            esprimaPlugin,
            escodegenPlugin
        ],
        source: {
            compile: source,
            translate: {
                reference: true
            },
            parse: {},
            wrapInExport: {},
            addImports: {},
        },
        code: {
            generate: {$ref: 'source.ast'}
        }
    })
    .then(function(context){
        console.log("source::::", context.source.raw, context.source.ast, '/n', context.code);
    })
    .otherwise(function(error){
        console.error("ERROR:::", error);
    });
}

var source = fs.readFileSync('./test/fixture/simple.spec.coffee', 'utf-8');
run(source)