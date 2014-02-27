angular.module('app').factory('clUser', function ($resource) {
  // var UserResource = $resource('/api/users/:id', {_id: "@id"});
  var UserResource = $resource('/api/users');
  
  UserResource.prototype.isAdmin = function () {
    return this.roles && this.roles.indexOf('admin') > -1;
  }
  
  return UserResource;
})