const mongoose = require('mongoose');

const {Schema} = mongoose;

const Log = Schema({
    date : {
        type: Date
    },
    id : {
        type: String,
        id: true
    },
    type : {
        type: String,
        required: true
    },
    data : {
        type: String,
        default: 1
    },
    origin : {
        type: String,
        default: "unknown"
    },
    orderTransOk : {
        type: Boolean,
        required: true
    },
    orderDoneWithoutError : {
        type: Boolean,
        required: true
    },
    errorMessage : {
        type: String
    },
    desc : {
        type: String
    }
}, {
    collection: 'logs'
});

module.exports = mongoose.model('logs', Log);
