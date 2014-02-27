angular.module('app').controller('clUserIndexCtrl', function($scope, clUser){
  $scope.users = clUser.query();
});