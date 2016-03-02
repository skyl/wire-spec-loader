function TestClass() {
}

TestClass.prototype.saySmth = function() {
    var args = Array.prototype.slice.apply(arguments);
    console.log("doSmth says:::", args[0], args[1]);
}

module.exports = TestClass;