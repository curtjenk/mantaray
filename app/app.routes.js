mantarayApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: function($routeParams) {
         console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/login', {
        templateUrl: function($routeParams) {
          // console.log("routing to recipe page");
            return 'app/components/login/loginView.html';
        }
    });
    $routeProvider.when('/register', {
        templateUrl: function($routeParams) {
          // console.log("routing to userInventory page");
            return 'app/components/register/registerView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});