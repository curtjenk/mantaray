mantarayApp.controller("loginController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {


    $scope.errorMessage = "";
    $scope.$emit('enteredLoginView', {});

    $scope.loginFunc = function() {

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
            function(success) {
           //     console.log(success);

                $rootScope.username = $scope.loginUsername;
                $rootScope.isLoggedIn = true;
                $scope.$emit("userLoggedIn", {
                    username: $scope.loginUsername
                });
                //redirect to home page
                $location.path('/');
            },
            function(error) {
                console.log(error)
            });
    }; //end function

});
