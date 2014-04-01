'use strict';

angular.module('app').controller('navCtrl', function ($scope, $http) {
  $scope.hideContact = true;

  $http.get('/api/public/settings').success(function(data) {
    $scope.settings = data[0];
  }).error(function(data, status) {
    console.warn('Error: ', status);
  });

  $scope.toggleContact = function() {
    $scope.hideContact = !$scope.hideContact;
  };
});
