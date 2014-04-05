'use strict';

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location, $http) {
  
    $scope.hideContact = true;

    $scope.identity = clIdentity;
    $scope.hideWorkInfo = true;

    $scope.toggleWorkInfo = function() {
      $scope.hideWorkInfo = !$scope.hideWorkInfo;
    };
    
    $scope.toggleContact = function() {
      $scope.hideContact = !$scope.hideContact;
    };
    
    $http.get('/api/public/settings').success(function(data) {
      $scope.settings = data[0];
    }).error(function(data, status) {
      console.warn('Error: ', status);
    });

    $scope.signout = function () {
        clAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            clNotifier.notify("You have successfully logged out");
            $location.path('/admin');
        })
    }

    $scope.aboutSlides = ['/img/limon-about.jpg'];

    $scope.slides = [
      '/img/web-limon-01.jpg',
      '/img/web-limon-02.jpg',
      '/img/web-limon-03.jpg',
      '/img/web-limon-04.jpg',
      '/img/web-limon-05.jpg'
    ];

});
