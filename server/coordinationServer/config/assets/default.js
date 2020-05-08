'use strict';

module.exports = {
    server: {
        gruntConfig: 'gruntfile.js',
        allJS: ['server.js', 'config/**/*.js', 'modules/services/*/server/**/*.js', 'modules/core/**/*.js'],
        models: 'modules/services/*/server/models/**/*.js',
        routes: ['modules/services/*/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        sockets: 'modules/services/*/server/sockets/**/*.js',
        config: 'modules/services/*/server/config/*.js',
        policies: 'modules/services/*/server/policies/*.js',
        views: ['modules/services/*/server/views/*.ejs', 'modules/core/server/views/*.ejs']
    }
};
