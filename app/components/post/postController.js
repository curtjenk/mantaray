mantarayApp.controller("postController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    $scope.posts = [];

    //get all the post messages
    dbAjax.read('post', '').then(
        function(good) {
            $scope.posts = good.data.rows;
            // console.log($scope.posts);
        },
        function(bad) {
            console.log(bad);
        });

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
                //$location.path('/');
            },
            function(error) {
                console.log(error)
            });

    }; //end function

    $scope.voteUp = function(postId) {
        console.log(postId);
        dbAjax.update({
            id: postId,
            func: 'update_vote_count',
            vote: 'up'
        }).then(
            function(success) {
                console.log(success); 
            },
            function(error) {
                console.log(error)
            });
    }

    $scope.voteDown = function(postId) {
        console.log(postId);
         dbAjax.update({
            id: postId,
            func: 'update_vote_count',
            vote: 'down'
        }).then(
            function(success) {
                console.log(success);
                //redirect to home page
                //$location.path('/');
            },
            function(error) {
                console.log(error)
            });
    }

});
