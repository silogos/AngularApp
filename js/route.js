app.config(['$routeProvider', function($routeProvider){
    
   $routeProvider.when('/', {
        title: 'HOME',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
   })
   .when('/about', {
        title: 'ABOUT',
        templateUrl: 'views/about.html',
        controller: 'AboutController'
   })
   .when('/login', {
        title: 'LOGIN',
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
   })
   .when('/bookmark', {
        title: 'BOOKMARK',
        templateUrl: 'views/bookmark.html'
   })
   .when('/user', {
        title: 'USER',
        templateUrl: 'views/user.html'
   })
   .otherwise({redirectTo: '/'}); 
   
}]);
app.run(['$rootScope', function($rootScope){
    $rootScope.$on('$routeChangeSuccess', function(e, curr, prev){
        $rootScope.title = curr.$$route.title;
    })
}])