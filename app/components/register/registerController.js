mantarayApp.controller('registerController', function($rootScope, $scope, $location, $cookies, dbAjax) {
    $scope.errorMessage = "";

    $scope.registerFunc = function() {
            console.log("registerfunc called");
            if (!$scope.registerForm.$valid) { //check for a valid form.
                return;
            }
            if (!($scope.regPassword && $scope.regPassword === $scope.regPassword2)) {
                $scope.errorMessage = "Passwords must match";
                return;
            }

            dbAjax.createUser({
                    username: $scope.regUsername,
                    name: $scope.regName,
                    email: $scope.regEmail,
                    password: $scope.regPassword
                })
                .then(
                    function(success) {

                        if (success.data.status == 'success') {
                          $rootScope.username = $scope.regUsername;
                          $rootScope.isLoggedIn = true;
                          $scope.$emit("userLoggedIn", {
                              username: $scope.regUsername
                          });
                            $location.path('/');
                        } else {
                            console.log(success);
                            	$scope.errorMessage = "Sorry Unable to Login at this time";
                        }
                    },
                    function(error) {
                        console.log(error);
                    });
        }; //end function

});
