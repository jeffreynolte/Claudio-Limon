angular.module('app').value('clToastr', toastr);

angular.module('app').factory('clNotifier', function (clToastr) {
  return {
    notify: function (msg) {
      clToastr.success(msg);
      console.log(msg);
    }    
  }
});