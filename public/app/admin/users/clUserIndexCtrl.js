angular.module('app').controller('clUserIndexCtrl', function($scope, clUser){
  $scope.users = clUser.query();
  
  $scope.deleteUser = function(){
    console.log("delete user called");
    console.log($
    );
    console.log($scope.users);
  }

  
});