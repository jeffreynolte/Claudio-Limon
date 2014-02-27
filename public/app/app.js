angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {templateUrl: '/partials/admin/main', controller: 'mainCtrl'})
    .when('/admin/users', {templateUrl: '/partials/admin/users/index', controller: 'clUserIndexCtrl'})
    
});

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location) {
  $scope.identity = clIdentity;
  $scope.myVar = "Hello Angular World";
  
  $scope.signout = function(){ 
    clAuth.logoutUser().then(function () {
      $scope.username = "";
      $scope.password = "";
      clNotifier.notify("You have successfully logged out");
      $location.path('/');
    })    
  }
});