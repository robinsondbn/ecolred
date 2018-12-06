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
    }).state({
        name: 'admin',
        url: '/administrador',
        controller: 'AdminController',
        templateUrl: 'App/Views/Admin/main.html'
    }).state({ //usuarios 
        name: 'admin.users',
        url: '/usuarios',
        controller: 'AdminUserController',
        templateUrl: 'App/Views/Admin/Users/user.html'
    }).state({
        name: 'admin.users.info',
        url: '/usuarios',
        controller: 'AdminUserModifyController',
        templateUrl: 'App/Views/Admin/Users/info.html'
    }).state({ //parámetros
        name: 'admin.parameters',
        url: '/parámetros',
        controller: 'AdminParameterController',
        templateUrl: 'App/Views/Admin/Parameters/parameter.html'
    }).state({
        name: 'admin.parameters.modify',
        url: '/parámetros',
        controller: 'AdminParameterModifyController',
        templateUrl: 'App/Views/Admin/Parameters/modify.html'
    }).state({ //Guías
        name: 'admin.guide',
        url: '/archivos',
        controller: 'AdminGuideController',
        templateUrl: 'App/Views/Admin/guide.html'
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
                text: "¿Esta seguro que desea enviar la información?",
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
app.controller('AdminController', ['$scope', '$state', '$timeout', 'UsersServices', 'AuthMiddleware', function ($scope, $state, $timeout, UsersServices, AuthMiddleware) {

    AuthMiddleware.adminOnly();

    $scope.llamarDatos = function () {
        firebase.database().ref('/users/').once('value').then(function (snapshot) {
            $scope.array = snapshot.val();
        });
    };

    $scope.salir = function () {
        UsersServices.logout();
    };
}]);
app.controller('ElectroconductivityController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

    $('#datepickerElectroconductivity').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });

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

    $('#datepickerOxygenWater').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });

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

    $('#datepickerPH').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });
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

    $('#datepickerRelativeHumidity').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });
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

    $('#datepickerRoomTemperature').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });

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

    $('#datepickerWaterTemperature').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        language: "es",
        autoclose: true
    }).on('changeDate', function (selected) {
        console.log(selected.date);
    });

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
app.controller('MainController', ['$scope', '$state', '$timeout', 'User', 'AuthMiddleware', function ($scope, $state, $timeout, User, AuthMiddleware) {

    AuthMiddleware.mainOnly();

    $scope.showParameter = 0;
    $scope.user = User;
    $scope.name = ' ';
    $scope.messageError = null;
    $scope.contra = {
        pass: null,
        password: null,
        confirmpassword: null
    };

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

    $scope.changePasswordFunction = function () {
        if ($scope.contra.pass) {
            if ($scope.contra.pass.length < 6 || $scope.contra.password.length < 6 || $scope.contra.password.length < 6) {
                $scope.messageError = 'La contraseña debe de tener mínimo 6 caracteres';
            } else {
                if ($scope.contra.password === $scope.contra.confirmpassword) {
                    $scope.messageError = '';
                    $scope.user.changePassword($scope.contra, function (message) {
                        $scope.messageError = message;
                    });
                } else {
                    $scope.messageError = 'Las contraseñas no coinciden';
                }
            }
        } else {
            $scope.messageError = 'Debe de colocar la contraseña actual para actualizar';
        }
    };

    function pruebaFunction() {
        //llamada de función para optener el usuario
        getUser();
    }

    //    $scope.ramdom = () => {
    //        var newData = [88,52,11,66,77,33];
    //        $scope.barChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.barChart.update();
    //        $scope.lineChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.lineChart.update();
    //        $scope.areaChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.areaChart.update();
    //        $scope.pieChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.pieChart.update();
    //        $scope.polarChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.polarChart.update();
    //        $scope.donaChart.data.datasets.forEach((dataset) => {
    //            dataset.data = newData;
    //        });
    //        $scope.donaChart.update();
    //    }

    $scope.funsions = function () {};

    $timeout(pruebaFunction(), 1);
}]);
app.controller('AdminGuideController', ['$scope', '$state', '$timeout', 'AuthMiddleware', function ($scope, $state, $timeout, AuthMiddleware) {

    AuthMiddleware.adminOnly();
}]);
app.controller('AdminParameterController', ['$scope', '$state', '$timeout', 'AuthMiddleware', function ($scope, $state, $timeout, AuthMiddleware) {

    AuthMiddleware.adminOnly();
}]);
app.controller('AdminUserController', ['$scope', '$state', '$timeout', 'AuthMiddleware', function ($scope, $state, $timeout, AuthMiddleware) {

    AuthMiddleware.adminOnly();
}]);
app.controller('AdminUserModifyController', ['$scope', '$state', '$timeout', 'AuthMiddleware', function ($scope, $state, $timeout, AuthMiddleware) {

    AuthMiddleware.adminOnly();
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
        associationType: null,
        name: null,
        lastName: null,
        documentType: null,
        documentNumber: null,
        email: null,
        phoneNumber: null,
        address: null,
        municipality: null,
        department: null,
        zone: null,
        password: null,
        confirmpassword: null
    };

    user.init = function (setup) {
        user.associationType = setup.associationType;
        user.name = setup.name;
        user.lastName = setup.lastName;
        user.documentType = setup.documentType;
        user.documentNumber = setup.documentNumber;
        user.email = setup.email;
        user.phoneNumber = setup.phoneNumber;
        user.address = setup.address;
        user.municipality = setup.municipality;
        user.department = setup.department;
        user.zone = setup.zone;
        user.password = setup.password;
        user.confirmpassword = setup.confirmpassword;
    };

    user.create = function () {
        var newUser = {
            associationType: user.associationType,
            name: user.name,
            lastName: user.lastName,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            municipality: user.municipality,
            department: user.department,
            zone: user.zone,
            password: user.password
        };
        console.log(newUser);
        UsersServices.create(newUser);
        user.reset();
    };

    user.modify = function () {
        var modifyUser = {
            name: user.name,
            email: user.email
        };

        UsersServices.modify(modifyUser);
    };

    user.changePassword = function (UserData, errorMessage) {
        UsersServices.changePassword(UserData, function (err) {
            if (err.code == 'auth/wrong-password') {
                errorMessage('Contraseña no valida');
            } else if (err.code == 'auth/weak-password') ;{
                errorMessage('La contraseña debe de tener mínimo 6 caracteres');
            }
        });
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

    authMiddleware.run = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                $state.go('index.login');
            }
        });
    };

    authMiddleware.privileges = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.email === 'monte07jul@hotmail.com') {
                    $state.go('main');
                } else {
                    $state.go('admin');
                }
            } else {
                $state.go('index.login');
            }
        });
    };

    authMiddleware.mainOnly = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.email === 'monte07jul@hotmail.com') {
                    $state.go('admin');
                }
            } else {
                $state.go('index.login');
            }
        });
    };

    authMiddleware.adminOnly = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.email !== "monte07jul@hotmail.com") {
                    $state.go('main');
                }
            } else {
                $state.go('index.login');
            }
        });
    };

    return authMiddleware;
}]);
app.service('UsersServices', ['$state', 'AuthMiddleware', function ($state, AuthMiddleware) {
    var _this = this;

    this.create = function (User) {

        var email = User.email;
        var password = User.password;
        console.log(User);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    database.ref('users/' + user.uid).set(User, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('todo bien');
                        }
                    });
                    user.updateProfile({
                        displayName: User.name,
                        phoneNumber: User.phoneNumber
                    }).then(function (User) {
                        //firebase.auth().signOut();
                    }).catch(function (error) {
                        //firebase.auth().signOut();
                    });
                } else {
                    // No user is signed in.
                }
            });
            /*swal("Usuario creado con éxito", "Datos guardados correctamente!", "success").then(() => {
                $state.reload();
                $state.go('main');
            });*/
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
                        $state.reload();
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

    this.changePassword = function (DataUser, errorCallback) {
        var UserToModify = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(UserToModify.email, DataUser.pass);
        UserToModify.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            UserToModify.updatePassword(DataUser.password).then(function () {
                firebase.auth().signOut().then(function () {
                    $('#User').modal('hide');
                    $state.go('index.login');
                }).catch(function (err) {
                    errorCallback(err);
                });
            }).catch(function (err) {
                errorCallback(err);
            });
        }).catch(function (error) {
            errorCallback(error);
        });
    };

    this.login = function (User) {
        firebase.auth().signInWithEmailAndPassword(User.email, User.password).then(function () {
            AuthMiddleware.privileges();
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

    this.getAllUser = function () {
        var data = firebase.database().ref('users');
        data.on('value', function (snapshop) {
            console.log(snapshop);
        });
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