angular.module('app').controller('clWorkCtrl', function($scope, $location, clWork, clWorkclWorkData, clNotifier){

  // get all works
  $scope.works = clWorkclWorkData.query();
  
  $scope.pickPhotos = function () {
      // var options = {
      //     'multiple': true,
      //     'container': 'modal',
      //     'services': ['COMPUTER', 'FACEBOOK', 'DROPBOX', 'FLICKR', 'INSTAGRAM', 'GMAIL'],
      //     'location': 'S3',
      //     'metadata': true,
      //     'maxsize': 2000 * 1024,
      //     'persist': true
      // };
      // 
      // filepicker.pick({
      //     mimetypes: ['image/*', 'text/plain'],
      //     container: 'window',
      //     services:['COMPUTER', 'FACEBOOK', 'GMAIL'],
      //     multiple: true
      //   },
      //   function(images){
      //     console.log("inside callback");
      //     console.log(images)
          $scope.handleImagesAdded();
      //     $scope.handleImagesAdded(images)
      //   },
      //   function(FPError){
      //     clNotifier.error(FPError.toString());
      //   }
      // );
  };

  $scope.handleImagesAdded = function () {
    // console.log("inside handleImagesAdded");    
    // console.log(images)
    // $scope.images = images;
    
    var images = {url: "https://www.filepicker.io/api/file/8gArSfS6i758iWWD5utg", filename: "Screen Shot 2014-01-06 at 3.59.14 PM.png", mimetype: "image/png", size: 7881, isWriteable: true} 
    
    console.log(images.length);
    
      // for (var i = 0; i < images.length; i++) {
      //   console.log("inside loop");
      //   // console.log($scope.images);
      //   console.log(images.length);
      //   console.log(images[0]);
      //     $scope.images.push(images[i]);
      // }
    
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

