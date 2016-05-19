mantarayApp.controller("postController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    $scope.posts = [];

    readAllPosts();

    function readAllPosts() {
        console.log('getting all the posts');
        //get all the post messages
        dbAjax.read('post', '', 'order by create_date desc').then(
            function(good) {
                 console.log(good);
                $scope.posts = good.data.dbRead.rows;    
            },
            function(bad) {
                console.log(bad);
            });
    }

    $scope.postFunc = function() {
       // console.log($rootScope.username);

        dbAjax.createPost({
            username: $rootScope.username,
            postText: $scope.postText,
            returnAll: true
        }).then(
            function(success) {
                console.log(success);
                $scope.postText = '';
                $scope.posts = success.data.returnAll.rows;   
            },
            function(error) {
                console.log(error)
            });

    }; //end function

    $scope.voteUp = function(postId) {
        //console.log(postId);
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
