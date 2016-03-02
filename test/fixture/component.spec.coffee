{
    two: [1,2,3],
    one: {$ref: 'two'},
    controller: {
        create: './TestClass'
    },
    template: '
        |section
        |   header
        |   content
        |       oneBlock
        |       twoBlock
        |   footer
    '
}