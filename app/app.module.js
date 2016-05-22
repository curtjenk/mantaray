var mantarayApp = angular.module('mantarayApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngMessages', 'angularUtils.directives.dirPagination']);

//"run" executes once all modules have been loaded.
mantarayApp.run(function ($rootScope, $location) {

	$rootScope.$watch(
		//This is the watch value function. It should return the value which is being watched.
		//In this case, we're watching the path.
		function () {
			return $location.path();
		},
		//This is the watch listener function.  It will should "do" something when the
		//watched value has changed.  In this case, if the path changed to something
		//other than the home page and the user is not logged in pushed them to the home page.
		function (a) {
			console.log('url has changed : ' + a);
			if (a !== '/' && a !== '/login' && a !== '/register') {
        //Put some code in here to check if they are logged in!
        //If not... send them home
				 //TESTING ONLY
				//  $rootScope.username = 'curtis';
				//  $rootScope.loggedIn = true;
				 //----------------------------
				if (!$rootScope.loggedIn) {
					$location.path('/');
				}
			}
		});


});

/* Add a method to the ngModel controller’s $validators object. Angular will
 invoke the function when the model value changes. The function returns a
 boolean, and a return value of false will set the corresponding ngModel’s
 $error property automatically.
 Use this in validating password matches password2.  Check registerView.html
*/
mantarayApp.directive("compareTo", function () {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=compareTo"
		},
		link: function (scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function (modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function () {
				ngModel.$validate();
			});
		}
	};
});



//add  "check-image" (without quotes) attribute to the img element
mantarayApp.directive('checkImage', function ($http) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			attrs.$observe('ngSrc', function (ngSrc) {
				$http.get(ngSrc).success(function () {
					// alert('image exists');
				}).error(function () {
					// alert('image does not exist');
					element.attr('src', 'assets/img/placeholder.jpg'); // set default image
				});
			});
		}
	};
});
