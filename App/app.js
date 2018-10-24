var app = angular.module('autoautomatizacion', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $stateProvider.state({
        name : 'index',
        url : '/index',
        controller : 'LoginController',
        //template : templateString
        templateUrl : 'App/Views/index.html'
   })
    .state({
        name : 'index.login',
        url : '/login',
        controller : 'LoginController',
        templateUrl : 'App/Views/login/cover.html'
    })
    .state({
        name : 'index.register',
        url : '/register',
        controller : 'RegisterController',
        templateUrl : 'App/Views/login/register.html'
    })
    .state({
        name : 'main',
        url : '/main',
        controller : 'MainController',
        templateUrl : 'App/Views/main.html'
    })
    .state({
        name : 'main.parametros',
        url : '/ph',
        controller : 'ParametersController',
        templateUrl : 'App/Views/Parameters/layout.html'
    });
    
    
    $httpProvider.interceptors.push('AuthMiddleware');
    
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});
