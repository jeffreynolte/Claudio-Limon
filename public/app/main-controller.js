'use strict';

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location) {
    $scope.identity = clIdentity;
    $scope.hideWorkInfo = true;

    $scope.toggleWorkInfo = function() {
      $scope.hideWorkInfo = !$scope.hideWorkInfo;
    };

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
