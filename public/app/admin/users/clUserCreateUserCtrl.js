angular.module('app').controller('clUserCreateUserCtrl', function($scope, clUser, clNotifier, $location, clAuth){
    $scope.createUser = function(){
      
        var newUserData = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.email,
            userName: $scope.username,
            password: $scope.password,
            role: $scope.role ? ['admin'] : ['']
        };
        
        clAuth.createUser(newUserData).then(function () {
          clNotifier.notify("User Account Created");
          $location.path('/admin/users');
        }, function (reason) {
          clNotifier.error(reason);
        })


    }
})