var express = require('express'),
  router = express.Router(),
  ReviewSchema = require('../models/review'),
  ClassSchema = require('../models/class');
  StudentSchema = require('../models/student');

router.post('/', function(req, res) {
	var classSearch = {
		number: req.body.classNum,
		major: req.body.className
	}
	var theClass = ClassSchema.findOne(classSearch)
	var reviewData = {
		username: req.body.username,
		class: theClass._id,
		quality: req.body.quality,
		difficulty: req.body.difficulty,
		hours: req.body.hours,
		comment: req.body.comment,
		anon: req.body.anon,
		dateCreated: req.body.dateCreated,
	}
  	var createdReview = ReviewSchema.insert(reviewData)
  	var updatedArray = theClass.reviews.push(createdReview._id)

  	StudentSchema.findOneAndUpdate({username: req.body.username},  { $push: { reviews: createdReview._id }})
	ClassSchema.findOneAndUpdate(classSearch, {reviews: updatedArray}, {new:true} , function(err, Class){
		if(err){
				res.status(500).send({
				messages: err,
				data: []
			});

		} else {
				res.status(200).send({
				message: "OK",
				data: createdReview
			});	
		}
	})


});

router.get('/:id', function(req, res){

    ReviewSchema.findById(req.params.id, function(err, review){
      if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			if(!review){
        		res.status(404).send({
          		message: 'Review was not found',
          		data: review
        		});
      		}
      		else {
			res.status(200).send({
				message: "OK",
				data: review
			});
		}
		}
    });
  });

router.get('/', function(req, res) {
	var whereQ = req.query.where != null ? JSON.parse(req.query.where) : '';

	ReviewSchema.find(whereQ, function(err, review) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			res.status(200).send({
				message: 'OK',
				data: review
			});
		}
	})
});

router.delete('/:id', function(req, res){
	ReviewSchema.findByIdAndRemove(req.params.id, function(err, review){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			if(!review){
        		res.status(404).send({
          		message: 'Review was not found',
          		data: review
        		});
      		}
      		else {
			res.status(200).send({
				message: "resource deleted",
				data: review
			});
		}
		}
	});
});

router.put('/:id', function(req, res) {
	var reviewData = {
		username: req.body.username,
		class: req.body.class,
		quality: req.body.quality,
		difficulty: req.body.difficulty,
		hours: req.body.hours,
		comment: req.body.comment,
		anon: req.body.anon,
		dateCreated: req.body.dateCreated,
	}

	ReviewSchema.findByIdAndUpdate(req.params.id, reviewData, {new: true}, function(err, review){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			if(!review){
        		res.status(404).send({
          		message: 'Id was not found',
          		data: review
        		});
      		}
      		else {
			res.status(200).send({
				message: 'OK',
				data: review
			});
			}
		}
	});
});

module.exports = router;
