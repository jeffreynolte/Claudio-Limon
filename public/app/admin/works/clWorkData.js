angular.module('app').factory('clWorkData', function ($resource) {
  var WorkResource = $resource('/api/works/:id', {_id: "@id"},{
      update : {method: 'PUT', isArray: false},
      delete_work: {method: 'DELETE'}
  });
  
  return WorkResource;
})