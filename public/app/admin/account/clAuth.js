angular.module('app').factory('clAuth', function ($http, clIdentity, $q, clUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
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

        updateUser: function (newUserData) {
            console.log(newUserData);
            var dfd = $q.defer();
            var clone = angular.copy(clIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function () {
                console.log("updated user");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;

        },

        deleteUser: function (deleteUserData) {          
          var deleteUser = new clUser(deleteUserData);
          var dfd = $q.defer();

          deleteUser.$delete({_id: deleteUserData._id}).then(function () {
              console.log("deleted user");
              dfd.resolve();
          }, function (response) {
              dfd.reject(response.data.reason);
          });
          return dfd.promise;          
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                clIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if (clIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
})