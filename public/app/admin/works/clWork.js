angular.module('app').factory('clWork', function ($q, clWorkData ) {
    return {
        createWork: function (newWorkData) {
            var newWork = new clWorkData(newWorkData);
            var dfd = $q.defer();
            newWork.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        updateWork: function (newWorkData) {
            var newWork = new clWorkData(newWorkData);
            var dfd = $q.defer();
            newWork.$update().then(function () {
                console.log("updated work");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;

        },

        deleteUser: function (deleteWorkData) {          
          var deleteWork = new clUser(deleteWorkData);
          var dfd = $q.defer();

          deleteWork.$delete({_id: deleteWorkData._id}).then(function () {
              console.log("deleted work");
              dfd.resolve();
          }, function (response) {
              dfd.reject(response.data.reason);
          });
          return dfd.promise;          
        }
    }
})