angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
  var routeRoleChecks = {
    
    admin: {
      auth: function (clAuth) {
        return clAuth.authorizeCurrentUserForRoute('admin');
      }
    }    
  }
  
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {templateUrl: '/partials/admin/main', controller: 'mainCtrl'})
    .when('/admin/users', {templateUrl: '/partials/admin/users/index', 
      controller: 'clUserIndexCtrl', resolve: routeRoleChecks.admin    
    })
    .when('/admin/users/create', {templateUrl: '/partials/admin/users/create',
      controller: 'clUserCreateUserCtrl', resolve: routeRoleChecks.admin
    })
    .when('/admin/users/delete', {controller: 'clUserDeleteUserCtrl', 
      resolve: routeRoleChecks.admin
    })  
});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection ) {
    if(rejection === 'not authorized'){
      $location.path('/admin/index');
    }
  })
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