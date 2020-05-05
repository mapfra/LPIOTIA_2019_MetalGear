'use strict';

/**
 * Module dependencies.
 */
let should = require('should'),
    mongoose = require('mongoose'),
    Promocode = mongoose.model('Promocode');

/**
 * Globals
 */
let promocode1, promocode2, promocode3;

/**
 * Unit tests
 */
describe('promocode Model Unit Tests:', () => {

    before(() => {
        let aYearFromNow = new Date();

        aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);

        promocode1 = {
            reference: 'PromoTest1',
            description: 'desc',
            validityStartDate: new Date(),
            validityEndDate: aYearFromNow,
            amount: 15,
            validityDuration: 0,
            numberOfUses: 0,
            isActive: true
        };
        // Promocode2 is a clone of promocode1
        promocode2 = promocode1;
        promocode3 = {
            reference: 'PromoTest3',
            description: 'desc',
            validityStartDate: new Date(),
            validityEndDate: aYearFromNow,
            amount: 15,
            validityDuration: 0,
            numberOfUses: 0,
            isActive: true
        };
    });

    describe('Method Save', () => {
        it('should begin with no promocodes', (done) => {
            Promocode.find({}, (err, promocodes) => {
                promocodes.should.have.length(0);
                done();
            });
        });

        it('should be able to save without problems', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode1.remove((err) => {
                    should.not.exist(err);
                    done();
                });
            });
        });

        it('should fail to save an existing promocode again', (done) => {
            let _promocode1 = new Promocode(promocode1);
            let _promocode2 = new Promocode(promocode2);

            _promocode1.save(() => {
                _promocode2.save((err) => {
                    should.exist(err);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });

        it('should be able to show an error when trying to save without reference', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.reference = '';
            _promocode1.save((err) => {
                should.exist(err);
                done();
            });
        });

        it('should be able to update an existing promocode with valid description without problems', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode1.description = 'New Description';
                _promocode1.save((err) => {
                    should.not.exist(err);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });

        it('should be able to show an error when trying to update an existing promocode without a reference', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode1.reference = '';
                _promocode1.save((err) => {
                    should.exist(err);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });

        it('should be able to show an error when trying to update an existing promocode with a invalid reference', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode1.roles = 'invalid-reference';
                _promocode1.save((err) => {
                    should.exist(err);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });

        it('should confirm that saving promocode model doesnt change the validity end date', (done) => {
            let _promocode1 = new Promocode(promocode1);

            _promocode1.save((err) => {
                should.not.exist(err);
                let validityEndDateBefore = _promocode1.validityEndDate;

                _promocode1.reference = 'test';
                _promocode1.save((err) => {
                    let validityEndDateAfter = _promocode1.validityEndDate;

                    validityEndDateBefore.should.equal(validityEndDateAfter);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });

        it('should be able to save 2 different promocodes', (done) => {
            let _promocode1 = new Promocode(promocode1);
            let _promocode3 = new Promocode(promocode3);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode3.save((err) => {
                    should.not.exist(err);
                    _promocode3.remove((err) => {
                        should.not.exist(err);
                        _promocode1.remove((err) => {
                            should.not.exist(err);
                            done();
                        });
                    });
                });
            });
        });

        it('should not be able to save another promocode with the same reference', function (done) {
            // Test may take some time to complete due to db operations
            this.timeout(10000);

            let _promocode1 = new Promocode(promocode1);
            let _promocode3 = new Promocode(promocode3);

            _promocode1.save((err) => {
                should.not.exist(err);
                _promocode3.reference = _promocode1.reference;
                _promocode3.save((err) => {
                    should.exist(err);
                    _promocode1.remove((err) => {
                        should.not.exist(err);
                        done();
                    });
                });
            });

        });

    });

    after((done) => {
        Promocode.remove().exec(done);
    });
});
