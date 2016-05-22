mantarayApp.controller("donateController", function ($rootScope, $scope, $http, $location, $timeout, zipLookup) {
	$scope.donateAmt = 100000;

	//respond to the ng-change event for zip code
	$scope.zipChange = function () {
		if ($scope.zip.length === 5 && is_int($scope.zip)) {
			var ok = function (resp) {
				$scope.city = resp.city;
				$scope.state = resp.state;
			};
			var error = function (err) {
				$scope.city = "";
				$scope.state = "";
			};
			zipLookup.get($scope.zip, ok, error);
		}
	};

	$scope.donateFunc = function (userOptions) {
    	$scope.errorMessage = "";

		if (!$scope.donateForm.$valid) { //check for a valid form.
      	$scope.errorMessage = "Please enter all fields";
		    return;
		}

		// console.log($scope.donateAmt);
		// console.log(typeof $scope.donateAmt);
		// console.log($scope.donateAmtOther);
		var total = 0;
		if (Number($scope.donateAmt) === 0) {
			total = Number($scope.donateAmtOther);
		} else {
			total = Number($scope.donateAmt);
		}
		var handler = StripeCheckout.configure({
			key: 'pk_test_KKclL9QmUITzeaCs7SloYdIj',
			// image: 'assets/img/dc_roasters_200x124_lt.png',
			locale: 'auto',
			token: function (token) {
				console.log("The token Id is: ");
				console.log(token.id);
				//Say thank you
				var d = new Date();
				$rootScope.receiptAmount = total;
				$rootScope.receiptDate = d.toDateString();
				$timeout(function () {
					$location.path('/receipt');
				}, 500);
				// $http.post('checkout.php', {
				// 	amount: $scope.total * 100,
				// 	stripeToken: token.id,
				//
				// 		//This will pass amount, stripeToken, and token to /payment
				// }).then(function successCallback(response) {
				// 	console.log(response.data);
				// 	if (response.data.success) {
				// 		//Say thank you
				// 		//$location.path('/receipt');
				// 	} else {
				// 		$scope.errorMessage = response.data.message;
				// 		//same on the checkout page
				// 	}
				// }, function errorCallback(response) {});
			}
		});

		handler.open({
			name: 'Donate',
			description: 'to save the Mantarays',
			amount: total * 100
		});
	};

});
