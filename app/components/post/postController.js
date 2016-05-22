mantarayApp.controller("postController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    $scope.posts = [];
    $scope.username = $rootScope.username;

    readAllPosts();

    function readAllPosts() {
        // console.log('getting all the posts and their vote total');
        //get all the post messages
        //dbAjax.readPostAndVote().then(
        dbAjax.readPostView($rootScope.username).then(
        // dbAjax.read('postAndVote').then(
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
        if (!$scope.postForm.$valid) {
            console.log("postForm is invalid");
            return;
        }

        dbAjax.createPost({
            username: $rootScope.username,
            postText: $scope.postText,
            returnAll: true
        }).then(
            function(success) {
                // console.log(success);
                $scope.postText = '';
                // clearing the input field invalidates the form and shows an error.  these methods prevent showing errors when resetting the inputs
                $scope.postForm.$setPristine();
                $scope.postForm.$setUntouched();
                $scope.posts = success.data.returnAll.rows;
            },
            function(error) {
                console.log(error);
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
            direction: direction
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
                console.log(error);
            });
    };

    $scope.followFunc = function(post) {
      dbAjax.createFollower({
        username_follower: $rootScope.username, //the person loggedIn not who posted
        username_poster: post.username,
        postId: post.id
      }).then(
          function(success) {
              // console.log(success);
              if (success.data.status == 'success') {
                readAllPosts();
              }
              if (success.data.status == 'fail' && success.data.failType == 'db') {
                  console.log(success); //likely dupe key ... user already following this post
              }
          },
          function(error) {
              console.log(error);
          });
    };

    $scope.unFollow = function (who) {
      dbAjax.deleteFollow({
        username_follower: $rootScope.username, //the person loggedIn not who posted
        username_poster: who.following,
        postId: 0
      }).then(
        function (success) {
          console.log(success);
          if (success.data.status == 'success') {
             readAllPosts();
          }
          if (success.data.status == 'fail' && success.data.failType == 'db') {
            console.log(success); //likely dupe key ... user already following this post
          }
        },
        function (error) {
          console.log(error);
        });
    };
  });
