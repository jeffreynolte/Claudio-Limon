'use strict';

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location, $http, $routeParams) {
  
  console.log($routeParams.categoryName)
  
    // if($routeParams.categoryName){
      console.log("calling cat");
      $http.get('/api/public/worksCat/'+$routeParams.categoryName).success(function (data) {
        $scope.workCategory = data[0];
      }).error(function (data, status) {
        console.log("Error: ", error );
        console.log("Status: ", status );
      })
    
    // }
    
  
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
    
    $scope.quotes = [
      "Art must be a form to connect the one",
      "Art must be a form to connect the two",
      "Art must be a form to connect the three",
      "Art must be a form to connect the four",
      "Art must be a form to connect the five",    
    ]
        
    $scope.slides = [
      '/img/web-limon-01.jpg',
      '/img/web-limon-02.jpg',
      '/img/web-limon-03.jpg',
      '/img/web-limon-04.jpg',
      '/img/web-limon-05.jpg'
    ];
    
    $scope.quote = $scope.quotes[0];      
    
    $scope.parseSlideQuote = function () {
      var i = angular.element(".flex-active-slide").index()-1;
      $scope.quote = $scope.quotes[i];      
    }

});
