'use strict';

const buttonsList = require("../../../../config/application/buttons.js");

/**
 * Allow to check the server status
 */
exports.ping = function (req, res) {
    res.send('pong');
};

exports.renderMainApplication = function (req, res) {
    res.status(200).json(buttonsList);
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
    res.status(500).render('modules/core/server/views/500', {
        error: 'Oops! Something went wrong...'
    });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

    res.status(404).format({
        'text/html' () {
            res.render('modules/core/server/views/404', {
                url: req.originalUrl
            });
        },
        'application/json' () {
            res.json({
                error: 'Path not found'
            });
        },
        'default' () {
            res.send('Path not found');
        }
    });
};
