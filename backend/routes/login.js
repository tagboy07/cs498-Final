var express = require('express'),
  router = express.Router(),
  loginScheme = require('../models/login');


router.post('/', function(req, res) {

	let theLogin = {
	   netId: req.body.netId,
	   password: req.body.password 
	};

	res.status(200).send({
	message: 'OK',
	data: theLogin
	});

/*
	let word = ":)"
 	var PythonShell = require('python-shell');
	 
	PythonShell.run('auth.py', function (err) {
	  if (err)
	  	word = 'FAILED';
	  else
	  	word = 'GOOD';
	});

	sleep(10000).then(() => {
    	res.status(200).send({
		message: 'OK',
		data: word
		});
	})*/

});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


module.exports = router;