mantarayApp.controller("followController", function($rootScope, $scope, $http, dbAjax, $cookies, $location) {

    $scope.errorMessage = "";
    var where = { 'username!=' : $rootScope.username};
    console.log(where);

    dbAjax.read('user', where, '').then(
      function(found){
        console.log(found);
      },
      function(error){
        console.log(error);
      }
    );


  });
