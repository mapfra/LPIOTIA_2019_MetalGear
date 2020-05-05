'use strict';

/**
 * Module dependencies.
 */
let path = require('path'),
    mongoose = require('mongoose'),
    Promocode = mongoose.model('Promocode'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Promocode middleware
 */
exports.promoByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Promocode is invalid'
        });
    }

    Promocode.findById(id).exec((err, promocode) => {
        if (err) {
            return next(err);
        } else if (!promocode) {
            return next(new Error('Failed to load promocode ' + id));
        }

        req.model = promocode;
        next();
    });
};

/**
 *  List all promocodes
 */
exports.list = function (req, res) {
    Promocode.find({}).sort('-created')
        .populate('reference')
        .exec((err, promocodes) => {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }

            res.json(promocodes);
        });
};

/**
 * Create promocode
 */
exports.create = function (req, res) {
    // Init Variables
    let promocode = new Promocode(req.body);
    let message = null;

    // Save the promocode
    promocode.save((err, promocode) => {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(promocode);

    });
};

/**
 * Render the requested promocode
 */
exports.read = function (req, res) {
    res.json(req.model);
};

/**
 * Update a promocode
 */
exports.update = function (req, res) {
    let promocode = req.model;

    // For security purposes only merge these parameters
    promocode.reference = req.body.reference;
    promocode.description = req.body.description;
    promocode.validityStartDate = req.body.validityStartDate;
    promocode.validityEndDate = req.body.validityEndDate;
    promocode.amount = req.body.amount;
    promocode.validityDuration = req.body.validityDuration;
    promocode.numberOfUses = req.body.numberOfUses;
    promocode.isActive = req.body.isActive;

    promocode.save((err) => {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(promocode);
    });
};

/**
 * Delete a promocode
 */
exports.delete = function (req, res) {
    let promocode = req.model;

    promocode.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(promocode);
    });
};
