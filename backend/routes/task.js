var express = require('express');
var router = express.Router();
var task = require('../models/task');


router.get('/', function(request, response) {
  let findTarget = '';
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
  task.find(findTarget, function(error, tasks) {
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      })
    } else {
      if(countTarget){
          response.status(200).send({
          message: 'OK',
          data: tasks.length
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: tasks
        });
      }
    }
  }).sort(sortTarget).skip(skipTarget).select(selectTarget).skip(skipTarget).limit(limitTarget);
});


router.post('/', function(request, response) {
  let theTask = {
    name: request.body.name,
    description: request.body.description || '',
    deadline: request.body.deadline,
    completed: request.body.completed || false,
    assignedUser: request.body.assignedUser || '',
    assignedUserName: request.body.assignedUserName || "unassigned"
  };
  task.create(theTask, function(error, tasks) {
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      });
    } else {
      response.status(201).send({
        message: 'OK',
        data: tasks
      });
    }
  });
});

router.put('/:id', function(request, response){
  let thePost = {
    name: request.body.name,
    description: request.body.description || '',
    deadline: request.body.deadline,
    completed: request.body.completed || false,
    assignedUser: request.body.assignedUser || '',
    assignedUserName: request.body.assignedUserName || "unassigned"
  };
  task.findByIdAndUpdate(request.params.id, thePost,{new: true}, function(error, tasks) {
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      });
    } else {
      if(tasks == null){
        response.status(404).send({
        message: 'ID NOT FOUND',
        data: tasks
        });
      }
      else{
          response.status(200).send({
          message: 'OK',
          data: tasks
        });
      }
    }
  });
});

router.get('/:id', function(request, response) {
  task.findById(request.params.id, function(error, tasks) {
    if(error) {
      response.status(500).send({
        message: error,
        data: []
      })
    } else {
      if(tasks == null){
          response.status(404).send({
          message: 'ID NOT FOUND',
          data: tasks
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: tasks
        });
      }
    }
  });
});

router.delete('/:id', function(request, response) {
  task.findByIdAndRemove(request.params.id, function(error, tasks) {
    if(error) {
      response.status(404).send({
        message: error,
        data: []
      });
    } else {
      if(tasks == null ){
        response.status(404).send({
        message: 'ID NOT FOUND',
        data: tasks
        });
      }
      else{
        response.status(200).send({
          message: 'OK',
          data: tasks
        });
      }
    }
  });
});

module.exports = router;