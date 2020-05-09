const mongoose = require('mongoose');
const {spawn} = require("child_process");
// Require Logs model in our routes module
const EventLog = mongoose.model('logs');


function writeBroker (type, data, origin) {
    data = Math.floor(data);
    let orderTransOk = false;
    let orderDoneWithoutError = false;
    let errorMessage = "";
    let desc = "";

    let returnData = null;

    let connectionSuccess = false;

    return new Promise((resolve, reject) => {
        // eslint-disable-next-line init-declarations
        let broker,
            response = [];

        if (data) {
            broker = spawn("hexapod", ["-t", type, "-q", data]);
        } else {
            broker = spawn("hexapod", ["-t", type]);
        }
        broker.stdout.on("data", (data) => {
            response.push(data.toString());
        });
        broker.stderr.on("data", (data) => {
            response.push(data.toString());
        });
        broker.on("error", (err) => {
            errorMessage = "hexapod command not found : ENOENT";
            reject(err);
        });
        broker.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            response.forEach((commands) => {
                commands.split("\n").forEach((ln) => {
                    if (ln.indexOf("[connected]") !== -1 || connectionSuccess) {
                        connectionSuccess = true;
                        if (ln.indexOf("[wrongType]") !== -1) {
                            errorMessage = "WrongTypeProvided";
                        } else if (ln.indexOf("[orderStart]") !== -1 || orderTransOk) {
                            orderTransOk = true;
                            if (ln.indexOf("[orderDone]") !== -1) {
                                orderDoneWithoutError = true;
                            }
                        } else if (ln.indexOf("[voltage]") !== -1) {
                            // eslint-disable-next-line prefer-destructuring
                            returnData = ln.split(":")[1];
                        }
                    } else if (ln.indexOf("[timeoutError]") !== -1) {
                        errorMessage = "TimeoutError";
                    } else if (ln.indexOf("[badData]") !== -1) {
                        errorMessage = "Unexpected Error" + ln;
                    } else if (ln.indexOf("[otherData]") !== -1) {
                        desc = ln;
                    }
                });
            });

            const eventLog = new EventLog({
                type,
                data,
                origin,
                orderTransOk,
                orderDoneWithoutError,
                errorMessage,
                desc
            });

            eventLog.save((err, doc) => {
                if (err) {
                    console.log(err);
                }
            });

            if (errorMessage) {
                reject(errorMessage);
            } else {
                resolve(response, returnData, eventLog);
            }
        });
    });
}

function errorHandler (err) {
    const error = new Error(err);

    console.log(error);
}

module.exports.pingHexapod = function (req, res) {
    writeBroker("ping/hexapod", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("connection ok");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.pingVoltage = function (req, res) {
    writeBroker("ping/voltage", null, req.headers["user-agent"])
        .then((data, resolveData) => {
            console.log(data, resolveData);
            res.status(200).send("voltage : " + resolveData);
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.movementForward = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("movement/forward", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Movement forward done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.movementBackward = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("movement/backward", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Movement backward done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.movementLeft = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("movement/left", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Movement left done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.movementRight = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("movement/right", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Movement right done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.turnRight = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("turn/right", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Turn right done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.turnLeft = function (req, res) {
    let {qty} = req.params;
    let data = qty * 2 / 5;

    writeBroker("turn/left", data, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Turn left done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.height = function (req, res) {
    let {height} = req.params;

    writeBroker("height", height, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Height modification done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.rotate = function (req, res) {
    writeBroker("rotate", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Rotate done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.twist = function (req, res) {
    writeBroker("twist", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Twist done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.move = function (req, res) {
    writeBroker("move", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Move done");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.wakeup = function (req, res) {
    writeBroker("action/wakeup", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Wakeup ok");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.standby = function (req, res) {
    writeBroker("action/standby", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Hexapod in standby");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};

module.exports.calibrate = function (req, res) {
    writeBroker("action/calibrate", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("Calibration ok");
        })
        .catch((err) => {
            errorHandler(err);
            res.redirect("/server-error");
        });
};
