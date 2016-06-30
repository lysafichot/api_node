angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'AuthController'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
    })
    .when('/accueil', {
        templateUrl: 'views/accueil.html',
        controller: 'MainController'
    })
    .when('/users', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
    })

    $routeProvider.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);

}]);