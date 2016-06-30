angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.receptView = function() {

		$http.post('api/view', $scope.view).success(function(response) {
			console.log(response);
			if(response.error === false) {

			}
		}).error(function(error){
			console.log(error);
		});



	};

});