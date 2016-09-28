app.controller('profileController',function(taskFactory,usersFactory,$location, $routeParams, $cookies){
  // console.log('params gives an object so that we can look at the profile even after refresh', $routeParams);
  
  var self = this
  self.profile_user;//which profile we are looking at
  self.activeUser;//for check if logged in
  self.current_profile = $routeParams.id

  var getTasks = function(id){
    usersFactory.show_id(id, function(user_from_factory){
      self.profile_user = user_from_factory
      // console.log('all profile tasks goes here ',self.profile_user);
    })
  }
  getTasks(self.current_profile)

  self.switch = function(id){
    // console.log(id);
    taskFactory.switch(id,function(){
      getTasks(self.profile_user._id)
    })
  }
})
console.log('all profile tasks goes here ',self.profile_user);
