'use strict';

module.exports = {
    app: {
        title: 'Metal-Gear',
        description: 'Metal-Gear coordination server',
        keywords: 'mongodb, express, node.js, mongoose'
    },
    version: '1.0.0',
    port: process.env.PORT || 3000,
    templateEngine: 'ejs',
    // Session Cookie settings
    sessionCookie: {
    // Session expiration is set by default to 24 hours
        maxAge: 24 * (60 * 60 * 1000),

        /*
         * HttpOnly flag makes sure the cookie is only accessed
         * Through the HTTP protocol and not JS/browser
         */
        httpOnly: true,

        /*
         * Secure cookie should be turned to true to provide additional
         * Layer of security so that the cookie is set only when working
         * In HTTPS mode.
         */
        secure: false
    },
    // SessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'jad7p6ceamxifrqqtaxb56uual0l8uyxtpk4wcwy62l2ondii316ezlebn95wat5ot0seexjemfrucaa1xrpo0de9gnkt41',

    /*
     * SessionKey is set to the generic sessionId key used by PHP applications
     * For obsecurity reasons
     */
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    logo: 'modules/core/client/img/logo.png',
    favicon: 'modules/core/client/img/favicon.ico'
};
