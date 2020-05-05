'use strict';

let defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/metalgear-test',
        options: {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'admintest1242'
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {

        /*
         * Logging with Morgan - https://github.com/expressjs/morgan
         * Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
         */
        format: process.env.LOG_FORMAT || 'combined',
        options: {

            /*
             * Stream defaults to process.stdout
             * Uncomment/comment to toggle the logging to a log on the file system
             */
            stream: {
                directoryPath: process.cwd(),
                fileName: 'access.log',
                rotatingLogs: { // For more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
                    active: false, // Activate to use rotating logs
                    fileName: 'access-%DATE%.log', // If rotating logs are active, this fileName setting will be used
                    frequency: 'daily',
                    verbose: false
                }
            }
        }
    },
    port: process.env.PORT || 3001,
    app: {
        title: defaultEnvConfig.app.title + ' - Test Environment'
    },
    seedDB: {
        seed: process.env.MONGO_SEED === 'true',
        options: {
            logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false',
            seedUser: {
                username: process.env.MONGO_SEED_USER_USERNAME || 'user',
                provider: 'local',
                email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
                firstName: 'User',
                lastName: 'Local',
                displayName: 'User Local',
                roles: ['user']
            },
            seedAdmin: {
                username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
                provider: 'local',
                email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
                firstName: 'Admin',
                lastName: 'Local',
                displayName: 'Admin Local',
                roles: ['user', 'admin']
            }
        }
    },
    // This config is set to true during grunt coverage
    coverage: process.env.COVERAGE || false
};
