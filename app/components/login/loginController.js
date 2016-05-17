mantarayApp.controller("loginController", function($scope, $http, dbAjax) {
    $scope.errorMessage = "";
    $scope.$emit('enteredLoginView', {});

     $scope.loginFunc = function() {
            console.log("login called");
            

            dbAjax.read('user', {
                    username: $scope.loginUsername,
                    password: $scope.loginPassword
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
