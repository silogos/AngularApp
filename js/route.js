app.config(['$routeProvider', function($routeProvider){
    
   $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
   })
   .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
   })
   .when('/bookmark', {
        templateUrl: 'views/bookmark.html'
   })
   .when('/user', {
        templateUrl: 'views/user.html'
   })
   .otherwise({redirectTo: '/'}); 
   
}]);