'use strict';

module.exports = function (app) {
    // Root routing
    let controller = require('../controllers/orders.server.controller');

    // Define a test route for testing the availability of the server
    app.route('/ping/hexapod').get(controller.pingHexapod);

    app.route('/ping/voltage').get(controller.pingVoltage);

    // Movement controllers
    app.route('/movement/forward/:qty').get(controller.movementForward);
    app.route('/movement/backward/:qty').get(controller.movementBackward);
    app.route('/movement/left/:qty').get(controller.movementLeft);
    app.route('/movement/right/:qty').get(controller.movementRight);
    app.route('/turn/right/:qty').get(controller.turnRight);
    app.route('/turn/left/:qty').get(controller.turnLeft);
    app.route('/rotate/:qty').get(controller.rotate);
    app.route('/twist/:qty').get(controller.twist);
    app.route('/move/:qty').get(controller.move);

    // Height controller
    app.route('/height/:height').get(controller.height);

    // Actions controllers
    app.route('/action/wakeup').get(controller.wakeup);
    app.route('/action/standby').get(controller.standby);
    app.route('/action/calibrate').get(controller.calibrate);

};
