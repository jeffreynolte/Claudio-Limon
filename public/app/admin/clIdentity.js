angular.module('app').factory('clIdentity', function ($window, clUser) {
  var currentUser;
  if (!!$window.bootstrappedUserObject) {
    currentUser = new clUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function () {
      return !!this.currentUser;
    }
  }
})