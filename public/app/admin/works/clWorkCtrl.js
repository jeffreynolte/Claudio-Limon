angular.module('app').controller('clWorkCtrl', function($scope, $location, clWork, clWorkApiService, clNotifier){

  // get all works
  $scope.works = clWorkApiService.query();
  
  $scope.pickPhotos = function () {
      var options = {
          'multiple': true,
          'container': 'modal',
          'services': ['COMPUTER', 'FACEBOOK', 'DROPBOX', 'FLICKR', 'INSTAGRAM', 'GMAIL'],
          'location': 'S3',
          'metadata': true,
          'maxsize': 2000 * 1024,
          'persist': true
      };
      
      filepicker.pick({
          mimetypes: ['image/*', 'text/plain'],
          container: 'window',
          services:['COMPUTER', 'FACEBOOK', 'GMAIL'],
        },
        function(InkBlob){
          console.log(JSON.stringify(InkBlob));
        },
        function(FPError){
          console.log(FPError.toString());
        }
      );
  };

  $scope.handleFilesAdded = function (files) {
      for (var i = 0; i < files.length; i++) {
          $scope.files.push(files[i]);
      }
    
  };
    
  // create work
  $scope.createWork = function(){
      
    var newWorkData = {
      title: $scope.title,
      subtitle: $scope.subtitle,
      isPublic: $scope.isPublic,
      description: $scope.description,
      images: $scope.images,
      categories: $scope.categories
    };
      
    clWork.createWork(newWorkData).then(function(){
      clNotifier.notify("Work created");
      $location.path('/admin/works');
    }, function(reason){
      clNotifier.error(reason);
    })
                        
  }
    
  // update work
  $scope.updateWork = function () {

    var newWorkData = {
      title: $scope.title,
      subtitle: $scope.subtitle,
      isPublic: $scope.isPublic,
      description: $scope.description,
      images: $scope.images,
      categories: $scope.categories
    };
      
    clAuth.updateWork(newWorkData).then(function () {
      clNotifier.notify("Your work has been updated");
      $location.path('/admin/works');
    }, function (reason) {
      clNotifier.error(reason);
    })
  }

  // delete work
  $scope.deleteWork = function () {
    
    var deleteWorkData = {
      _id: $routeParams.userId
    };
    
    clAuth.deleteWork(deleteWorkData).then(function () {
      clNotifier.notify("Work Deleted");
      $location.path('/admin/works');
    }, function (reason) {
      clNotifier.error(reason);
    })
    
  }
});

