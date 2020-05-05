'use strict';

/**
 * Module dependencies.
 */
let path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

// URLs for which user can't be redirected on signin
let noReturnUrls = [
    '/authentication/signin',
    '/authentication/signup'
];

/**
 * Signup
 */
exports.signup = function (req, res) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    let user = new User(req.body);
    let message = null;

    // Add missing user fields
    if (!user.provider) {
        user.provider = 'local';
    }
    if (!user.displayName) {
        user.displayName = user.firstName + ' ' + user.lastName;
    }

    // Then save the user
    user.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;

        req.login(user, (err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(user);
            }
        });

    });
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, (err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * OAuth provider call
 */
exports.oauthCall = function (strategy, scope) {
    return function (req, res, next) {

        /*
         * Set redirection path on session.
         * Do not redirect to a signin or signup page
         */
        if (noReturnUrls.indexOf(req.query.redirect_to) === -1) {
            req.session.redirect_to = req.query.redirect_to;
        }
        // Authenticate
        passport.authenticate(strategy, scope)(req, res, next);
    };
};

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {
    // Pop redirect URL from session
        let sessionRedirectURL = req.session.redirect_to;

        delete req.session.redirect_to;

        passport.authenticate(strategy, (err, user, redirectURL) => {
            if (err) {
                return res.redirect('/authentication/signin?err=' + encodeURIComponent(errorHandler.getErrorMessage(err)));
            }
            if (!user) {
                return res.redirect('/authentication/signin');
            }
            req.login(user, (err) => {
                if (err) {
                    return res.redirect('/authentication/signin');
                }

                return res.redirect(redirectURL || sessionRedirectURL || '/');
            });
        })(req, res, next);
    };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function (req, providerUserProfile, done) {
    if (!req.user) {
    // Define a search query fields
        let searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
        let searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

        // Define main provider search query
        let mainProviderSearchQuery = {};

        mainProviderSearchQuery.provider = providerUserProfile.provider;
        mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define additional provider search query
        let additionalProviderSearchQuery = {};

        additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define a search query to find existing user with current provider profile
        let searchQuery = {
            $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
        };

        User.findOne(searchQuery, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                let possibleUsername = providerUserProfile.username || (providerUserProfile.email ? providerUserProfile.email.split('@')[0] : '');

                User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    user = new User({
                        firstName: providerUserProfile.firstName,
                        lastName: providerUserProfile.lastName,
                        username: availableUsername,
                        displayName: providerUserProfile.displayName,
                        email: providerUserProfile.email,
                        profileImageURL: providerUserProfile.profileImageURL,
                        provider: providerUserProfile.provider,
                        providerData: providerUserProfile.providerData
                    });

                    // And save the user
                    user.save((err) => done(err, user));
                });
            } else {
                return done(err, user);
            }

        });
    } else {
    // User is already logged in, join the provider data to the existing user
        let user = req.user;

        // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
        if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
            // Add the provider data to the additional provider data field
            if (!user.additionalProvidersData) {
                user.additionalProvidersData = {};
            }

            user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

            // Then tell mongoose that we've updated the additionalProvidersData field
            user.markModified('additionalProvidersData');

            // And save the user
            user.save((err) => done(err, user, '/settings/accounts'));
        } else {
            return done(new Error('User is already connected using this provider'), user);
        }
    }
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function (req, res, next) {
    let user = req.user;
    let provider = req.query.provider;

    if (!user) {
        return res.status(401).json({
            message: 'User is not authenticated'
        });
    } else if (!provider) {
        return res.status(400).send();
    }

    // Delete the additional provider
    if (user.additionalProvidersData[provider]) {
        delete user.additionalProvidersData[provider];

        // Then tell mongoose that we've updated the additionalProvidersData field
        user.markModified('additionalProvidersData');
    }

    user.save((err) => {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.json(user);

        });

    });
};
