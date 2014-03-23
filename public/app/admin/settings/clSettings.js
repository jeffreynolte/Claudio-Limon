angular.module('app').factory('clSettings', function ($q, clSettingsData ) {
  return {
    updateWork: function (newSettingsData) {
      var newSettings = new clSettingsData(newSettingsData);
      var dfd = $q.defer();
      newSettings.$update().then(function () {
        console.log("updated settings");
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
})