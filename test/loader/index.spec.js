import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

import wire                 from 'essential-wire';
// import wireDebugPlugin      from 'essential-wire/source/debug';

import normalize from '../../src/assets/normalize';
import replaceReference from '../../src/assets/replaceReference';
import importModules from '../../src/assets/importModules';

// import spec from '../fixture/component.spec.coffee';

describe('asset methods', () => {
    let str = normalize('one.super.spec.coffee');
    let refString = replaceReference("~oneRef, ~ anotherRef123");
    let textWithImports = "    '<-  ./some/path'       '<-  ./some/path2'   ";

    it('should capitalize fragments and remove extention', () => {
        expect(str).to.equal('oneSuperSpec');
    });

    it('should replace references', () => {
        expect(refString).to.equal("{$ref: 'oneRef'}, {$ref: 'anotherRef123'}");
    });

    it('should return list imported pathes', () => {
        let result = importModules(textWithImports);
        expect(result).to.be.an('array');
        expect(result[0].path).to.equal('./some/path');
        expect(result[1].path).to.equal('./some/path2');
    });
});

xdescribe('wired context', () => {

    let rootContext = null;

    const before = (done) => {
        wire(spec)
        .then(context => {
            rootContext = context;
            done();
        })
        .otherwise(error => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should be ok', (done) => {
        console.log("rootContext.template", rootContext.template);
        expect(rootContext).to.be.ok;
        expect(rootContext.two).to.be.an('array');
        expect(rootContext.template).to.be.a('string');
        expect(rootContext.controller).to.be.an('object');
        expect(rootContext.controller.saySmth).to.be.a('function');
        done();
    });

    it('should understand wire factory', (done) => {
        expect(rootContext.wiredDeferredModule).to.be.a('function');
        expect(rootContext.wiredModuleShortSyntax).to.be.an('object');
        expect(rootContext.wiredModuleLongSyntax).to.be.an('object');
        done()
    });

    it('should provide reference to another component ~', (done) => {
        done()
    });

    // TODO
    xit('should import module by sign <- ', (done) => {
        expect(rootContext.middleware.api.router).to.be.a('function');
        done()
    });

});

import spec from '../fixture/simple.spec.coffee';

describe('wired simple context', () => {

    let rootContext = null;

    const before = (done) => {
        wire(spec)
        .then(context => {
            rootContext = context;
            done();
        })
        .otherwise(error => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should be ok', (done) => {
        console.log("rootContext:::", rootContext);
        expect(rootContext).to.be.ok;
        expect(rootContext.one).to.be.an('array');
        done();
    });

});