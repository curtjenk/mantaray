mantarayApp.controller("loginController", function($scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    $scope.$emit('enteredLoginView', {});

    $scope.loginFunc = function() {
        $cookies.remove("token");
        $cookies.remove("username");
        console.log("login called");
        console.log($scope.loginForm.$valid);

        if (!$scope.loginForm.$valid) {
            return;
        }

        dbAjax.login({
            username: $scope.loginUsername,
            password: $scope.loginPassword
        }).then(
            function(success) {
                console.log(success);
                $cookies.put("token", "blah");
                $cookies.put("username", $scope.loginUsername);
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
