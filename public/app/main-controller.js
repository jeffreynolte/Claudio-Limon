'use strict';

angular.module('app').controller('mainCtrl', function ($scope, $window, $location, $http, $routeParams, $route, $rootScope) {
    
    
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
    
    if($window.document.width <= 320){
      $scope.hideMobileNav = true;      
      $scope.hideWorkInfo = false;
    } else {
      $scope.hideMobileNav = false;      
    }

    $scope.toggleContact = function() {
      $scope.hideContact = !$scope.hideContact;
    };    

    $scope.toggleWorkInfo = function() {
      $scope.hideWorkInfo = !$scope.hideWorkInfo;
    };
    
    $scope.toggleMobileNav = function () {
      console.log("toggle");
      $scope.hideMobileNav = !$scope.hideMobileNav;
    }

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
                    
});
