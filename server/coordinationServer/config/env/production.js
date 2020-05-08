'use strict';

module.exports = {
    secure: {
        ssl: true,
        privateKey: './config/sslcerts/key.pem',
        certificate: './config/sslcerts/cert.pem'
    },
    port: process.env.PORT || 8443,
    db: {
        uri: (process.env.MONGOHQ_URL || process.env.MONGOLAB_URI) + '/metalgear',
        options: {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'gCVw5A4ubqriEUG'
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
                directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
                fileName: process.env.LOG_FILE || 'access.log',
                rotatingLogs: { // For more info on rotating eventLogger - https://github.com/holidayextras/file-stream-rotator#usage
                    active: process.env.LOG_ROTATING_ACTIVE || false, // Activate to use rotating eventLogger
                    fileName: process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // If rotating eventLogger are active, this fileName setting will be used
                    frequency: process.env.LOG_ROTATING_FREQUENCY || 'daily',
                    verbose: process.env.LOG_ROTATING_VERBOSE || false
                }
            }
        }
    }
};
