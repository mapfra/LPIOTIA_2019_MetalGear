'use strict';

const mongoose = require('mongoose');
// Require Logs model in our routes module
const eventLog = mongoose.model('logs');

module.exports.eventLogger = function (req, res) {
    let startDate = req.query.startDate || new Date(new Date() - (1000 * 60));
    let endDate = req.query.endDate || new Date();

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    eventLog.find({date: {
        "$gte" : startDate,
        "$lte" : endDate
    }}, (err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).send({error : err});
        }
        res.status(200).json(doc);
    });
};
