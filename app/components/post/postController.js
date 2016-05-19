mantarayApp.controller("postController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    $scope.posts = [];

    readAllPosts();

    function readAllPosts() {
        console.log('getting all the posts and their vote total');
        //get all the post messages
        //dbAjax.readPostAndVote().then(
        dbAjax.read('postAndVote').then(
            function(good) {
             //   console.log(good);
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

    //direction = 1, means up
    //direction  -1, means down
    $scope.voteFunc = function(post, direction) {
        //must be logged in to vote
        if (!$rootScope.loggedIn) {
            return;
        }
        console.log(post);
        dbAjax.createVote({
            username: $rootScope.username, //the person loggedIn not who posted
            postId: post.id,
            direction: direction // 'up' vote
        }).then(
            function(success) {
                // console.log(success);
                if (success.data.status == 'success') {
                    post.voteTotal = success.data.voteTotal;
                }
                if (success.data.status == 'fail' && success.data.failType == 'db') {
                    console.log(success); //likely dupe key ... user already voted. could check the message for "Duplicate ..."
                }
            },
            function(error) {
                console.log(error)
            });
    }


    // $scope.voteUp = function(post) {
    //     //must be logged in to vote
    //     if (!$rootScope.loggedIn) {
    //         return;
    //     }
    //     console.log(post);
    //     dbAjax.createVote({
    //         username: $rootScope.username, //the person loggedIn not who posted
    //         postId: post.id,
    //         direction: 1 // 'up' vote
    //     }).then(
    //         function(success) {
    //             // console.log(success);
    //             if (success.data.status == 'success') {
    //                 post.voteTotal = success.data.voteTotal;
    //             }
    //             if (success.data.status == 'fail' && success.data.failType == 'db') {
    //                 console.log(success); //likely dupe key ... user already voted.
    //             }
    //         },
    //         function(error) {
    //             console.log(error)
    //         });
    // }

    // $scope.voteDown = function(post) {
    //     if (!$rootScope.loggedIn) {
    //         return;
    //     }
    //     dbAjax.createVote({
    //         username: $rootScope.username, //the person loggedIn not who posted
    //         postId: post.id,
    //         direction: -1 // 'down' vote
    //     }).then(
    //         function(success) {
    //             // console.log(success);
    //             if (success.data.status == 'success') {
    //                 post.voteTotal = success.data.voteTotal;
    //             }
    //             if (success.data.status == 'fail' && success.data.failType == 'db') {
    //                 console.log(success); //likely dupe key ... user already voted.
    //             }
    //         },
    //         function(error) {
    //             console.log(error)
    //         });
    // }

});
