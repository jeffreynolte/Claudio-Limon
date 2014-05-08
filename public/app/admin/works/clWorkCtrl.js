angular.module('app').controller('clWorkCtrl', function($scope, $location, clWork, clWorkData, clNotifier, $routeParams){

  // get all works
  $scope.works = clWorkData.query();
  
  $scope.pickPhotos = function () {
          
      filepicker.pickMultiple({
          mimetypes: ['image/*', 'text/plain'],
          container: 'window',
          services:['COMPUTER', 'FACEBOOK', 'GMAIL']
        },
        function(images){
          $scope.$apply(function(){
            console.log(images);
            $scope.handleImagesAdded(images);
          });
        },
        function(FPError){
          clNotifier.error(FPError.toString());
        }
      );
  };

  $scope.handleImagesAdded = function (images) {
    _(images).forEach(function(image){
      image['order'] = 0;
    })      
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
      categories: $scope.categories ? $scope.categories.replace(/ /g,'').split(',') : $scope.categories
    };
          
    clWork.createWork(newWorkData).then(function(){
      clNotifier.notify("Work created");
      $location.path('/admin/works');
    }, function(reason){
      clNotifier.error(reason);
    })
                        
  }
  
  
  if($routeParams.workId){
    clWorkData.get({_id: $routeParams.workId }).$promise.then(function (work) {
      
      $scope.title = work.title;
      $scope.subtitle = work.subtitle;
      $scope.isPublic = work.isPublic;
      $scope.description = work.description;
      $scope.images = work.images;
      $scope.categories = work.categories;
    
    });        
  }
        
  $scope.updateWork = function () {
        
    var newWorkData = {
      _id: $routeParams.workId,
      title: $scope.title,
      subtitle: $scope.title,
      isPublic: $scope.isPublic,
      description: $scope.description,
      images: $scope.images,
      categories: $scope.categories
    };
    
      
    clWork.updateWork(newWorkData).then(function () {      
      clNotifier.notify("Your work has been updated");
      $location.path('/admin/works');
    }, function (reason) {
      clNotifier.error(reason);
    })
  }

  // delete work
  $scope.deleteWork = function () {
    
    var deleteWorkData = {
      _id: $routeParams.workId
    };
    
    clWork.deleteWork(deleteWorkData).then(function () {
      clNotifier.notify("Work Deleted");
      $location.path('/admin/works');
    }, function (reason) {
      clNotifier.error(reason);
    })
    
  }
});

