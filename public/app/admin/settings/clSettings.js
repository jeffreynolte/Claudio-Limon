angular.module('app').factory('clSettings', function ($q, clSettingsData ) {
  return {
    updateSettings: function (newSettingsData) {
      var newSettings = new clSettingsData(newSettingsData);      
      var dfd = $q.defer();
      newSettings.$update().then(function () {        
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
})
