angular.module('app', ['ngResource', 'ngRoute', 'textAngular']);

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
        .when('/work-index', {templateUrl: '/partials/work-index', controller: 'mainCtrl'})
        .when('/work-detail', {templateUrl: '/partials/work-detail', controller: 'mainCtrl'})
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
        .when('/admin/works/edit/:userId', {templateUrl: '/partials/admin/works/edit',
            controller: 'clWorkCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/settings', {templateUrl: '/partials/admin/settings',
            controller: 'clSettingsCtrl', resolve: routeRoleChecks.admin
        })        
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/admin/index');
        }
    })
});

angular.module('app').controller('mainCtrl', function ($scope, clIdentity, clAuth, clNotifier, $location) {
    $scope.identity = clIdentity;
    $scope.myVar = "Hello Angular World";

    $scope.signout = function () {
        clAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            clNotifier.notify("You have successfully logged out");
            $location.path('/admin');
        })
    }
});
