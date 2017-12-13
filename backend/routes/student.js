var express = require('express'),
  router = express.Router(),
  ClassSchema = require('../models/class'),
  studentSchema = require('../models/student');


router.post('/', function(req, res) {
	var studentData = {
		username: req.body.username,
		password: req.body.password,
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

router.post('/class/:id', function(req, res) {
	const id = req.params.id;
	studentSchema.findOneAndUpdate({username: req.body.username},  { $push: { classes: id }}, function(err, student) {
		if(err) {
    			res.status(500).send({
    				message: err,
    				data: []
    			});
    		}
    	else {
			res.status(201).send({
				message: 'OK',
				data: student
			});
		}
	})
});

router.get('/', function(req, res){

	var whereQ = req.query.where != null ? JSON.parse(req.query.where) : '';
    studentSchema.find(whereQ, function(err, student) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			res.status(200).send({
				message: 'OK',
				data: student
			});
		}
	})
  });


router.get('/:id', function(req, res){
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

router.get('/:user/classes', function(req, res) {
	studentSchema.findOne({username: req.params.user}, function(err, student) {
    	if(err) {
    		res.status(500).send({
    			message: err,
    			data: []
    		});
    	}
    	else{
    		ClassSchema.find({
    			'_id': { $in: [
    				student.classes
    				]}
    		}, function(err, classesArray) {
    			if(err) {
    				res.status(500).send({
    				message: err,
    				data: []
    				});
    			}
    			else {
    				res.status(200).send({
    					message: 'OK',
    					data: classesArray
    				});
    			}
    		});
    	}
    });

});

router.put('/:id', function(req, res) {
	var studentData = {
		username: req.body.username,
		password: req.body.password,
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
