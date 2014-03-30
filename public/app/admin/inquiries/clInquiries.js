'use strict';

angular.module('app').factory('clInquiries', function ($q, clInquiriesData) {
    return {
        createInquiry: function (newInquiryData) {
            var newInquiry = new clInquiriesData(newInquiryData);
            var dfd = $q.defer();
            newInquiry.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        deleteInquiry: function (deleteInquiryData) {
          var deleteInquiry = new clInquiriesData(deleteInquiryData);
          var dfd = $q.defer();

          deleteInquiry.$delete({_id: deleteInquiryData._id}).then(function () {
              dfd.resolve();
          }, function (response) {
              dfd.reject(response.data.reason);
          });
          return dfd.promise;
        }
    }
})

