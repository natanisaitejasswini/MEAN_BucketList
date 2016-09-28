var app = angular.module('app', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/index',{
    templateUrl: 'partials/login.html',
  })
  .when('/dashboard',{
    templateUrl: 'partials/dashboard.html'
  })
  .when('/user/:id',{
    templateUrl:'partials/user.html'
  })
  .otherwise({
    redirectTo:'/index'
  });
});