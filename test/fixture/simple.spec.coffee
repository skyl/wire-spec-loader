$plugins: [
    './plugins/simple'
]
one: [10,20,30]
two: ~ one
router:
    create: './navigation.router'
module:
    module: './someModule'