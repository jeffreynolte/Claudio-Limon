'use strict';

angular.module('app').controller('clInquiriesCtrl', function($scope, $location, clInquiries, clInquiriesData, clNotifier){

  $scope.inquiries = clInquiriesData.query();

  $scope.deleteInqiury = function () {

    var deleteInquiryData = {
      _id: $routeParams.userId
    };

    clInquiries.deleteInquiry(deleteInqiuryData).then(function () {
      clNotifier.notify("Inquiry Deleted");
      $location.path('/admin/inquiries');
    }, function (reason) {
      clNotifier.error(reason);
    })
  }

  $scope.createInquiry = function(){
    console.log($scope.sender_name)
    console.log($scope.sender_email)
    console.log($scope.sender_message)
    console.log(Date.now())

    var newInquiryData = {
      sender_name: $scope.sender_name,
      sender_email: $scope.sender_email,
      sender_mesage: $scope.sender_message,
      updated: Date.now()
    };

    clInquiries.createInquiry(newInqiuryData).then(function(){
      console.log("inquiry sent");
    }, function(reason){
      console.log("error");
      console.log(reason);
    })
  }


});






