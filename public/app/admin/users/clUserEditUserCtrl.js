angular.module('app').controller('clUserEditUserCtrl', function ($scope, clUser, clNotifier, $location, $routeParams, clAuth) {




    //get the current user
    clUser.get({_id: $routeParams.userId }).$promise.then(function (user) {
        $scope.email = user.email;
        $scope.fname = user.firstName;
        $scope.lname = user.lastName;
        $scope.username = user.userName;

        //sim
        if(user.roles.indexOf('admin') > -1){
            $scope.admin = 'YES';
        } else {
            $scope.admin = 'NO';
        }
    });


    $scope.updateUser = function () {
        var newUserData = {
            _id: $routeParams.userId,
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.email,
            userName: $scope.username,
            roles: $scope.admin ? ['admin'] : ['']
        };

        if($scope.password && $scope.password.length > 0){
            newUserData.password = $scope.password;
        }

        clAuth.updateUser(newUserData).then(function () {
            clNotifier.notify("Your user account has been updated");
            $location.path('/admin/users');
        }, function (reason) {
            clNotifier.error(reason);
        })
    }

});