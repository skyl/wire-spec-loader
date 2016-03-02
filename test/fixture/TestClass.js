function TestClass(str) {
    console.log(str);
}

TestClass.prototype.doSmth = function(str) {
    console.log("doSmth says:::", str);
}

module.exports = TestClass;