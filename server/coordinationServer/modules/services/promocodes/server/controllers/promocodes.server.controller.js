'use strict';

/**
 * Module dependencies.
 */
let path = require('path'),
    mongoose = require('mongoose'),
    Promocode = mongoose.model('Promocode'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

function findByReference (reference) {
    Promocode.find({});
}

/**
 *  Redeem a promocode
 */
exports.redeem = function (req, res) {
    let id = req.body.reference,
        user = req.model.me;
};
