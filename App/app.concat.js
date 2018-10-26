'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = angular.module('autoautomatizacion', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider.state({
        name: 'index',
        url: '/index',
        controller: 'LoginController',
        //template : templateString
        templateUrl: 'App/Views/index.html'
    }).state({
        name: 'index.login',
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'App/Views/login/cover.html'
    }).state({
        name: 'index.register',
        url: '/register',
        controller: 'RegisterController',
        templateUrl: 'App/Views/login/register.html'
    }).state({
        name: 'main',
        url: '/main',
        controller: 'MainController',
        templateUrl: 'App/Views/main.html'
    }).state({
        name: 'main.room_temperature',
        url: '/temperatura ambiental',
        controller: 'RoomTemperatureController',
        templateUrl: 'App/Views/Parameters/room_temperature.html'
    }).state({
        name: 'main.relative_humidity',
        url: '/humedad relativa',
        controller: 'RelativeHumidityController',
        templateUrl: 'App/Views/Parameters/relative_humidity.html'
    }).state({
        name: 'main.ph',
        url: '/ph',
        controller: 'PHController',
        templateUrl: 'App/Views/Parameters/ph.html'
    }).state({
        name: 'main.electroconductivity',
        url: '/electroconductividad',
        controller: 'ElectroconductivityController',
        templateUrl: 'App/Views/Parameters/electroconductivity.html'
    }).state({
        name: 'main.water_temperature',
        url: '/temperatura del agua',
        controller: 'WaterTemperatureController',
        templateUrl: 'App/Views/Parameters/water_temperature.html'
    }).state({
        name: 'main.oxygen_water',
        url: '/oxigeno en el agua',
        controller: 'OxygenWaterController',
        templateUrl: 'App/Views/Parameters/oxygen_water.html'
    });

    $httpProvider.interceptors.push('AuthMiddleware');

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});

app.controller('LoginController', ['$scope', '$state', 'User', function ($scope, $state, User) {

    $scope.user = User;

    $scope.login = function () {
        $('#loginOfThis').modal('hide');
        $scope.user.login();
        $scope.user.init({
            email: null,
            password: null
        });
    };

    $scope.redirect = function () {
        $('#loginOfThis').modal('hide');
        $state.go('register');
    };
}]);
app.controller('MainController', ['$scope', '$state', '$timeout', 'User', function ($scope, $state, $timeout, User) {
    $scope.showParameter = 0;
    $scope.user = User;
    $scope.name = ' ';

    function getUser() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $scope.user.init({
                    name: user.displayName,
                    email: user.email
                });
                if (user.displayName) {
                    $scope.name = user.displayName;
                } else {
                    $scope.name = user.email;
                }
            } else {
                $state.go('index.login');
            }
        });
    }

    $scope.modifyUser = function () {
        if ($scope.user.password || $scope.user.confirmpassword) {
            if ($scope.user.password === $scope.user.confirmpassword) {
                $scope.user.modify();
            } else {
                swal('Las contraseñas no coinciden', 'error');
            }
        } else {
            $scope.user.modify();
        }
    };

    $scope.logout = function () {
        $scope.user.logout();
    };

    /*var barData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)'
            ],
            borderColor: [
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [ 'rgba(139, 195, 74, 0.8)'],
            borderColor: [ ],
            borderWidth: 1
        }]
    };
    
    var areaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)'
            ],
            borderColor: [
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var pieData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var polarData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var donaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    
    function pruebaFunction(){
        //llamada de función para optener el usuario
        getUser();
        
        $scope.barChart = new Chart('BarChart', {
            type : 'bar',
            data: barData,
            options : chartOptions
        });
        $scope.lineChart = new Chart('LineChart', {
            type : 'line',
            data: lineData,
            options : chartOptions
        });
        $scope.areaChart = new Chart('AreaChart', {
            type : 'line',
            data: areaData,
            options : chartOptions
        });
        $scope.pieChart = new Chart('PieChart', {
            type : 'pie',
            data: pieData,
            options : chartOptions
        });
        $scope.polarChart = new Chart('PolarChart', {
            type : 'polarArea',
            data: polarData,
            options : chartOptions
        });
        $scope.donaChart = new Chart('DonaChart', {
            type : 'doughnut',
            data: donaData,
            options : chartOptions
        });
    }
    
    $scope.ramdom = () => {
        var newData = [88,52,11,66,77,33];
        $scope.barChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.barChart.update();
        $scope.lineChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.lineChart.update();
        $scope.areaChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.areaChart.update();
        $scope.pieChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.pieChart.update();
        $scope.polarChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.polarChart.update();
        $scope.donaChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.donaChart.update();
    }
    
     $scope.funsions = () => {
       
     }*/

    //$timeout(pruebaFunction(),1000);

}]);
app.controller('ParametersController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {}]);
app.controller('RegisterController', ['$scope', 'User', function ($scope, User) {

    $scope.user = User;

    $scope.register = function () {
        console.log($scope.user.associationType, $scope.user.name, $scope.user.lastName, $scope.user.documentType, $scope.user.documentNumber, $scope.user.email, $scope.user.phoneNumber, $scope.user.address, $scope.user.municipality, $scope.user.department);
        var password = $scope.user.password;
        var confirmPassword = $scope.user.confirmpassword;
        if (password === confirmPassword) {
            swal({
                title: "Formulario completo",
                text: "¿Esta seguro que desea enviar la informacion?",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(function (willDelete) {
                if (willDelete) {
                    swal("La informacion a sido enviada correctamente", {
                        icon: "success"
                    });
                    $scope.user.create();
                } else {
                    swal("De acuerdo, la informacion no fue enviada");
                }
            });
        } else {
            swal('Las contraseñas no coinciden', 'Lo campos de las contraseñas deben de ser iguales', 'error');
        }
    };
}]);
app.controller('ElectroconductivityController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'mS',
            data: [1.8, 1.9, 1.7, 1.9, 2, 2.2],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.controller('OxygenWaterController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: '%',
            data: [19, 15, 24, 20, 18, 20],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.controller('PHController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'valor',
            data: [7, 7.5, 7, 7.5, 7, 7.5],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.controller('RelativeHumidityController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: '%',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.controller('RoomTemperatureController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Grados Centigrados',
            data: [28, 27, 29, 28, 27, 28],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.controller('WaterTemperatureController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Grados Centigrados',
            data: [27, 28, 29, 26, 27, 26],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    function startFunction() {
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
    }

    $timeout(startFunction(), 1000);
}]);
app.directive('parametros', ['$state', function ($state) {
    return {
        restrict: 'E',
        scope: {
            name: '@',
            elements: '='
        },
        templateUrl: 'Templates/Parameters.html',
        //link : link,
        controller: ['$scope', function ($scope) {}]
    };
}]);
app.factory('User', ['UsersServices', '$state', function (UsersServices, $state) {

    var user = {
        name: null,
        email: null,
        password: null,
        confirmpassword: null
    };

    user.init = function (setup) {
        user.name = setup.name;
        user.email = setup.email;
        user.password = setup.password;
        user.confirmpassword = setup.confirmpassword;
    };

    user.create = function () {
        var newUser = {
            name: user.name,
            email: user.email,
            password: user.password
        };
        UsersServices.create(newUser);
        user.reset();
    };

    user.modify = function () {
        var modifyUser = {
            name: user.name,
            email: user.email,
            password: user.password
        };

        UsersServices.modify(modifyUser);
    };

    user.login = function () {
        var loginUser = {
            email: user.email,
            password: user.password
        };

        UsersServices.login(loginUser);
    };

    user.logout = function () {
        UsersServices.logout();
    };

    user.reset = function () {
        user.name = null;
        user.email = null;
        user.password = null;
        user.confirmpassword = null;
    };

    return user;
}]);
'use strict';

app.factory('AuthMiddleware', ['$state', function ($state) {

    var authMiddleware = this;

    authMiddleware.run = function (event) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                $state.go('index.login');
            }
        });
    };

    return {
        run: authMiddleware.run
    };
}]);
app.service('UsersServices', ['$state', function ($state) {
    var _this = this;

    this.create = function (User) {

        var email = User.email;
        var password = User.password;

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            swal("Usuario creado con éxito", "Datos guardados correctamente!", "success").then(function () {
                $state.reload();
                $state.go('main');
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);

            if (errorCode === 'auth/email-already-in-use') {
                swal('Correo en uso', 'El correo ya se encuentra registrado', 'error');
            } else if (errorCode === 'auth/weak-password') {
                swal('Contraseña erronea', 'La contraseña debe de contener como mínimo 6 carácteres', 'error');
            }
        });
    };

    this.modify = function (User) {
        var UserToModify = firebase.auth().currentUser;
        if (User.name) {
            UserToModify.updateProfile({
                displayName: User.name
            }).then(function () {
                if (User.email) {
                    UserToModify.updateEmail(User.email).then(function () {
                        if (User.password) {
                            UserToModify.updatePassword(User.password).then(function () {
                                $state.reload();
                            }).catch(function (err3) {
                                swal('Error', err3, 'error');
                            });
                        } else {
                            $state.reload();
                        }
                    }).catch(function (err2) {
                        swal('Error', err2, 'error');
                    });
                } else {
                    $state.reload();
                }
            }).catch(function (err) {
                swal('Error', err, 'error');
            });
        } else {
            swal('Error desconocido', 'Ha ocurrido un error al modificar los datos, estamos trabajando en ello', 'error');
        }
    };

    this.login = function (User) {
        firebase.auth().signInWithEmailAndPassword(User.email, User.password).then(function () {
            $state.go('main');
            swal('Bienvenido');
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };

    this.getUser = function () {
        firebase.auth().onAuthStateChanged(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return user;

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
    };

    this.logout = function () {
        firebase.auth().signOut().then(function () {
            $state.go('index.login');
        }).catch(function (err) {
            var errorMesagge = err;
            swal('error a tratar de salir', errorMesagge, 'error');
        });
    };
}]);