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
        usernameField : 'username',
        passwordField : 'password'
    },
    function(username, password, done) {
      process.nextTick(function() {
        console.log('in passport lol')
        student.findOne({'username' : username}, function(err, user) {
            if ( err ) {
                console.log('checking error')
                return done(err);
            } else if ( user ) {
                console.log('no user found')
                return done(null, false);
            } else {
                console.log('in passpor auth')
                var newUser = new student();

                newUser.username = username;
                newUser.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if(err) {
                      return done(err);
                    }
                    return done(null, newUser);
                });
            }
        });
      })
    }));

    // Login Strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        student.findOne({'username': username}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));
};
