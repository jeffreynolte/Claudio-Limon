'use strict';

angular.module('app').controller('navCtrl', function ($scope) {
  $scope.hideContact = true;

  $scope.toggleContact = function() {
    $scope.hideContact = !$scope.hideContact;
  };
});
