'use strict';

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location) {
    $scope.identity = clIdentity;
    $scope.myVar = "Hello Angular World";

    $scope.signout = function () {
        clAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            clNotifier.notify("You have successfully logged out");
            $location.path('/admin');
        })
    }
    
    $scope.slides = [
      '/img/web-limon-01.jpg',
      '/img/web-limon-02.jpg',
      '/img/web-limon-03.jpg',
      '/img/web-limon-04.jpg',
      '/img/web-limon-05.jpg'
    ];
});
