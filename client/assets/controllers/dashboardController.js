app.controller('dashboardController', function(usersFactory,taskFactory, $location, $filter, $cookies, $route){
	var self = this;
	self.tasks = []
	self.users = [];
	self.activeUser = {};

	self.activeUser = $cookies.getObject('user');
	// console.log("Gives an object",self.activeUser)
	if(!self.activeUser){
		$location.url('/index');
		return 
	}

	// To get all tasks
	var getTasks = function(id){
	    usersFactory.show_id(id, function(user_from_factory){
	      self.tasks = user_from_factory._tasks
	      // console.log('self.tasks', self.tasks)
	    })
  	}
  	getTasks(self.activeUser._id)

	// Displaying all users
	var getUsers = function(){
		usersFactory.index(function(users_from_factory){
			self.users = users_from_factory.filter(function(item){
				return item.name !== self.activeUser.name;
			})
		})
	}
	getUsers()


	// Create Task
	self.create = function(){
		if(!self.tagged || !self.title || !self.description) return
			// console.log('Using the name key from object',self.activeUser.name )
		var new_task = {creator: self.activeUser.name, _creator: self.activeUser._id, title: self.title, description: self.description, complete: false, tagged: self.tagged}
					console.log('going to create')
		taskFactory.create(new_task, function(){
			// After Creating to make form_fields back empty
			self.title = ''
			self.description = ''
			self.tagged = ''
			// After Adding task, to display the newly added one we have to run getTasks fn again
			getTasks(self.activeUser._id)
			// console.log('auto relod so that ng-messages wont appear')
			$route.reload();
		})
	}

	// Checkbox switch
	self.switch = function(id){
    	taskFactory.switch(id,function(){
      	getTasks(self.activeUser._id)
    	})
  	}

  	//Logout and not returning to page back
  	self.logout = function(){
  		usersFactory.logout(function(data){
	    	$cookies.remove('user')
		    $location.url('/index');
		})
  	}

})