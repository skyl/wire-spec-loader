import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

import wire                 from 'essential-wire';

import normalize from '../../src/assets/normalize';
import replaceReference from '../../src/assets/replaceReference';
import backwardImport from '../../src/assets/backwardImport';

import spec from '../fixture/component.spec.coffee';

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
        let result = backwardImport(textWithImports);
        expect(result).to.be.an('object');
        expect(result.imports[0].path).to.equal('./some/path');
        expect(result.imports[1].path).to.equal('./some/path2');
    });
});

describe('wired context', () => {

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
        expect(rootContext).to.be.ok;
        expect(rootContext.two).to.be.an('array');
        expect(rootContext.component).to.be.a('string');
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

    it('should import module by sign <- ', (done) => {
        expect(rootContext.middleware.router).to.be.a('function');
        expect(rootContext.backwardImport.default).to.be.a('function');
        done()
    });

    it('should provide reference to another component by sign ~', (done) => {
        expect(rootContext.refToMiddleware).to.be.a('function');
        done()
    });

});