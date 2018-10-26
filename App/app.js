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
        name : 'main.room_temperature',
        url : '/temperatura ambiental',
        controller : 'RoomTemperatureController',
        templateUrl : 'App/Views/Parameters/room_temperature.html'
    }).state({
        name : 'main.relative_humidity',
        url : '/humedad relativa',
        controller : 'RelativeHumidityController',
        templateUrl : 'App/Views/Parameters/relative_humidity.html'
    }).state({
        name : 'main.ph',
        url : '/ph',
        controller : 'PHController',
        templateUrl : 'App/Views/Parameters/ph.html'
    }).state({
        name : 'main.electroconductivity',
        url : '/electroconductividad',
        controller : 'ElectroconductivityController',
        templateUrl : 'App/Views/Parameters/electroconductivity.html'
    }).state({
        name : 'main.water_temperature',
        url : '/temperatura del agua',
        controller : 'WaterTemperatureController',
        templateUrl : 'App/Views/Parameters/water_temperature.html'
    }).state({
        name : 'main.oxygen_water',
        url : '/oxigeno en el agua',
        controller : 'OxygenWaterController',
        templateUrl : 'App/Views/Parameters/oxygen_water.html'
    });
    
    
    $httpProvider.interceptors.push('AuthMiddleware');
    
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});
