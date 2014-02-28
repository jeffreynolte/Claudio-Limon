angular.module('app').controller('clLoginFormCtrl', function($scope, $http, clIdentity, clNotifier, clAuth){
  $scope.identity = clIdentity;
  $scope.signin = function (username, password) {
    clAuth.authenticateUser(username, password).then(function (success) {
      if(success){
        clNotifier.notify("you have successfully logged in");
      } else {
        clNotifier.notify("user / pass incorrect");        
      }      
    });
  }  
})