mantarayApp.controller("loginController", function($scope, $http) {
    $scope.errorMessage = "";
    $scope.$emit('enteredLoginView', {});

});
