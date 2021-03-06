$plugins: [
    './plugins/simple'
]
one: [10,20,30],
two: ~ one
three: "abc"
controller: 
    create: './TestClass'
    ready: 
        saySmth: [
            ~ two
            ~ three
        ]

component: '
        |section
        |   header
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
middleware: 
    router: '<- ./navigation.router'
backwardImport: '<- ./backwardImport'
refToMiddleware: ~middleware.router