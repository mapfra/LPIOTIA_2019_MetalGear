'use strict';

/**
 * Module dependencies.
 */
let passport = require('passport');

module.exports = function (app) {
    // User Routes
    let users = require('../controllers/users.server.controller');

    // Setting up the users password api
    app.route('/auth/forgot').post(users.forgot);
    app.route('/auth/reset/:token').get(users.validateResetToken);
    app.route('/auth/reset/:token').post(users.reset);

    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').get(users.signout);

    // Setting the facebook oauth routes
    app.route('/auth/facebook').get(users.oauthCall('facebook', {
        scope: ['email']
    }));
    app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

    // Setting the twitter oauth routes
    app.route('/auth/twitter').get(users.oauthCall('twitter'));
    app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

    // Setting the google oauth routes
    app.route('/auth/google').get(users.oauthCall('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

    // Setting the linkedin oauth routes
    app.route('/auth/linkedin').get(users.oauthCall('linkedin', {
        scope: [
            'r_basicprofile',
            'r_emailaddress'
        ]
    }));
    app.route('/api/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

    // Setting the github oauth routes
    app.route('/auth/github').get(users.oauthCall('github'));
    app.route('/auth/github/callback').get(users.oauthCallback('github'));

    // Setting the paypal oauth routes
    app.route('/auth/paypal').get(users.oauthCall('paypal'));
    app.route('/auth/paypal/callback').get(users.oauthCallback('paypal'));
};
