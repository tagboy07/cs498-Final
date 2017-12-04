var express = require('express'),
  router = express.Router(),
  studentSchema = require('../models/student');


router.post('/student', function(req, res) {
	var studentData = {
		netid: req.body.netid,
		reviews: req.body.reviews || [],
		classes: req.body.classes || []
	}

	studentSchema.create(studentData, function(err, student) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			res.status(201).send({
				message: 'OK',
				data: student
			});
		}
	})
});

router.get('/student/:id', function(req, res){
    studentSchema.findById(req.params.id, function(err, student){
      if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			if(!student){
        		res.status(404).send({
          		message: 'student was not found',
          		data: student
        		});
      		}
      		else {
			res.status(200).send({
				message: "OK",
				data: student
			});
		}
		}
    });
  });

router.put('/student/:id', function(req, res) {
	var studentData = {
		netid: req.body.netid,
		reviews: req.body.reviews || [],
		classes: req.body.classes || []
	}

	studentSchema.findByIdAndUpdate(req.params.id, studentData, {new: true}, function(err, student){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			if(!student){
        		res.status(404).send({
          		message: 'Id was not found',
          		data: student
        		});
      		}
      		else {
			res.status(200).send({
				message: 'OK',
				data: student
			});
			}
		}
	});
});

module.exports = router;