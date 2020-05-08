'use strict';

let _ = require('lodash'),
    config = require('../config'),
    chalk = require('chalk'),
    fileStreamRotator = require('file-stream-rotator'),
    fs = require('fs');

// List of valid formats for the logging
let validFormats = ['combined', 'common', 'dev', 'short', 'tiny'];

// Build logger service
let logger = {
    getFormat: getLogFormat, // Log format to use
    getOptions: getLogOptions // Log options to use
};

// Export the logger service
module.exports = logger;

/**
 * The format to use with the logger
 *
 * Returns the log.format option set in the current environment configuration
 */
function getLogFormat () {
    let format = config.log && config.log.format ? config.log.format.toString() : 'combined';

    // Make sure we have a valid format
    if (!_.includes(validFormats, format)) {
        format = 'combined';

        if (process.env.NODE_ENV !== 'test') {
            console.log();
            console.log(chalk.yellow('Warning: An invalid format was provided. The logger will use the default format of "' + format + '"'));
            console.log();
        }
    }

    return format;
}

/**
 * The options to use with the logger
 *
 * Returns the log.options object set in the current environment configuration.
 * NOTE: Any options, requiring special handling (e.g. 'stream'), that encounter an error will be removed from the options.
 */
function getLogOptions () {
    let options = config.log && config.log.options ? _.clone(config.log.options, true) : {};

    // Check if the current environment config has the log stream option set
    if (_.has(options, 'stream')) {

        try {

            // Check if we need to use rotating eventLogger
            if (_.has(options, 'stream.rotatingLogs') && options.stream.rotatingLogs.active) {

                if (options.stream.rotatingLogs.fileName.length && options.stream.directoryPath.length) {

                    // Ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fileStreamRotator.getStream({
                        filename: options.stream.directoryPath + '/' + options.stream.rotatingLogs.fileName,
                        frequency: options.stream.rotatingLogs.frequency,
                        verbose: options.stream.rotatingLogs.verbose
                    });

                } else {
                    // Throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for the rotating eventLogger option.');
                }

            } else {

                // Create the WriteStream to use for the eventLogger
                if (options.stream.fileName.length && options.stream.directoryPath.length) {

                    // Ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fs.createWriteStream(options.stream.directoryPath + '/' + config.log.options.stream.fileName, {flags: 'a'});
                } else {
                    // Throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for stream option.');
                }
            }
        } catch (err) {

            // Remove the stream option
            delete options.stream;

            if (process.env.NODE_ENV !== 'test') {
                console.log();
                console.log(chalk.red('An error has occured during the creation of the WriteStream. The stream option has been omitted.'));
                console.log(chalk.red(err));
                console.log();
            }
        }
    }

    return options;
}
