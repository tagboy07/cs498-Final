var express = require('express'),
  router = express.Router(),
  ClassSchema = require('../models/class');


router.get('/', function(req, res) {
	var whereQ = req.query.where != null ? JSON.parse(req.query.where) : '';

	ClassSchema.find(whereQ, function(err, classInfo) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			res.status(200).send({
				message: 'OK',
				data: classInfo
			});
		}
	})
});

module.exports = router;
