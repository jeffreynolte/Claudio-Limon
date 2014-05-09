'use strict';

angular.module('app').controller('clInquiriesCtrl', function($scope, $location, clInquiries, clInquiriesData, clNotifier){


  $scope.inquiries = clInquiriesData.query();
  
    
  $scope.deleteInquiry = function (id) {
    
    var deleteInquiryData = {
      _id: id
    };

    clInquiries.deleteInquiry(deleteInquiryData).then(function () {
      clNotifier.notify("Inquiry Deleted");
    }, function (reason) {
      clNotifier.error(reason);
    })
  }

  $scope.createInquiry = function(){

    var newInquiryData = {
      sender_name: $scope.sender_name,
      sender_email: $scope.sender_email,
      sender_message: $scope.sender_message,
      updated: Date.now()
    };
        
    clInquiries.createInquiry(newInquiryData).then(function(){
      alert("Your message has been sent!");
    }, function(reason){
      alert("There has been an error:" + reason);
    })
  }


});






