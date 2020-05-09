'use strict';

let defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI_DEV || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/metalgear-dev',
        options: {
            useMongoClient: true
            // user: 'admin',
            // pass: 'admindev1242'
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {

        /*
         * Logging with Morgan - https://github.com/expressjs/morgan
         * Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
         */
        format: 'dev',
        options: {

            /*
             * Stream defaults to process.stdout
             * Uncomment/comment to toggle the logging to a log on the file system
             * stream: {
             *  DirectoryPath: process.cwd(),
             *  FileName: 'access.log',
             *  RotatingLogs: { // for more info on rotating eventLogger - https://github.com/holidayextras/file-stream-rotator#usage
             *    Active: false, // activate to use rotating eventLogger
             *    FileName: 'access-%DATE%.log', // if rotating eventLogger are active, this fileName setting will be used
             *    Frequency: 'daily',
             *    Verbose: false
             *  }
             * }
             */
        }
    },
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    livereload: true
};
