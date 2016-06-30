angular.module('AuthCtrl', []).controller('AuthController', function($scope, $http, $location, UserService) {


	$scope.go = function ( path ) {
		$location.path( path );
	};
	$scope.connectUser = function() {

		UserService.auth($scope.authUser).success(function(response) {
			console.log(response);
			if(response.error === false) {
				console.log(response.token);
				// set header token
				$http.defaults.headers.common['token'] = response.token;
				$location.path('/accueil');
				UserService.get().success(function(response) {
					console.log(response);
				});
			}
		}).error(function(error){
			console.log(error);
		});
	};
	$scope.registrationUser = function() {

		UserService.register($scope.registerUser).success(function(response) {
			console.log(response);
			if(response.error === false) {
				$location.path('/');
			}
		}).error(function(error){
			console.log(error);
		});
	};
});