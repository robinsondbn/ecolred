'use strict';

var app = angular.module('autoautomatizacion', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider.state({
        name: 'login',
        url: '/login',
        controller: 'LoginController',
        //template : templateString
        templateUrl: 'Views/login.html'
    }).state({
        name: 'register',
        url: '/register',
        controller: 'RegisterController',
        templateUrl: 'Views/register.html'
    }).state({
        name: 'main',
        url: '/main',
        controller: 'MainController',
        templateUrl: 'Views/main.html'
    });

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});
app.controller('LoginController', ['$scope', 'User', function ($scope, User) {

    $scope.user = User;

    $scope.login = function () {
        $scope.user.login();
        $scope.user.init({
            email: null,
            password: null
        });
    };
}]);
app.controller('MainController', ['$scope', '$state', '$timeout', 'User', function ($scope, $state, $timeout, User) {
    $scope.showParameter = 0;
    $scope.user = User;

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
            $state.go('login');
        }
    });

    $scope.modifyUser = function () {
        if ($scope.user.password || $scope.user.confirmpassword) {
            if ($scope.user.password === $scope.user.confirmpassword) {
                $scope.user.modify();
            } else {
                swal('Las contraseñas no coinciden', '', 'error');
            }
        } else {
            $scope.user.modify();
        }
    };

    $scope.logout = function () {
        $scope.user.logout();
    };

    var barData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)'],
            borderColor: ['rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)'],
            borderWidth: 1
        }]
    };

    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(139, 195, 74, 0.8)'],
            borderColor: [],
            borderWidth: 1
        }]
    };

    var areaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(139, 195, 74, 0.8)'],
            borderColor: ['rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)', 'rgba(139, 195, 74, 1)'],
            borderWidth: 1
        }]
    };

    var pieData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(197, 225, 165, 0.8)', 'rgba(174, 213, 129, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(104, 159, 56, 0.8)', 'rgba(85, 139, 47, 0.8)', 'rgba(51, 105, 30, 0.8)'],
            borderColor: ['rgba(197, 225, 165, 1)', 'rgba(174, 213, 129, 1)', 'rgba(139, 195, 74, 1)', 'rgba(104, 159, 56, 1)', 'rgba(85, 139, 47, 1)', 'rgba(51, 105, 30, 1)'],
            borderWidth: 1
        }]
    };

    var polarData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(197, 225, 165, 0.8)', 'rgba(174, 213, 129, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(104, 159, 56, 0.8)', 'rgba(85, 139, 47, 0.8)', 'rgba(51, 105, 30, 0.8)'],
            borderColor: ['rgba(197, 225, 165, 1)', 'rgba(174, 213, 129, 1)', 'rgba(139, 195, 74, 1)', 'rgba(104, 159, 56, 1)', 'rgba(85, 139, 47, 1)', 'rgba(51, 105, 30, 1)'],
            borderWidth: 1
        }]
    };

    var donaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: ['rgba(197, 225, 165, 0.8)', 'rgba(174, 213, 129, 0.8)', 'rgba(139, 195, 74, 0.8)', 'rgba(104, 159, 56, 0.8)', 'rgba(85, 139, 47, 0.8)', 'rgba(51, 105, 30, 0.8)'],
            borderColor: ['rgba(197, 225, 165, 1)', 'rgba(174, 213, 129, 1)', 'rgba(139, 195, 74, 1)', 'rgba(104, 159, 56, 1)', 'rgba(85, 139, 47, 1)', 'rgba(51, 105, 30, 1)'],
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

    function pruebaFunction() {
        $scope.barChart = new Chart('BarChart', {
            type: 'bar',
            data: barData,
            options: chartOptions
        });
        $scope.lineChart = new Chart('LineChart', {
            type: 'line',
            data: lineData,
            options: chartOptions
        });
        $scope.areaChart = new Chart('AreaChart', {
            type: 'line',
            data: areaData,
            options: chartOptions
        });
        $scope.pieChart = new Chart('PieChart', {
            type: 'pie',
            data: pieData,
            options: chartOptions
        });
        $scope.polarChart = new Chart('PolarChart', {
            type: 'polarArea',
            data: polarData,
            options: chartOptions
        });
        $scope.donaChart = new Chart('DonaChart', {
            type: 'doughnut',
            data: donaData,
            options: chartOptions
        });
    }

    $scope.ramdom = function () {
        var newData = [88, 52, 11, 66, 77, 33];
        $scope.barChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.barChart.update();
        $scope.lineChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.lineChart.update();
        $scope.areaChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.areaChart.update();
        $scope.pieChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.pieChart.update();
        $scope.polarChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.polarChart.update();
        $scope.donaChart.data.datasets.forEach(function (dataset) {
            dataset.data = newData;
        });
        $scope.donaChart.update();
    };

    $timeout(pruebaFunction(), 1000);
}]);
app.controller('RegisterController', ['$scope', 'User', function ($scope, User) {

    $scope.user = User;

    $scope.register = function () {
        var password = $scope.user.password;
        var confirmPassword = $scope.user.confirmpassword;
        if (password === confirmPassword) {
            $scope.user.create();
        } else {
            swal('Las contraseñas no coinciden', 'Lo campos de las contraseñas deben de ser iguales', 'error');
        }
    };
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
app.service('UsersServices', ['$state', function ($state) {

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

    this.logout = function () {
        firebase.auth().signOut().then(function () {
            $state.go('login');
        }).catch(function (err) {
            var errorMesagge = err;
            swal('error a tratar de salir', errorMesagge, 'error');
        });
    };
}]);