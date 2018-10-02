var app = angular.module('autoautomatizacion', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $stateProvider.state({
        name : 'index',
        url : '/index',
        controller : 'IndexController',
        //template : templateString
        templateUrl : 'Views/index.html'
   })
    .state({
        name : 'login',
        url : '/login',
        controller : 'LoginController',
        //template : templateString
        templateUrl : 'Views/login.html'
   })
    .state({
        name : 'register',
        url : '/register',
        controller : 'RegisterController',
        templateUrl : 'Views/register.html'
    })
    .state({
        name : 'main',
        url : '/main',
        controller : 'MainController',
        templateUrl : 'Views/main.html'
    });
    
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});