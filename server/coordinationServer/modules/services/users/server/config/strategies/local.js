'use strict';

/**
 * Module dependencies.
 */
let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    // Use local strategy
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            User.findOne({
                username: username.toLowerCase()
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user || !user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                }

                return done(null, user);
            });
        }
    ));
};
