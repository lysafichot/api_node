angular.module('UserService', []).factory('UserService', ['$http','$resource', function($http, $localStorage) {
    return {
        get : function() {
            return $http.get('/api/users');
        },
        auth : function(user) {
            return $http.post('/api/auth', user);
        },
        register : function(user) {
            return $http.post('/api/sign', user);
        }
    }

}]);