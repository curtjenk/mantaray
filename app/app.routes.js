mantarayApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: function($routeParams) {
           console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/login', {
        templateUrl: function($routeParams) {
            return 'app/components/login/loginView.html';
        }
    });
    $routeProvider.when('/logout', {
        templateUrl: function($routeParams) {
            return 'app/components/logout/logoutView.html';
        }
    });
    $routeProvider.when('/register', {
        templateUrl: function($routeParams) {
            return 'app/components/register/registerView.html';
        }
    });
    $routeProvider.when('/post', {
        templateUrl: function($routeParams) {
            return 'app/components/post/postView.html';
        }
    });
    $routeProvider.when('/follow', {
        templateUrl: function($routeParams) {
          return 'app/components/follow/followView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
