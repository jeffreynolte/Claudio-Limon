angular.module('app').controller('clSettingsCtrl', function($scope, clSettingsData, clSettings, clNotifier){

  // we only have one collection for settings
  clSettingsData.query().$promise.then(function(data){    
    $scope.settings = data[0];
  });
                  
  // update settings
  $scope.updateSettings = function () {

    var newSettingsData = {
      page_title: $scope.page_title,
      page_subtitle: $scope.page_subtitle,
      twitter_url: $scope.twitter_url,
      facebook_url: $scope.facebook_url,
      global_email: $scope.global_email,
      description: $scope.description    
    };
      
    clSettings.updateSettings(newSettingsData).then(function () {
      clNotifier.notify("Your settings have been updated");
    }, function (reason) {
      clNotifier.error(reason);
    })
  }
  
});

