angular.module('app').factory('clSettingsData', function ($resource) {  
  var SettingsResource = $resource('/api/settings', {_id: "@id"});  
  return SettingsResource;
})