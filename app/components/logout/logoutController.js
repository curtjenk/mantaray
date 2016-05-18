mantarayApp.controller("logoutController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {
    $rootScope.isLoggedIn = false;
     $scope.$emit("userLoggedOut", {
                    username: $scope.loginUsername
                });

});