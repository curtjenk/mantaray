function upFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//factory for managing local storage
//Note to self:  ALL FUCTIONS SHOULD RETURN A PROMISE
mantarayApp.factory('dbAjax', function($http) {
    var dbAjax = {};
    var dbCreateUrl = "assets/includes/db_create.php";
    var dbReadUrl = "assets/includes/db_read.php";
    var dbLoginUrl = "assets/includes/db_readForLogin.php";
    var dbUpdateUrl = "assets/includes/db_update.php";
    var dbDeleteUrl = "assets/includes/db_delete.php";

    dbAjax.login = function(data) {
        console.log("dbAjax read");
        return $http({
            method: "post",
            url: dbLoginUrl,
            data: data,
            dataType: 'json'
        });
    }
    dbAjax.read = function(table, where) {
        console.log("dbAjax read");
        var postData = {};
        postData.table = table;
        postData.where = where;
        return $http({
            method: "post",
            url: dbReadUrl,
            data: postData,
            dataType: 'json'
        });
    }
    dbAjax.createUser = function(data) {
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
    }
    dbAjax.createPost = function(data) {
        console.log("dbAjax create Tweet");
        var postData = data;
        postData.func = 'create_post';
        console.log(postData);
        return $http({
            method: "post",
            url: dbCreateUrl,
            data: postData,
            dataType: 'json'
        });
    }
    dbAjax.createVote = function(data) {
        console.log("dbAjax create Vote");
        var postData = data;
        postData.func = 'create_vote';
        console.log(postData);
        return $http({
            method: "post",
            url: dbCreateUrl,
            data: postData,
            dataType: 'json'
        });
    }
    dbAjax.readUser = function(token) {
        return $http({
            method: "post",
            url: dbCreateUrl,
            data: { token: token },
            dataType: 'json'
        });
    }

    return dbAjax;

});
