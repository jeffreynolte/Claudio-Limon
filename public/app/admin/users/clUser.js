angular.module('app').factory('clUser', function ($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"},{
      update : {method: 'PUT', isArray: false},
      delete_user: {method: 'DELETE'}
  });

  UserResource.prototype.isAdmin = function () {
    return this.roles && this.roles.indexOf('admin') > -1;
  }

  return UserResource;
})