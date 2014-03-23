angular.module('app').controller('clUserEditUserCtrl', function ($scope, clUser, clNotifier, $location, $routeParams, clAuth, clIdentity) {

  // check if current user is the same as user to be deleted
  $scope.sameUserCheck = function () {
    if($routeParams.userId === clIdentity.currentUser._id){
      return true;
    } else {
      return false;
    }
  }    
    
  //get the current user
  clUser.get({_id: $routeParams.userId }).$promise.then(function (user) {
    $scope.email = user.email;
    $scope.fname = user.firstName;
    $scope.lname = user.lastName;
    $scope.username = user.userName;

    if(user.roles.indexOf('admin') > -1){
      $scope.admin = 'YES';
    } else {
      $scope.admin = 'NO';
    }
  });

  // update our user with new info
  $scope.updateUser = function () {
    var newUserData = {
      _id: $routeParams.userId,
      firstName: $scope.fname,
      lastName: $scope.lname,
      email: $scope.email,
      userName: $scope.username,
      roles: $scope.admin ? ['admin'] : ['']
    };
    // if no new password is present do not update
    if($scope.password && $scope.password.length > 0){
      newUserData.password = $scope.password;
    }
    // promises and notification
    clAuth.updateUser(newUserData).then(function () {
      clNotifier.notify("Your user account has been updated");
      $location.path('/admin/users');
    }, function (reason) {
      clNotifier.error(reason);
    })
  }

  $scope.deleteUser = function () {
    
    var deleteUserData = {
      _id: $routeParams.userId,
      firstName: $scope.fname                 
    };
    
    clAuth.deleteUser(deleteUserData).then(function () {
      clNotifier.notify("User Deleted");
      $location.path('/admin/users');
    }, function (reason) {
      clNotifier.error(reason);
    })

    // clAuth.deleteUser({_id: deleteUserData._id }, function(){
    //   var deleteUserConfirm = confirm("Are you sure you would like to delete" + $scope.fname );
    //   if(!deleteUserConfirm) return;
    // 
    //   clNotifier.notify("User has been deleted");
    //   $location.path('/admin/users');
    // })    
    
    
    // clUser.delete({_id: deleteUserData._id }, function(){
    //   var deleteUserConfirm = confirm("Are you sure you would like to delete" + $scope.fname );
    //   if(!deleteUserConfirm) return;
    // 
    //   clNotifier.notify("User has been deleted");
    //   $location.path('/admin/users');
    // })
      

  }

});



