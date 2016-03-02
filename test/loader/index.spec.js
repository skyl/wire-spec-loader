import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

import wire                 from 'essential-wire';
// import wireDebugPlugin      from 'essential-wire/source/debug';

// import spec from '../fixture/component.spec.coffee';

describe('create parse', () => {
    let defaultModuleRegex = /\.(module|create)$/;
    let defaultSpecRegex = /\.(wire\.spec|wire)$/;
    let removeCommentsRx = /\/\*[\s\S]*?\*\//g;
    let replaceIdsRegex = /(\bdefine)\s*\(\s*(?:\s*'([^']*)'|"([^"]*)"\s*,)?(?:\s*\[([^\]]*)\]\s*,)?/;

    let source = "controller: {" +
    "    create: '../fixture/controller'" +
    "}";

    const before = (done) => {
        source.replace(removeCommentsRx, '')
            .replace(replaceIdsRegex, function (m, def, mid1, mid2, depIds) {
                console.log(m, def, mid1, mid2, depIds);
                // done();
            });

        done();
    }

    beforeEach(before);

    it('should be ok', (done) => {
        expect(source).to.be.ok;
        done();
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
        expect(rootContext.template).to.be.a('string');
        expect(rootContext.controller).to.be.a('object');
        done();
    });

});