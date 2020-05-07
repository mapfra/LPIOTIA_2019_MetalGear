'use strict';

module.exports = function (app) {
    // Root routing
    let core = require('../controllers/core.server.controller');

    // Define a test route for testing the availability of the server
    app.route('/ping').get(core.ping);

    // Define the main app render route
    app.route('/main').get(core.renderMainApplication);

    // Define error pages
    app.route('/server-error').get(core.renderServerError);

    // Return a 404 for all undefined api, module or lib routes
    app.route('/:url(api|modules|lib|auth)/*').get(core.renderNotFound);

    // All other not defined routes
    app.route('/*').get(core.renderNotFound);

};
