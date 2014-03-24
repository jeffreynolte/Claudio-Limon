angular.module('app').controller('clWorkCtrl', function($scope, $location, clWork, clWorkData, clNotifier){

  // get all works
  $scope.works = clWorkData.query();
  console.log($scope.works);
  
  
  $scope.pickPhotos = function () {
          
      filepicker.pickMultiple({
          mimetypes: ['image/*', 'text/plain'],
          container: 'window',
          services:['COMPUTER', 'FACEBOOK', 'GMAIL']
        },
        function(images){
          $scope.$apply(function(){
            $scope.handleImagesAdded(images);
          });
        },
        function(FPError){
          clNotifier.error(FPError.toString());
        }
      );
  };

  $scope.handleImagesAdded = function (images) {
    $scope.images = images;
  };
  
  $scope.removeImage = function(image){ 
    var c = confirm("Are you sure you want to remove this image?");
    if(c === true){
      var index = $scope.images.indexOf(image)
      $scope.images.splice(index, 1);           
    }
  }
      
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

