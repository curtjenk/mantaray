mantarayApp.controller('registerController', function($scope, $cookies, dbAjax) {
    $scope.errorMessage = "";

    $scope.registerFunc = function() {
            console.log("registerfunc called");
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
                        console.log(success);
                    },
                    function(error) {
                        console.log(error)
                    });
        } //end function

});
