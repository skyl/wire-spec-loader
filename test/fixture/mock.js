var TestClass = require('./TestClass')
module.exports = ({
    controller: {
        create: TestClass,
        ready: {
            doSmth: 123
        }
    }
});