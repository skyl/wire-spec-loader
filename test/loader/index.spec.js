import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

import wire                 from 'essential-wire';
// import wireDebugPlugin      from 'essential-wire/source/debug';

import spec from '../fixture/creator.spec.coffee';
// import mockSpec from '../fixture/mock.js';

xdescribe('wired context', () => {

    let rootContext = null;

    const before = (done) => {
        wire(mockSpec)
        .then(context => {
            rootContext = context;
            console.log("rootContext:::", rootContext);
            done();
        })
        .otherwise(error => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should be ok', (done) => {
        expect(rootContext).to.be.ok;
        done();
    });

});

describe('wired context', () => {

    let rootContext = null;

    const before = (done) => {
        wire(spec)
        .then(context => {
            rootContext = context;
            console.log("rootContext:::", rootContext);
            done();
        })
        .otherwise(error => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should be ok', (done) => {
        expect(rootContext).to.be.ok;
        // expect(rootContext.test).to.be.a('string');
        // expect(rootContext.template).to.be.a('string');
        // expect(rootContext.controller).to.be.a('object');
        done();
    });

});