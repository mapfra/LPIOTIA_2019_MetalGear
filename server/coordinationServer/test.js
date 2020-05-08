'use strict';

/**
 * Module dependencies.
 */
let path = require('path'),
    app = require(path.resolve('./config/lib/app'));

app.init(() => {
    console.log('Initialized test automation');
});
