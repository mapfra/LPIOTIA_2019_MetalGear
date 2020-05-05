'use strict';

/**
 * Module dependencies.
 */
let adminPolicy = require('../policies/admin.server.policy'),
    admin = require('../controllers/admin.server.controller'),
    promocode = require('../controllers/promocodes.server.controller');

module.exports = function (app) {
    // Promocodes collection routes
    app.route('/api/promocodes')
        .get(adminPolicy.isAllowed, admin.list)
        .post(adminPolicy.isAllowed, admin.create);

    // Single promocode routes
    app.route('/api/promocodes/:promoId')
        .get(adminPolicy.isAllowed, admin.read)
        .put(adminPolicy.isAllowed, admin.update)
        .delete(adminPolicy.isAllowed, admin.delete);

    app.route('/api/promocodes/redeem')
        .post(promocode.redeem);

    // Finish by binding the promocode middleware
    app.param('promoId', admin.promoByID);
};
