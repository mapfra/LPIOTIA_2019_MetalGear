'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validator = require('validator'),
    generatePassword = require('generate-password'),
    owasp = require('owasp-password-strength-test');

/**
 * A Validation function for local strategy properties
 */
let validateLocalStrategyProperty = function (property) {
    return this.provider !== 'local' && (!this.updated || property.length);
};

/**
 * A Validation function for local strategy email
 */
let validateLocalStrategyEmail = function (email) {
    return this.provider !== 'local' && (!this.updated || validator.isEmail(email));
};

/**
 * User Schema
 */
let UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: 'modules/users/client/img/profile/default.png'
    },
    provider: {
        type: String,
        default: 'local'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [
            {
                type: String,
                enum: ['user', 'admin', 'guest']
            }
        ],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },

    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, {collection:'Users'});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
    if (this.provider === 'local' && this.password && this.isModified('password')) {
        let result = owasp.test(this.password);

        if (result.errors.length) {
            let error = result.errors.join(' ');

            this.invalidate('password', error);
        }
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer.from(this.salt, 'base64'), 10000, 64, 'sha512').toString('base64');
    }
    return password;

};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    let possibleUsername = username.toLowerCase() + (suffix || '');

    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
        return 0;
    });
};

/**
 * Generates a random passphrase that passes the owasp test.
 * Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
 * NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
 */
UserSchema.statics.generateRandomPassphrase = function () {
    return new Promise((resolve, reject) => {
        let password = '';
        let repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

        /*
         * Iterate until the we have a valid passphrase.
         * NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present.
         */
        while (password.length < 20 || repeatingCharacters.test(password)) {
            // Build the random password
            password = generatePassword.generate({
                length: Math.floor(Math.random() * 20) + 20, // Randomize length between 20 and 40 characters
                numbers: true,
                symbols: false,
                uppercase: true,
                excludeSimilarCharacters: true
            });

            // Check if we need to remove any repeating characters.
            password = password.replace(repeatingCharacters, '');
        }

        // Send the rejection back if the passphrase fails to pass the strength test
        if (owasp.test(password).errors.length) {
            reject(new Error('An unexpected problem occurred while generating the random passphrase'));
        } else {
            // Resolve with the validated passphrase
            resolve(password);
        }
    });
};

mongoose.model('User', UserSchema);
