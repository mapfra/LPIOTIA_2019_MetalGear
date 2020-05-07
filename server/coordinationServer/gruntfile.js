

/**
 * Module dependencies.
 */
let _ = require("lodash"),
    defaultAssets = require("./config/assets/default"),
    testAssets = require("./config/assets/test"),
    testConfig = require("./config/env/test"),
    fs = require("fs"),
    path = require("path");

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        env: {
            test: {
                NODE_ENV: "test"
            },
            dev: {
                NODE_ENV: "development"
            }
        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: "server.js",
                options: {
                    nodeArgs: ["--inspect"],
                    ext: "js,ejs",
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ["nodemon", "watch"],
            debug: ["nodemon", "watch", "node-inspector"],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            options: {
            // Jshintrc: true,
                node: true,
                esversion: 6,
                mocha: true,
                strict: false,
                browser: false
            },
            all: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS)
        },
        eslint: {
            options: {},
            target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS)
        },
        "node-inspector": {
            custom: {
                options: {
                    "web-port": 1337,
                    "web-host": "localhost",
                    "debug-port": 5858,
                    "save-live-edit": true,
                    "no-preload": true,
                    "stack-trace-limit": 50,
                    "hidden": []
                }
            }
        },
        mochaTest: {
            src: testAssets.tests.server,
            options: {
                reporter: "spec",
                timeout: 10000
            }
        }
    });

    grunt.event.on("coverage", (lcovFileContents, done) => {
    // Set coverage config so karma-coverage knows to run coverage
        testConfig.coverage = true;
        require("coveralls").handleInput(lcovFileContents, (err) => {
            if (err) {
                return done(err);
            }
            return done();
        });
    });

    // Load NPM tasks
    require("load-grunt-tasks")(grunt);
    grunt.loadNpmTasks("grunt-protractor-coverage");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("gruntify-eslint");

    // Connect to the MongoDB instance and load the models
    grunt.task.registerTask("mongoose", "Task that connects to the MongoDB instance and loads the application models.", function () {
    // Get the callback
        let done = this.async();

        // Use mongoose configuration
        let mongoose = require("./config/lib/mongoose.js");

        // Connect to database
        mongoose.connect((db) => {
            done();
        });
    });

    // Drops the MongoDB database, used in e2e testing
    grunt.task.registerTask("dropdb", "drop the database", function () {
    // Async mode
        let done = this.async();

        // Use mongoose configuration
        let mongoose = require("./config/lib/mongoose.js");

        mongoose.connect((db) => {
            db.connection.db.dropDatabase((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully dropped db: ", db.connection.db.databaseName);
                }
                db.connection.db.close(done);
            });
        });
    });

    grunt.task.registerTask("server", "Starting the server", function () {
    // Get the callback
        let done = this.async();

        let path = require("path");
        let app = require(path.resolve("./config/lib/app"));
        let server = app.start(() => {
            done();
        });
    });

    // Lint JavaScript files.
    grunt.registerTask("lint", ["jshint"]);
    grunt.registerTask("eslint", ["eslint"]);

    // Run the project tests
    grunt.registerTask("test", ["env:test", "lint", "server", "mochaTest"]);
    grunt.registerTask("test:server", ["env:test", "lint", "server", "mochaTest"]);
    grunt.registerTask("test:e2e", ["env:test", "lint", "dropdb", "server"]);

    // Run project coverage
    grunt.registerTask("coverage", ["env:test", "lint"]);

    // Run the project in development mode
    grunt.registerTask("default", ["env:dev", "lint", "concurrent:default"]);

    // Run the project in debug mode
    grunt.registerTask("debug", ["env:dev", "lint", "concurrent:debug"]);
};
