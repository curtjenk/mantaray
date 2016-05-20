mantarayApp.controller("loginController", function ($rootScope, $scope, $http, dbAjax, $cookies, $location) {


	$scope.errorMessage = "";
	$scope.$emit('enteredLoginView', {});

	$scope.loginFunc = function () {
    $scope.errorMessage = "";
		$rootScope.username = "";
		$rootScope.isLoggedIn = false;

		//     console.log($scope.loginForm.$valid);

		if (!$scope.loginForm.$valid) {
			console.log("loginForm is invalid");
			return;
		}

		dbAjax.login({
			username: $scope.loginUsername,
			password: $scope.loginPassword
		}).then(
			function (success) {
				//     console.log(success);
				if (success.data.status == 'success') {
					$rootScope.username = $scope.loginUsername;
					$rootScope.isLoggedIn = true;
					$scope.$emit("userLoggedIn", {
						username: $scope.loginUsername
					});
					$location.path('/');
				} else {
					console.log(success);
					if (success.data.failType == 'app') {
						$scope.errorMessage = success.data.message ;
					} else {
						$scope.errorMessage = "Sorry Unable to Login at this time";
					}
				}
			},
			function (error) {
				console.log(error);
			});
	}; //end function

});
