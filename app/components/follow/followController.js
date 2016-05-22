mantarayApp.controller("followController", function ($rootScope, $scope, $http, dbAjax, $cookies, $location) {
	//Can't access this page unless logged in
	$scope.errorMessage = "";
	var getFollowingData = function () {
		dbAjax.readFollowing($rootScope.username).then(
			function (found) {
				console.log(found);
				$scope.following = found.data.dbRead.rows_following;
				$scope.notFollowing = found.data.dbRead.rows_not_following;
			},
			function (error) {
				console.log(error);
			}
		);
	};

	var follow = function (who) {
		dbAjax.createFollower({
			username_follower: $rootScope.username, //the person loggedIn not who posted
			username_poster: who.username,
			postId: 0
		}).then(
			function (success) {
				// console.log(success);
				if (success.data.status == 'success') {
					getFollowingData();
				}
				if (success.data.status == 'fail' && success.data.failType == 'db') {
					console.log(success); //likely dupe key ... user already following this post
				}
			},
			function (error) {
				console.log(error);
			});
	};

  var unFollow = function (who) {
    dbAjax.deleteFollow({
      username_follower: $rootScope.username, //the person loggedIn not who posted
      username_poster: who.username,
      postId: 0
    }).then(
      function (success) {
        // console.log(success);
        if (success.data.status == 'success') {
          getFollowingData();
        }
        if (success.data.status == 'fail' && success.data.failType == 'db') {
          console.log(success); //likely dupe key ... user already following this post
        }
      },
      function (error) {
        console.log(error);
      });
  };

	getFollowingData();

	$scope.followFunc = function (who, action) {
    console.log(who);
    console.log(action);
		if (action == 'follow') {
      follow(who);
		} else {
      unFollow(who);
		}
	};

 $scope.showPosts = function(user) {
	 console.log(user.toggled);
	 if (user.toggled || user.toggled === undefined) {
		 //read the posts for this user
		 dbAjax.read('post', {'username=':user.username}, 'create_date DESC')
		    .then(
					function(good)
					{
						// console.log(good);
						user.posts = good.data.dbRead.rows;
					},
					function(bad)
					{
							console.log(bad);
					});
	 }
	 user.toggled = !user.toggled;
 };

});

/* on the php

unfollow    DB::delete('following', 'username_follower = %s AND username_poster=%s', loggedInUser, who)






*/
