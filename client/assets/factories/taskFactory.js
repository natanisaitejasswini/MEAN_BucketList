app.factory('taskFactory', function($http, $location){
	var factory = {}
	var tasks = []

	// To grab all tasks
	factory.index = function(callback){
		$http.get('tasks').success(function(task_from_db){
			callback(task_from_db)
			tasks = task_from_db
		})
	}
	
	// Creating task by going to post method
	factory.create = function(data, callback){
		if(data.title && data.description){
			$http.post('/task', data).success(function(response_from_server){
				callback()
			})
		}else callback({status: false})
	}

	// Checkboxes switch function
	factory.switch = function(id,callback){
	    // console.log('switch in factory', id);
	    $http.post('/complete/'+id).success(function(data){
	      callback()
	    })
 	}
 	
  	return factory
})