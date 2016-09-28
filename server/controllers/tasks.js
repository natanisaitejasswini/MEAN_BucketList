console.log('tasks controller');
require('../config/mongoose');
var mongoose = require('mongoose');
var User = mongoose.model('User')
var Task = mongoose.model('Task')

module.exports = (function(){
  return {
    index: function(request, response){
      Task.find({}, function(err,all_tasks){
        response.json(all_tasks)
      })
    },
    create: function(request, response){
      if(!request.body.tagged || !request.body.title || !request.body.description) return
      var new_task = new Task(request.body)
      new_task.save(function(err){
        if(err){
          console.log('err', err);
          response.json(err)
        }
        else {
          console.log('new_task',new_task);
          User.findOne({_id:new_task._creator}, function(err,user_creator){
            console.log('user_creator',user_creator);
            user_creator._tasks.push(new_task._id)
            user_creator.save(function(err){
              console.log('user_creator after save',user_creator);
              if (err) response.json(err)
              else if (request.body.tagged) {
                User.findOne({_id:request.body.tagged}, function(err,user_tagged){
                  console.log('user_tagged',user_tagged);
                  user_tagged._tasks.push(new_task._id)
                  user_tagged.save(function(err){
                    if (err) response.json(err)
                    else response.json({success:true})
                  })
                })
              }
              else{
                response.json({success:true})
              }
            })
          })
        }
      })
    },
    switch_complete: function(request,response){
      Task.findOne({_id:request.params.id}, function(err,task){
        console.log('results', task.complete);
        if(task.complete == false){
          task.complete = true
        }
        else{
          task.complete = false
        }
        task.save()
        response.json({status:true})
      })
    },
  }
})()

// To Create: a. Find new_task_creator in user if it present push taskId into that cretor(user)
// b. And save that user schema and we have to enter tasks into tagged user also
// c. Find TaggedUserId in user schema and push taksks again into that model also

// To Switch: a. find Id ot that task 
// b. if it is false make it true or else make it as false on selecting this particular function




