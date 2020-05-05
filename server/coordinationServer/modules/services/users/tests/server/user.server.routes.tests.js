'use strict';

let should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    server = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
let _user, admin, agent, app, credentials, user;

/**
 * User routes tests
 */
describe('User CRUD tests', () => {

    before((done) => {
    // Get application
        app = server.init(mongoose.connection);
        agent = request(app);

        done();
    });

    beforeEach((done) => {
    // Create user credentials
        credentials = {
            username: 'username',
            password: 'M3@n.jsI$Aw3$0m3'
        };

        // Create a new user
        _user = {
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        };

        user = new User(_user);

        // Save a user to the test db and create new article
        user.save((err) => {
            should.not.exist(err);
            done();
        });
    });

    it('should be able to register a new user', (done) => {

        _user.username = 'register_new_user';
        _user.email = 'register_new_user_@test.com';

        agent.post('/auth/signup')
            .send(_user)
            .expect(200)
            .end((signupErr, signupRes) => {
                // Handle signpu error
                if (signupErr) {
                    return done(signupErr);
                }

                signupRes.body.username.should.equal(_user.username);
                signupRes.body.email.should.equal(_user.email);
                // Assert a proper profile image has been set, even if by default
                signupRes.body.profileImageURL.should.not.be.empty();
                // Assert we have just the default 'user' role
                signupRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
                signupRes.body.roles.indexOf('user').should.equal(0);
                return done();
            });
    });

    it('should be able to login successfully and logout successfully', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Logout
                agent.get('/auth/signout')
                    .expect(302)
                    .end((signoutErr, signoutRes) => {
                        if (signoutErr) {
                            return done(signoutErr);
                        }

                        signoutRes.redirect.should.equal(true);

                        /*
                         * NodeJS v4 changed the status code representation so we must check
                         * Before asserting, to be comptabile with all node versions.
                         */
                        if (process.version.indexOf('v4') !== 0) {
                            signoutRes.text.should.equal('Found. Redirecting to /');
                        } else {
                            signoutRes.text.should.equal('Moved Temporarily. Redirecting to /');
                        }

                        return done();
                    });
            });
    });

    it('should not be able to retrieve a list of users if not admin', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Request list of users
                agent.get('/api/users')
                    .expect(403)
                    .end((usersGetErr, usersGetRes) => {
                        if (usersGetErr) {
                            return done(usersGetErr);
                        }

                        return done();
                    });
            });
    });

    it('should be able to retrieve a list of users if admin', (done) => {
        user.roles = ['user', 'admin'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    // Request list of users
                    agent.get('/api/users')
                        .expect(200)
                        .end((usersGetErr, usersGetRes) => {
                            if (usersGetErr) {
                                return done(usersGetErr);
                            }

                            usersGetRes.body.should.be.instanceof(Array).and.have.lengthOf(1);

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('should be able to get a single user details if admin', (done) => {
        user.roles = ['user', 'admin'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    // Get single user information from the database
                    agent.get('/api/users/' + user._id)
                        .expect(200)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            userInfoRes.body.should.be.instanceof(Object);
                            userInfoRes.body._id.should.be.equal(String(user._id));

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('should be able to update a single user details if admin', (done) => {
        user.roles = ['user', 'admin'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    // Get single user information from the database

                    let userUpdate = {
                        firstName: 'admin_update_first',
                        lastName: 'admin_update_last',
                        roles: ['admin']
                    };

                    agent.put('/api/users/' + user._id)
                        .send(userUpdate)
                        .expect(200)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            userInfoRes.body.should.be.instanceof(Object);
                            userInfoRes.body.firstName.should.be.equal('admin_update_first');
                            userInfoRes.body.lastName.should.be.equal('admin_update_last');
                            userInfoRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
                            userInfoRes.body._id.should.be.equal(String(user._id));

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('should be able to delete a single user if admin', (done) => {
        user.roles = ['user', 'admin'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    agent.delete('/api/users/' + user._id)
                    // .send(userUpdate)
                        .expect(200)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            userInfoRes.body.should.be.instanceof(Object);
                            userInfoRes.body._id.should.be.equal(String(user._id));

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('forgot password should return 400 for non-existent username', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: 'some_username_that_doesnt_exist'
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    res.body.message.should.equal('No account with that username has been found');
                    return done();
                });
        });
    });

    it('forgot password should return 400 for no username provided', (done) => {
        let provider = 'facebook';

        user.provider = provider;
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: ''
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    res.body.message.should.equal('Username field must not be blank');
                    return done();
                });
        });
    });

    it('forgot password should return 400 for non-local provider set for the user object', (done) => {
        let provider = 'facebook';

        user.provider = provider;
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: user.username
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    res.body.message.should.equal('It seems like you signed up using your ' + user.provider + ' account');
                    return done();
                });
        });
    });

    it('forgot password should be able to reset password for user password reset request', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: user.username
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    User.findOne({username: user.username.toLowerCase()}, (err, userRes) => {
                        userRes.resetPasswordToken.should.not.be.empty();
                        should.exist(userRes.resetPasswordExpires);
                        res.body.message.should.be.equal('Failure sending email');
                        return done();
                    });
                });
        });
    });

    it('forgot password should be able to reset the password using reset token', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: user.username
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    User.findOne({username: user.username.toLowerCase()}, (err, userRes) => {
                        userRes.resetPasswordToken.should.not.be.empty();
                        should.exist(userRes.resetPasswordExpires);

                        agent.get('/auth/reset/' + userRes.resetPasswordToken)
                            .expect(302)
                            .end((err, res) => {
                                // Handle error
                                if (err) {
                                    return done(err);
                                }
                                res.headers.location.should.be.equal('/password/reset/' + userRes.resetPasswordToken);
                                return done();
                            });
                    });
                });
        });
    });

    it('forgot password should return error when using invalid reset token', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/forgot')
                .send({
                    username: user.username
                })
                .expect(400)
                .end((err, res) => {
                    // Handle error
                    if (err) {
                        return done(err);
                    }

                    let invalidToken = 'someTOKEN1234567890';

                    agent.get('/auth/reset/' + invalidToken)
                        .expect(302)
                        .end((err, res) => {
                            // Handle error
                            if (err) {
                                return done(err);
                            }
                            res.headers.location.should.be.equal('/password/reset/invalid');
                            return done();
                        });
                });
        });
    });

    it('should be able to change user own password successfully', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Change password
                agent.post('/api/users/password')
                    .send({
                        newPassword: '1234567890Aa$',
                        verifyPassword: '1234567890Aa$',
                        currentPassword: credentials.password
                    })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        res.body.message.should.equal('Password changed successfully');
                        return done();
                    });
            });
    });

    it('should not be able to change user own password if wrong verifyPassword is given', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Change password
                agent.post('/api/users/password')
                    .send({
                        newPassword: '1234567890Aa$',
                        verifyPassword: '1234567890-ABC-123-Aa$',
                        currentPassword: credentials.password
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        res.body.message.should.equal('Passwords do not match');
                        return done();
                    });
            });
    });

    it('should not be able to change user own password if wrong currentPassword is given', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Change password
                agent.post('/api/users/password')
                    .send({
                        newPassword: '1234567890Aa$',
                        verifyPassword: '1234567890Aa$',
                        currentPassword: 'some_wrong_passwordAa$'
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        res.body.message.should.equal('Current password is incorrect');
                        return done();
                    });
            });
    });

    it('should not be able to change user own password if no new password is at all given', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Change password
                agent.post('/api/users/password')
                    .send({
                        newPassword: '',
                        verifyPassword: '',
                        currentPassword: credentials.password
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        res.body.message.should.equal('Please provide a new password');
                        return done();
                    });
            });
    });

    it('should not be able to change user own password if no new password is at all given', (done) => {

        // Change password
        agent.post('/api/users/password')
            .send({
                newPassword: '1234567890Aa$',
                verifyPassword: '1234567890Aa$',
                currentPassword: credentials.password
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                res.body.message.should.equal('User is not signed in');
                return done();
            });
    });

    it('should be able to get own user details successfully', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Get own user details
                agent.get('/api/users/me')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        res.body.should.be.instanceof(Object);
                        res.body.username.should.equal(user.username);
                        res.body.email.should.equal(user.email);
                        should.not.exist(res.body.salt);
                        should.not.exist(res.body.password);
                        return done();
                    });
            });
    });

    it('should not be able to get any user details if not logged in', (done) => {
    // Get own user details
        agent.get('/api/users/me')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                should.not.exist(res.body);
                return done();
            });
    });

    it('should be able to update own user details', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    let userUpdate = {
                        firstName: 'user_update_first',
                        lastName: 'user_update_last'
                    };

                    agent.put('/api/users')
                        .send(userUpdate)
                        .expect(200)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            userInfoRes.body.should.be.instanceof(Object);
                            userInfoRes.body.firstName.should.be.equal('user_update_first');
                            userInfoRes.body.lastName.should.be.equal('user_update_last');
                            userInfoRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
                            userInfoRes.body.roles.indexOf('user').should.equal(0);
                            userInfoRes.body._id.should.be.equal(String(user._id));

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('should not be able to update own user details and add roles if not admin', (done) => {
        user.roles = ['user'];

        user.save((err) => {
            should.not.exist(err);
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    let userUpdate = {
                        firstName: 'user_update_first',
                        lastName: 'user_update_last',
                        roles: ['user', 'admin']
                    };

                    agent.put('/api/users')
                        .send(userUpdate)
                        .expect(200)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            userInfoRes.body.should.be.instanceof(Object);
                            userInfoRes.body.firstName.should.be.equal('user_update_first');
                            userInfoRes.body.lastName.should.be.equal('user_update_last');
                            userInfoRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
                            userInfoRes.body.roles.indexOf('user').should.equal(0);
                            userInfoRes.body._id.should.be.equal(String(user._id));

                            // Call the assertion callback
                            return done();
                        });
                });
        });
    });

    it('should not be able to update own user details with existing username', (done) => {

        let _user2 = _user;

        _user2.username = 'user2_username';
        _user2.email = 'user2_email@test.com';

        let credentials2 = {
            username: 'username2',
            password: 'M3@n.jsI$Aw3$0m3'
        };

        _user2.username = credentials2.username;
        _user2.password = credentials2.password;

        let user2 = new User(_user2);

        user2.save((err) => {
            should.not.exist(err);

            agent.post('/auth/signin')
                .send(credentials2)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    let userUpdate = {
                        firstName: 'user_update_first',
                        lastName: 'user_update_last',
                        username: user.username
                    };

                    agent.put('/api/users')
                        .send(userUpdate)
                        .expect(400)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            // Call the assertion callback
                            userInfoRes.body.message.should.equal('Username already exists');

                            return done();
                        });
                });
        });
    });

    it('should not be able to update own user details with existing email', (done) => {

        let _user2 = _user;

        _user2.username = 'user2_username';
        _user2.email = 'user2_email@test.com';

        let credentials2 = {
            username: 'username2',
            password: 'M3@n.jsI$Aw3$0m3'
        };

        _user2.username = credentials2.username;
        _user2.password = credentials2.password;

        let user2 = new User(_user2);

        user2.save((err) => {
            should.not.exist(err);

            agent.post('/auth/signin')
                .send(credentials2)
                .expect(200)
                .end((signinErr, signinRes) => {
                    // Handle signin error
                    if (signinErr) {
                        return done(signinErr);
                    }

                    let userUpdate = {
                        firstName: 'user_update_first',
                        lastName: 'user_update_last',
                        email: user.email
                    };

                    agent.put('/api/users')
                        .send(userUpdate)
                        .expect(400)
                        .end((userInfoErr, userInfoRes) => {
                            if (userInfoErr) {
                                return done(userInfoErr);
                            }

                            // Call the assertion callback
                            userInfoRes.body.message.should.equal('Email already exists');

                            return done();
                        });
                });
        });
    });

    it('should not be able to update own user details if not logged-in', (done) => {
        user.roles = ['user'];

        user.save((err) => {

            should.not.exist(err);

            let userUpdate = {
                firstName: 'user_update_first',
                lastName: 'user_update_last'
            };

            agent.put('/api/users')
                .send(userUpdate)
                .expect(400)
                .end((userInfoErr, userInfoRes) => {
                    if (userInfoErr) {
                        return done(userInfoErr);
                    }

                    userInfoRes.body.message.should.equal('User is not signed in');

                    // Call the assertion callback
                    return done();
                });
        });
    });

    it('should not be able to update own user profile picture without being logged-in', (done) => {

        agent.post('/api/users/picture')
            .send({})
            .expect(400)
            .end((userInfoErr, userInfoRes) => {
                if (userInfoErr) {
                    return done(userInfoErr);
                }

                userInfoRes.body.message.should.equal('User is not signed in');

                // Call the assertion callback
                return done();
            });
    });

    it('should be able to change profile picture if signed in', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                agent.post('/api/users/picture')
                    .attach('newProfilePicture', './modules/uploads/users/img/profiles/default.png')
                    .send(credentials)
                    .expect(200)
                    .end((userInfoErr, userInfoRes) => {
                        // Handle change profile picture error
                        if (userInfoErr) {
                            return done(userInfoErr);
                        }

                        userInfoRes.body.should.be.instanceof(Object);
                        userInfoRes.body.profileImageURL.should.be.a.String();
                        userInfoRes.body._id.should.be.equal(String(user._id));

                        return done();
                    });
            });
    });

    it('should not be able to change profile picture if attach a picture with a different field name', (done) => {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end((signinErr, signinRes) => {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                agent.post('/api/users/picture')
                    .attach('fieldThatDoesntWork', './modules/uploads/users/img/profiles/default.png')
                    .send(credentials)
                    .expect(400)
                    .end((userInfoErr, userInfoRes) => {
                        done(userInfoErr);
                    });
            });
    });

    afterEach((done) => {
        User.remove().exec(done);
    });
});
