const mongoose = require('mongoose');
const {spawn} = require("child_process");
// Require Logs model in our routes module
const EventLog = mongoose.model('logs');


function writeBroker (type, data, origin) {
    let orderTransOk = false;
    let orderDoneWithoutError = false;
    let errorMessage = "";
    let desc = "";

    let returnData = null;

    let connectionSuccess = false;

    let p = new Promise((resolve, reject) => {
        let broker = null,
            response = [];

        if (data) {
            broker = spawn("broker", ["-t", type, "-q", data]);
        } else {
            broker = spawn("broker", ["-t", type]);
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
            response.forEach((ln) => {
                if ("[connected]" in ln || connectionSuccess) {
                    connectionSuccess = true;
                    if ("[wrongType]" in ln) {
                        errorMessage = "WrongTypeProvided";
                    } else if ("[orderStart]" in ln || orderTransOk) {
                        orderTransOk = true;
                        if ("[orderDone]" in ln) {
                            orderDoneWithoutError = true;
                        }
                    } else if ("[voltage]" in ln) {
                        returnData = ln.split(":")[1];
                    }
                } else if ("[timeoutError]" in ln) {
                    errorMessage = "TimeoutError";
                } else if ("[badData]" in ln) {
                    errorMessage = "Unexpected Error" + ln;
                } else if ("[otherData]" in ln) {
                    desc = ln;
                }
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

            eventLog.save()
                .then(() => {
                    resolve(response, returnData);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });

    return p;
}

module.exports.pingHexapod = function (req, res) {
    writeBroker("ping/hexapod", null, req.headers["user-agent"])
        .then((data) => {
            console.log(data);
            res.status(200).send("connection ok");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect("/server-error");
        });
};

module.exports.pingVoltage = function (req, res) {
    writeBroker("ping/voltage", null, req.headers["user-agent"])
        .then((data, resolveData) => {
            console.log(data, resolveData);
            res.status(200).send("voltage : " + resolveData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect("/server-error");
        });
};

module.exports.movementForward = function (req, res) {
    console.log(req.params);
};
