'use strict';

module.exports = function (app) {
    // Root routing
    let controller = require('../controllers/orders.server.controller');

    // Define a test route for testing the availability of the server
    app.route('/ping/hexapod').get(controller.pingHexapod);

    app.route('/ping/voltage').get(controller.pingVoltage);

    app.route('/movement/forward/:qty').get(controller.movementForward);

};
