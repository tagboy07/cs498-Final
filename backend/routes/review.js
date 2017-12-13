var express = require('express'),
  router = express.Router(),
  ReviewSchema = require('../models/review'),
  ClassSchema = require('../models/class'),
  StudentSchema = require('../models/student'),
  ObjectId = require('mongodb').ObjectID;

router.post('/', function(req, res) {
	var classSearch = {
		number: req.body.class.classNum,
		major: req.body.class.className
	}
	ClassSchema.findOne(classSearch, function(err, revClass) {
    if(err ) {
      res.status(400).send({
        message: err,
        data: []
      });
    }
    else {
      var reviewData = {
        username: req.body.username,
        class: (revClass || {})._id,
        classNumber: req.body.classNum,
        classMajor: req.body.className,
        quality: req.body.quality,
        difficulty: req.body.difficulty,
        hours: req.body.hours,
        comment: req.body.comment,
        anon: req.body.anon,
        dateCreated: req.body.dateCreated
      }
      console.log(reviewData)
      ReviewSchema.create(reviewData, function(err, review) {
        if(err) {
    			res.status(500).send({
    				message: err,
    				data: []
    			});
    		} else {
          console.log(review)
          const id = ObjectId(review._id)
          StudentSchema.findOneAndUpdate({username: req.body.username},  { $push: { reviews: id }}, function(err, student) {
            if(err) {
        			res.status(500).send({
        				message: err,
        				data: []
        			});
        		}
            else {
              ClassSchema.findOneAndUpdate(classSearch, {$push: {reviews: id }}, function(err, classobj){
            		if(err){
            				res.status(500).send({
            				messages: err,
            				data: []
            			});
            		} else {
            				res.status(200).send({
            				message: "OK",
            				data: review
            			});
            		}
            	});
            }
          });
        }
      });
    }
  });
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
	ReviewSchema.findByIdAndRemove( req.params.id, function(err, review){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
    }
    else {
			ClassSchema.findOneAndUpdate(review.class, { $pullAll: {reviews: [req.params.id] } }, function(err, classObj) {
					if(err) {
						res.status(500).send({
						messages: err,
						data: []
						});
					}
					else {
						StudentSchema.findOneAndUpdate({username:review.username}, { $pullAll: {reviews: [req.params.id] } }, function(err, student) {
							if(err) {
								res.status(500).send({
									messages: err,
									data: []
								});
							}
							else{
								res.status(200).send({
									message: 'OK',
									data: review
								});
							}
						});
				 }
			});
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
})

module.exports = router;
