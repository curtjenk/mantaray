function upFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function is_int(value) {
	if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
		return true;
	}
}

mantarayApp.factory('zipLookup', function ($http) {
	return {
		get: function (zip, successFunc, errorFunc) {
			var zipApiUrl = encodeURI("http://api.zippopotam.us/us/" + zip);
			$http.get(zipApiUrl).then(
				function (resp) {
					console.log(resp);
					var city = resp.data.places[0]["place name"];
					var state = resp.data.places[0].state;
					successFunc({
						city: city,
						state: state
					});
				},
				function (err) {
					errorFunc(err);
				});
		}
	};
});
//factory for managing local storage
//Note to self:  ALL FUCTIONS SHOULD RETURN A PROMISE
mantarayApp.factory('dbAjax', function ($http) {
	var dbAjax = {};
	var dbCreateUrl = "assets/includes/db_create.php";
	var dbReadUrl = "assets/includes/db_read.php";
	var dbLoginUrl = "assets/includes/db_readForLogin.php";
	var dbUpdateUrl = "assets/includes/db_update.php";
	var dbDeleteFollowUrl = "assets/includes/db_deleteFollow.php";

	dbAjax.login = function (data) {
		console.log("dbAjax read");
		return $http({
			method: "post",
			url: dbLoginUrl,
			data: data,
			dataType: 'json'
		});
	};
	dbAjax.readPostView = function (username) {
		console.log("dbAjax read");
		var postData = {};
		postData.table = 'postAndVote';
		postData.username = username;
		return $http({
			method: "post",
			url: dbReadUrl,
			data: postData,
			dataType: 'json'
		});
	};

	dbAjax.read = function (table, where, order) {
		var postData = {};
		postData.table = table;
		postData.where = where;
		postData.order = order;
		// console.log("dbAjax read");
		// console.log(postData);
		return $http({
			method: "post",
			url: dbReadUrl,
			data: postData,
			dataType: 'json'
		});
	};

	dbAjax.readFollowing = function (loggedInUserName) {
		console.log("dbAjax read");
		var postData = {};
		postData.table = 'followingAndToFollower';
		postData.username = loggedInUserName;
		return $http({
			method: "post",
			url: dbReadUrl,
			data: postData,
			dataType: 'json'
		});
	};

	dbAjax.createUser = function (data) {
		console.log("dbAjax create User");
		var postData = data;
		postData.func = 'create_user';
		console.log(postData);
		return $http({
			method: "post",
			url: dbCreateUrl,
			data: postData,
			dataType: 'json'
		});
	};

	dbAjax.createPost = function (data) {
		console.log("dbAjax create Tweet");
		var postData = data;
		postData.func = 'create_post';
		//   console.log(postData);
		return $http({
			method: "post",
			url: dbCreateUrl,
			data: postData,
			dataType: 'json'
		});
	};

	dbAjax.createVote = function (data) {
		console.log("dbAjax create Vote");
		var postData = data;
		postData.func = 'create_vote';
		// console.log(postData);
		return $http({
			method: "post",
			url: dbCreateUrl,
			data: postData,
			dataType: 'json'
		});
	};
	dbAjax.createFollower = function (data) {
		console.log("dbAjax create follower");
		var postData = data;
		postData.func = 'create_follower';
		// console.log(postData);
		return $http({
			method: "post",
			url: dbCreateUrl,
			data: postData,
			dataType: 'json'
		});
	};
	dbAjax.deleteFollow = function (data) {
		console.log("dbAjax delete follower");
		var postData = data;
		postData.func = 'delete_follow';
		// console.log(postData);
		return $http({
			method: "post",
			url: dbDeleteFollowUrl,
			data: postData,
			dataType: 'json'
		});
	};
	// dbAjax.readUser = function(token) {
	//     return $http({
	//         method: "post",
	//         url: dbCreateUrl,
	//         data: { token: token },
	//         dataType: 'json'
	//     });
	// }

	return dbAjax;

});
