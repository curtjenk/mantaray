mantarayApp.controller("postController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
  
    $scope.postFunc = function() {
        console.log($rootScope.username);

        dbAjax.createPost({
            username: $rootScope.username,
            postText: $scope.postText,
            returnAll: true
        }).then(
            function(success) {
                console.log(success);
                //redirect to home page
                $location.path('/');
            },
            function(error) {
                console.log(error)
            });

    }; //end function

});
