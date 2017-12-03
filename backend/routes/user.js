var express = require('express');
var router = express.Router();
var task = require('../models/task');
var user = require('../models/user');

router.get('/', function(request, response) {
  let findTarget =  '';
  let sortTarget = '';
  let selectTarget = '';
  let skipTarget = '';
  let limitTarget = '';
  let countTarget = false;
  if(request.query.where != null){
    findTarget = request.query.where;
    findTarget = JSON.parse(findTarget);
  }
  if(request.query.sort != null){
    sortTarget = request.query.sort;
    sortTarget = JSON.parse(sortTarget);
  }
  if(request.query.select != null){
    selectTarget = request.query.select;
    selectTarget = JSON.parse(selectTarget);
  }
  if(request.query.skip != null){
    skipTarget = request.query.skip;
    skipTarget = JSON.parse(skipTarget);
  }
  if(request.query.limit != null){
    limitTarget = request.query.limit;
    limitTarget = JSON.parse(limitTarget);
  }
  if(request.query.count != null){
    countTarget = request.query.count;
    countTarget = JSON.parse(countTarget);
  }
  user.find(findTarget, function(error, users) {
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      })
    } else {
      if(countTarget){
        response.status(200).send({
          message: 'OK',
          data: users.length
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: users
        });
      }
    }
  }).sort(sortTarget).skip(skipTarget).select(selectTarget).skip(skipTarget).limit(limitTarget);
});

router.post('/', function(request, response){
  let thePost = {
    name: request.body.name,
    email: request.body.email,
    pendingTasks: request.body.pendingTasks || []
  };
  user.create(thePost, function(error, users){
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      });
    } else {
      response.status(201).send({
        message: 'OK',
        data: users
      });
    }
  });
});

router.put('/:id', function(request, response){
  let thePost = {
    name: request.body.name,
    email: request.body.email,
    pendingTasks: request.body.pendingTasks || []
  };
  user.findByIdAndUpdate(request.params.id, thePost, {new: true}, function(error, users){
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      });
    } 
    else {
      if(users == null){
        response.status(404).send({
          message: 'ID NOT FOUND',
          data: users
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: users
        });
      }
    }
  });
});

router.get('/:id', function(request, response) {
  user.findById(request.params.id , function(error, users){
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      })
    } else {
      if(users == null){
        response.status(404).send({
          message: 'ID NOT FOUND',
          data: users
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: users
        });
      }
    }
  });
});

router.delete('/:id', function(request, response) {
  user.findByIdAndRemove(request.params.id, function(error, users) {
    if(error) {
      response.status(404).send({
        message: error,
        data: []
      });
    } else {
      if(users == null){
        response.status(404).send({
        message: 'ID NOT FOUND',
        data: users
      });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: users
        });
      }
    }
  });
});


module.exports = router;