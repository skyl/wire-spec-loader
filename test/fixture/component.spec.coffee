two: [1,2,3],
one: {$ref: 'two'}
controller: 
    create: './TestClass'
    ready: 
        saySmth: 123
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