mantarayApp.controller("homeController", function($rootScope, $scope, $http) {


    $scope.$on('enteredLoginView', function(event, args) {
        console.log("enteredLoginView");
    });

    $scope.$on("userLoggedIn", function(event, args) {
        //  console.log("userLoggedIn event ");
        //  console.log(event);
        //  console.log(args);
        $scope.loggedIn = true;
        $rootScope.loggedIn = true;
        $scope.username = args.username;
    });

    $scope.$on("userLoggedOut", function(event, args) {
        // alert("logged out");
        $scope.loggedIn = false;
        $rootScope.loggedIn = false;
    });

    
});
