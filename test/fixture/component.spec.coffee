$plugins: [
    './plugins/simpe'
]
two: [10,20,30],
one: {$ref: 'two'}
controller: 
    create: './TestClass'
    ready: 
        saySmth: [
            {$ref: 'one'}
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
        spec: './wiredDeferredModuleSpec'
        defer: true
# wiredModule:
#     wire:
#         spec: './wiredModuleSpec'