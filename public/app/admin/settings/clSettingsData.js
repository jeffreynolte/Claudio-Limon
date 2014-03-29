angular.module('app').factory('clSettingsData', function ($resource) {  
  var SettingsResource = $resource('/api/settings', {_id: "@id"},{
    update : {method: 'PUT', isArray: false},
  });  
  return SettingsResource;
});