'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose'),
    validator = require('validator'),
    Schema = mongoose.Schema;

/**
 * Validation Strategies
 */

let validatePromocodeReference = function (reference) {
    return !validator.isEmpty(reference, {ignore_whitespace:true}) && validator.isAlphanumeric(reference);
};

let validatePromocodeDesc = function (desc) {
    return !validator.isEmpty(desc, {ignore_whitespace:true}) && !validator.isWhitelisted(desc, ['']); // Write here the characters you don't want to see in promocode desc
};

/**
 * Promocode Schema
 */
let PromocodeSchema = new Schema({
    reference: {
        type: String,
        trim: true,
        unique: true,
        required : [true, 'Please fill in a valid reference'],
        validate: [validatePromocodeReference, 'Please fill in the promocode reference correctly']
    },
    description: {
        type: String,
        default: '',
        validate: [validatePromocodeDesc, 'Please fill in a correct description']
    },
    validityStartDate: {
        type: Date,
        default: Date.now
    },
    validityEndDate: {
        type: Date,
        default: Number(new Date()) + 12 * 31 * 7 * 24 * 60 * 60 * 1000,
        validate: {
            validator (v) {
                return validator.isAfter(v.toString(), this.validityStartDate.toString());
            },
            message: 'Validity end date should be in future'
        }
    },
    amount: {
        type: Number,
        required: 'Please specify an Amount',
        validate: {
            validator (v) {
                return validator.isInt(v.toString()) && v > 0;
            },
            message: 'Amount needs to be an integer and positive'
        }
    },
    validityDuration: {
        type: Number,
        validate: {
            validator (v) {
                return validator.isInt(v.toString()) && v >= 0;
            },
            message: 'Validity Duration needs to be an integer and positive'
        }
    },
    numberOfUses: {
        type: Number,
        default: 0,
        validate: {
            validator (v) {
                return validator.isInt(v.toString()) && v >= 0;
            },
            message: 'Number of uses needs to be an integer and equal or superior to 0'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
}, {collection:'Promocodes'});

/**
 * Hook a pre save method
 */
PromocodeSchema.pre('save', (next) => {


    next();
});

/**
 * Hook a pre validate method
 */
PromocodeSchema.pre('validate', (next) => {


    next();
});

/**
 * Find possible not used reference
 */
PromocodeSchema.statics.findUniquePromocodeReference = function (reference, suffix, callback) {
    let _this = this;
    let possibleReference = reference.toLowerCase() + (suffix || '');

    _this.findOne({
        reference: possibleReference
    }, (err, promocode) => {
        if (!err) {
            if (!promocode) {
                callback(possibleReference);
            } else {
                return _this.findUniquePromocodeReference(reference, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('Promocode', PromocodeSchema);
