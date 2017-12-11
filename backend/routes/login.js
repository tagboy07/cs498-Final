var passport = require('passport');
var express = require('express'),
loginScheme = require('../models/login');


module.exports = function(router, passport) {
  // router.post('/register', passport.authenticate('local-signup', {
  //     successRedirect : '/login',
  //     failureRedirect : '/register',
  //     failureFlash : true
  // }));

  router.post('/register', function(req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    console.log(req.body)
    var errors = false;//req.validationErrors();
    if (errors) {
      res.render('signup',{user:null,frm_messages:errors});
    } else {
      passport.authenticate('local-signup', {session: false}, function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
            return res.status(401).json({
              error: 'Auth Error!'
            });
        }
        res.status(200).json({ user: req.body.username});
      })(req,res, next);// <---- ADDD THIS
    }
  });

  router.post('/login', passport.authenticate('local-login'), function(req, res) {
    console.log("asdfasdfasf")
    console.log(req.isAuthenticated());
    res.status(200).json({user: req.body.username});
  });


  router.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.isAuthenticated());
    res.status(200).json({ user: req.user, message: "Welcome!"
  });
});

router.get('/logout', function(req, res) {
  req.logOut();
  res.status(200).json({ message: "logged out "});
});

return router
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "unable to auth" });
}
