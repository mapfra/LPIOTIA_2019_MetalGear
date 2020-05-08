'use strict';

module.exports = function (app) {
    // Root routing
    let controller = require('../controllers/events.server.controller');

    // Define a test route for testing the availability of the server
    app.route('/log').get(controller.eventLogger);

};
