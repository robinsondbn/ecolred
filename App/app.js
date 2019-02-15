var app = angular.module('autoautomatizacion', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $stateProvider.state({
        name : 'index',
        url : '/index',
        controller : 'LoginController',
        //template : templateString
        templateUrl : 'App/Views/index.html'
   }).state({
        name : 'index.login',
        url : '/login',
        controller : 'LoginController',
        templateUrl : 'App/Views/login/cover.html'
    }).state({
        name : 'index.register',
        url : '/register',
        controller : 'RegisterController',
        templateUrl : 'App/Views/login/register.html'
    }).state({
        name : 'main',
        url : '/main',
        controller : 'MainController',
        templateUrl : 'App/Views/main.html'
    }).state({
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
    }).state({
        name : 'admin',
        url : '/administrador',
        controller : 'AdminController',
        templateUrl : 'App/Views/Admin/main.html'
    }).state({//usuarios 
        name : 'admin.users',
        url : '/usuarios',
        controller : 'AdminUserController',
        templateUrl : 'App/Views/Admin/Users/user.html'
    }).state({
        name: 'admin.users_info',
        url:'/usuarios/{nick_user}',
        controller : 'AdminUserModifyController',
        templateUrl : 'App/Views/Admin/Users/info.html',
		resolve:{
			Document: ['$stateParams', function($stateParams){
				return $stateParams.nick_user
			}]
		}
    }).state({//parámetros
        name : 'admin.parameters',
        url : '/parámetros',
        controller : 'AdminParameterController',
        templateUrl : 'App/Views/Admin/Parameters/parameter.html'
    }).state({
        name : 'admin.parameters_new',
        url : '/parámetros',
        controller : 'AdminParameterNewController',
        templateUrl : 'App/Views/Admin/Parameters/new.html'
    }).state({
        name : 'admin.parameters_modify',
        url : '/parámetros/:nick_parameter',
        controller : 'AdminParameterModifyController',
        templateUrl : 'App/Views/Admin/Parameters/modify.html',
		resolve:{
			Document :['$stateParams', function($stateParams){
				return $stateParams.nick_parameter
			}]
		}
    }).state({//módulos
        name : 'admin.modules',
        url : '/módulos',
        controller : 'AdminModuleController',
        templateUrl : 'App/Views/Admin/Modules/module.html'
    }).state({
        name : 'admin.modules_new',
        url : '/módulos',
        controller : 'AdminModuleNewController',
        templateUrl : 'App/Views/Admin/Modules/new.html'
    }).state({
        name : 'admin.modules_modify',
        url : '/módulos/:nick_module',
        controller : 'AdminModuleModifyController',
        templateUrl : 'App/Views/Admin/Modules/modify.html',
		resolve:{
			Document :['$stateParams', function($stateParams){
				return $stateParams.nick_module
			}]
		}
    }).state({//Guías
        name : 'admin.guide',
        url : '/archivos',
        controller : 'AdminGuideController',
        templateUrl : 'App/Views/Admin/Guides/guide.html'
    });
    
    
    $httpProvider.interceptors.push('AuthMiddleware');
    
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});
