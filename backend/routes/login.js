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
		data: {}
	});
});

module.exports = router;