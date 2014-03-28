'use strict';

angular.module('app').factory('clInquiries', function ($q, clInquiriesData) {
    return {
        createInquiry: function (newInquiryData) {
            var newInquiry = new clInquiry(newInquiryData);
            var dfd = $q.defer();
            newInquiry.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        deleteInquiry: function (deleteInquiryData) {
          var deleteInquiry = new clInquiry(deleteInquiryData);
          var dfd = $q.defer();

          deleteInqiury.$delete({_id: deleteInquiryData._id}).then(function () {
              console.log("deleted inquiry");
              dfd.resolve();
          }, function (response) {
              dfd.reject(response.data.reason);
          });
          return dfd.promise;
        }
    }
})

