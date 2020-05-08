const mongoose = require('mongoose');

const {Schema} = mongoose;

const Log = new Schema({
    date : {
        type: Date
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
