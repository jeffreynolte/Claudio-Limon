'use strict';

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location, $http, $routeParams, $route, $rootScope) {
    
    
    // get all works
    if($location.$$path === "/work"){
      console.log("getting all work");      
      $http.get('/api/public/getAllWorks').success(function (data) {
        if(data.length > 0){
          $scope.worksByCategory = data;        
          $scope.featuredImages = [];                              
          // find our image in the collection with order = 0;
          _.find(data, function(data){            
            (data.images).forEach(function(img){
              if(img.order === 0){
                $scope.featuredImages.push(img);
              }
            })            
          })                    
        } else {
          $scope.noWorks = true;
          $scope.noWorksMessage = "Sorry there is no work in the category " + $routeParams.categoryName;
        }
      }).error(function (data, status) {
        console.log("Error: ", error );
        console.log("Status: ", status );
      })  
    }
    
    // get works by Cat
    if($routeParams.categoryName){
      console.log("calling cat:", $routeParams.categoryName);      
      $http.get('/api/public/getWorksByCat?cat='+$routeParams.categoryName).success(function (data) {
        if(data.length > 0){
          $scope.worksByCategory = data;        
          $scope.featuredImages = [];          
                    
          // find our image in the collection with order = 0;
          _.find(data, function(data){            
            (data.images).forEach(function(img){
              if(img.order === 0){
                $scope.featuredImages.push(img);
              }
            })            
          })                    
        } else {
          $scope.noWorks = true;
          $scope.noWorksMessage = "Sorry there is no work in the category " + $routeParams.categoryName;
        }
      }).error(function (data, status) {
        console.log("Error: ", error );
        console.log("Status: ", status );
      })  
    }    
    
    // get works single
    if($routeParams.workId){
      console.log("getting work by id:", $routeParams.workId)
      $http.get('/api/public/getWorkById?_id='+$routeParams.workId).success(function (data) {
        console.log(data);
        $scope.workDetail = data;        
      }).error(function (data, status) {
        console.log("Error: ", error );
        console.log("Status: ", status );
      })    
    }
    
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
    
    $scope.aboutSlides = ['/img/limon-about.jpg'];

    $scope.signout = function () {
        clAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            clNotifier.notify("You have successfully logged out");
            $location.path('/admin');
        })
    }
                    
});
