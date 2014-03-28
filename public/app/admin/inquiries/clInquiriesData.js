'use strict';

angular.module('app').factory('clInquiriesData', function ($resource) {
  var InquiryResource = $resource('/api/inquiries/:id', {_id: "@id"},{
      delete_inquiry: {method: 'DELETE'}
  });

  return InquiryResource;
})
