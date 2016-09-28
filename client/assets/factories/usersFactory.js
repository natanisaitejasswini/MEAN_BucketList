app.factory('usersFactory', function($http, $location){
  var self = this;
  var factory = {}
  var users = []
  self.activeUser = '';

  // To get users from db
  factory.index = function(callback){
    $http.get('/users').success(function(users_from_db){
      callback(users_from_db)
      users = users_from_db
      // console.log('users are', users)
    })
  }

  // To return empty user from db
  factory.getActiveUser = function(callback){
    // console.log('It must be empty user befor logging in', self.activeUser)
    // console.log('It become user object after logging in', self.activeUser)
    callback(self.activeUser)
  }

  // To login: While logging im check user in db otherwise grab name and save in db
  factory.login = function(user,callback){
    var new_user= {name:user}
    $http.get('/user/'+user).success(function(data){
      self.activeUser = data
      // console.log('Above get method returns null for new user', self.activeUser)
      if(data == null){
        $http.post('/user',new_user).success(function(data){
          self.activeUser = data
          // console.log('Returns the user odject(Json) from post method', self.activeUser)
          callback(self.activeUser)
        })
      }
      else{
        callback(self.activeUser)
      }
    })
  }

  // logout
  factory.logout = function(callback){
    self.activeUser= {};
    callback(self.activeUser);
  }

  // Using all these to create task
  // Grabbing Id of user to display data of user 
  factory.show_id = function(id,callback){
    $http.get("/user_id/"+ id).success(function(data_from_db){
      // console.log('Task Before and After Adding', data_from_db)
      callback(data_from_db)
    })
  }
  return factory
  
})
  