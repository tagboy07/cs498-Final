var LocalStrategy = require('passport-local').Strategy;
var student = require('../models/student');

/**
* Specifies what strategy we'll use
*/
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        student.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Registration Strategy
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    },
    function(email, password, done) {
        student.findOne({'email' : email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( user ) {
                return done(null, false);
            } else {
                var newUser = new student();

                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    return done(null, newUser);
                });
            }
        });
    }));

    // Login Strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        student.findOne({'email': email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));
};