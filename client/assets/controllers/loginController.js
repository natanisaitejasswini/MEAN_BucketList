app.controller('loginController', function(usersFactory,$location, $cookies){
  var self = this;
  self.newUser = {}
  self.activeUser = {}

    self.activeUser = $cookies.getObject('user');
    if (self.activeUser && self.activeUser.id) {
      $location.url('/dashboard ');
    }
    else{
      $location.url('/index')
    }

  // To login
  self.login = function(){
    var self = this
    if(!self.name) return;
    // console.log('name here is what we type in loginform', self.name)
    usersFactory.login(self.name, function(response_from_factory){
      $cookies.putObject('user',response_from_factory); // cookie thing using in dashboard
      $location.url('/dashboard')
    })
  }

  // Logging Out
  self.logout = function(){
    usersFactory.logout(function(){
      $cookies.remove('user')
      $location.url('/index');
    })
  }

});