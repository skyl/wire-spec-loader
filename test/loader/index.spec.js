import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

import wire                 from 'essential-wire';
// import wireDebugPlugin      from 'essential-wire/source/debug';

import normalize from '../../src/assets/normalize';

import spec from '../fixture/component.spec.coffee';

describe('assets', () => {
    let str = null;
    const before = () => {
        str = normalize('one.super.spec.coffee');
    }

    beforeEach(before);
    it('should be ok', () => {
        expect(str).to.equal('oneSuperSpec');
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
        expect(rootContext).to.be.ok;
        expect(rootContext.two).to.be.a('array');
        expect(rootContext.template).to.be.a('string');
        expect(rootContext.controller).to.be.a('object');
        expect(rootContext.controller.saySmth).to.be.a('function');
        expect(rootContext.wiredDeferredModule).to.be.a('function');
        done();
    });

});