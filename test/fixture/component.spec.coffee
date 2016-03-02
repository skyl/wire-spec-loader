module.exports = {
    two: [1,2,3],
    one: {$ref: 'two'},
    controller: {},
    template: '
        |section
        |   header
        |   content
        |       oneBlock
        |       twoBlock
        |   footer
    '
}