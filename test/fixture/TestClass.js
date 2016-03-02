function TestClass() {
}

TestClass.prototype.doSmth = function(str) {
    console.log("doSmth says:::", str);
}

module.exports = TestClass;