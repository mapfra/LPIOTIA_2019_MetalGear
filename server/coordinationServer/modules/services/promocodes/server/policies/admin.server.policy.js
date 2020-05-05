'use strict';

/**
 * Module dependencies.
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Admin Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([
        {
            roles: ['admin'],
            allows: [
                {
                    resources: '/api/promocodes',
                    permissions: '*'
                }, {
                    resources: '/api/promocodes/:promoId',
                    permissions: '*'
                }
            ]
        }
    ]);
};

/**
 * Check If Admin Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    let roles = req.user ? req.user.roles : ['guest'];

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), (err, isAllowed) => {
        if (err) {
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        }
        if (isAllowed) {
        // Access granted! Invoke next middleware
            return next();
        }
        return res.status(403).json({
            message: 'User is not authorized'
        });


    });
};
