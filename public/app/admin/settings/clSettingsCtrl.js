angular.module('app').controller('clSettingsCtrl', function($scope, clSettingsData, clSettings, clNotifier){

  // we only have one collection for settings
  clSettingsData.query().$promise.then(function(data){    
    $scope.settings = data[0];
  });
                  
  // update settings
  $scope.updateSettings = function () {

    var newSettingsData = {
      page_title: $scope.settings.page_title,
      page_subtitle: $scope.settings.page_subtitle,
      twitter_url: $scope.settings.twitter_url,
      facebook_url: $scope.settings.facebook_url,
      global_email: $scope.settings.global_email,
      description: $scope.settings.description    
    };
          
    clSettings.updateSettings(newSettingsData).then(function () {
      console.log("new settings data");
      console.log("settings updated");
      clNotifier.notify("Your settings have been updated");
    }, function (reason) {
      console.log("settings not updated");
      clNotifier.error(reason);
    })
  }  
});