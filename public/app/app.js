angular.module('app', ['ngResource', 'ngRoute', 'textAngular', 'angular-flexslider', 'ngAnimate']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {

        admin: {
            auth: function (clAuth) {
                return clAuth.authorizeCurrentUserForRoute('admin');
            }
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/index', controller: 'mainCtrl'})
        .when('/about', {templateUrl: '/partials/about', controller: 'mainCtrl'})
        .when('/work', {templateUrl: '/partials/work-index', controller: 'mainCtrl'})
        .when('/work/:categoryName', {templateUrl: '/partials/work-index', controller: 'mainCtrl'})
        .when('/work/detail/:workId', {templateUrl: '/partials/work-detail', controller: 'mainCtrl'})
        .when('/contact', {templateUrl: '/partials/contact', controller: 'mainCtrl'})
        .when('/admin/users', {templateUrl: '/partials/admin/users/index',
            controller: 'clUserIndexCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/users/create', {templateUrl: '/partials/admin/users/create',
            controller: 'clUserCreateUserCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/users/edit/:userId', {templateUrl: '/partials/admin/users/edit',
            controller: 'clUserEditUserCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/works', {templateUrl: '/partials/admin/works/index',
            controller: 'clWorkCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/works/create', {templateUrl: '/partials/admin/works/create',
            controller: 'clWorkCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/works/edit/:workId', {templateUrl: '/partials/admin/works/edit',
            controller: 'clWorkCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/settings', {templateUrl: '/partials/admin/settings',
            controller: 'clSettingsCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/inquiries', {templateUrl: '/partials/admin/inquiries',
            controller: 'clInquiriesCtrl', resolve: routeRoleChecks.admin
        })
});

angular.module('app').run(function ($rootScope, $location, $http) {  
  

    $rootScope.$on('$routeChangeSuccess', function(evt, current, previous, rejection){
      if($location.$$path === '/'){
        $rootScope.bodyClass = "home";
      } else if($location.$$path === '/about'){
        $rootScope.bodyClass = "about";        
      } else {
        $rootScope.bodyClass = "";
      }
    })
    
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/admin/index');
        }
    })
    
    $http.get('/api/public/settings').success(function(data) {
      $rootScope.settings = data[0];
    }).error(function(data, status) {
      console.warn('Error: ', status);
    });
    
});
