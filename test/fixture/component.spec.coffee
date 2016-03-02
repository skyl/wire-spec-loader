$plugins: [
    './plugins/simpe'
]
two: [10,20,30],
one: {$ref: 'two'}
controller: 
    create: './TestClass'
    ready: 
        saySmth: [
            ~ one
        ]
template: '
        |section
        |   header
        |   content
        |       oneBlock
        |       twoBlock
        |   footer
'
someModule:
    module: './someModule'
wiredDeferredModule:
    wire:
        spec: './wired.deferred.module.spec.coffee'
        defer: true
wiredModuleShortSyntax:
    wire: './wiredModule.spec.coffee'
wiredModuleLongSyntax:
    wire: 
        spec: './wiredModule.spec.coffee'