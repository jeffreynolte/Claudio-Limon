angular.module('app').factory('clAuth', function ($http, clIdentity, $q, clUser) {
  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function (response) {
        if(response.data.success){
          var user = new clUser();
          angular.extend(user, response.data.user);
          clIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    
    createUser: function (newUserData) {
      var newUser = new clUser(newUserData);
      var dfd = $q.defer();
      
      newUser.$save().then(function () {
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    
    logoutUser: function () {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        clIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
      // body...
    },
    authorizeCurrentUserForRoute: function (role) {
      if (clIdentity.isAuthorized(role)){
        return true;          
      } else {
        return $q.reject('not authorized');
      }
    }
  }
})