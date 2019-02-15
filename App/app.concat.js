'use strict';

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
        name: 'admin.users_info',
        url: '/usuarios/{nick_user}',
        controller: 'AdminUserModifyController',
        templateUrl: 'App/Views/Admin/Users/info.html',
        resolve: {
            Document: ['$stateParams', function ($stateParams) {
                return $stateParams.nick_user;
            }]
        }
    }).state({ //parámetros
        name: 'admin.parameters',
        url: '/parámetros',
        controller: 'AdminParameterController',
        templateUrl: 'App/Views/Admin/Parameters/parameter.html'
    }).state({
        name: 'admin.parameters_new',
        url: '/parámetros',
        controller: 'AdminParameterNewController',
        templateUrl: 'App/Views/Admin/Parameters/new.html'
    }).state({
        name: 'admin.parameters_modify',
        url: '/parámetros/:nick_parameter',
        controller: 'AdminParameterModifyController',
        templateUrl: 'App/Views/Admin/Parameters/modify.html',
        resolve: {
            Document: ['$stateParams', function ($stateParams) {
                return $stateParams.nick_parameter;
            }]
        }
    }).state({ //módulos
        name: 'admin.modules',
        url: '/módulos',
        controller: 'AdminModuleController',
        templateUrl: 'App/Views/Admin/Modules/module.html'
    }).state({
        name: 'admin.modules_new',
        url: '/módulos',
        controller: 'AdminModuleNewController',
        templateUrl: 'App/Views/Admin/Modules/new.html'
    }).state({
        name: 'admin.modules_modify',
        url: '/módulos/:nick_module',
        controller: 'AdminModuleModifyController',
        templateUrl: 'App/Views/Admin/Modules/modify.html',
        resolve: {
            Document: ['$stateParams', function ($stateParams) {
                return $stateParams.nick_module;
            }]
        }
    }).state({ //Guías
        name: 'admin.guide',
        url: '/archivos',
        controller: 'AdminGuideController',
        templateUrl: 'App/Views/Admin/Guides/guide.html'
    });

    $httpProvider.interceptors.push('AuthMiddleware');

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go('main');
    });
});

app.controller('ParametersController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {}]);
app.controller('AdminController', ['$scope', '$state', '$timeout', 'AuthServices', 'AuthMiddleware', function ($scope, $state, $timeout, AuthServices, AuthMiddleware) {

    AuthMiddleware.adminOnly();

    $scope.logout = function () {
        AuthServices.logout();
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
app.controller('LoginController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {

    $scope.auth = Auth;

    $scope.login = function () {
        $scope.auth.login();
    };

    $scope.redirect = function () {
        $('#loginOfThis').modal('hide');
        $state.go('register');
    };
}]);
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
                    $scope.user.create();
                }
            });
        } else {
            swal('Las contraseñas no coinciden', 'Lo campos de las contraseñas deben de ser iguales', 'error');
        }
    };
}]);
app.controller('MainController', ['$scope', '$state', '$timeout', 'User', 'AuthMiddleware', 'AuthServices', function ($scope, $state, $timeout, User, AuthMiddleware, AuthServices) {

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
        AuthServices.logout();
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
app.controller('AdminModuleController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'ModulesServices', function ($scope, $state, $timeout, AuthMiddleware, ModulesServices) {

    AuthMiddleware.adminOnly();
    $scope.modules = [];
    ModulesServices.getAll(function (docs) {
        docs.forEach(function (doc) {
            $scope.modules.push({ data: doc.data(), id: doc.id });
            $scope.$apply();
        });
    });
}]);
app.controller('AdminModuleModifyController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'Document', 'ModulesServices', 'Module', function ($scope, $state, $timeout, AuthMiddleware, Document, ModulesServices, Module) {

    AuthMiddleware.adminOnly();

    $scope.module = Module;

    ModulesServices.getById(Document, function (response) {
        $scope.module.init(response.data());
        $scope.$apply();
    });

    $scope.modify = function () {
        swal({
            title: "¿Seguro quiere modificar?",
            text: "Los datos serán modifcados y serán usados en futuras consultas",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(function (modify) {
            if (modify) {
                $scope.module.modify(Document);
            }
        });
    };
}]);
app.controller('AdminModuleNewController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'Module', 'ModulesServices', 'UsersServices', 'ParametersServices', function ($scope, $state, $timeout, AuthMiddleware, Module, ModulesServices, UsersServices, ParametersServices) {

    AuthMiddleware.adminOnly();

    $scope.module = Module;

    $scope.statusCodeText = 'Verificar';
    $scope.statusUserSalt = 'Saltar';
    $scope.statusUserText = 'Verificar';
    $scope.parameterOptions = [];

    $scope.statusCode = false;
    $scope.statusUser = false;

    $scope.codeVerify = function () {
        ModulesServices.getByCode($scope.module.code, function (doc) {
            $scope.changeStatusCode(doc.empty);
        });
    };

    $scope.userVerify = function () {
        UsersServices.getByDocument($scope.module.userId, function (doc) {
            $scope.changeStatusUser(doc.empty);
        });
    };

    $scope.create = function () {
        $scope.module.create();
    };

    $scope.changeCode = function () {
        $scope.changeStatusCode();
    };

    $scope.changeUser = function () {
        $scope.changeStatusUser();
    };

    $scope.userSalt = function () {
        $scope.statusUserText = 'Saltado';
        $scope.statusUserSalt = 'Saltado';
    };

    $scope.changeStatusCode = function (validate) {
        if (validate) {
            $scope.statusCodeText = 'Verificado';

            $scope.statusCode = true;
        } else if (false) {
            $scope.statusCodeText = 'Código ya existe';

            $scope.statusCode = false;
        } else {
            $scope.statusCodeText = 'Verificar';

            $scope.statusCode = false;
        }
        aplicarCambios();
    };

    $scope.changeStatusUser = function (validate) {
        if (validate) {
            $scope.statusUserText = 'Usuario no encontrado';

            $scope.statusUser = false;
        } else if (false) {
            $scope.statusUserText = 'Verificado';

            $scope.statusUser = true;
        } else {
            $scope.statusUserText = 'Verificar';

            $scope.statusUser = false;
        }
        aplicarCambios();
    };

    $scope.changeTypeParamater = function () {
        ParametersServices.getByCrop($scope.typeParameter, function (docs) {
            $scope.parameterOptions = [];
            docs.forEach(function (doc) {
                $scope.parameterOptions.push({ data: doc.data(), id: doc.id });
            });
            aplicarCambios();
        });
    };

    $scope.create = function () {
        if (!$scope.statusCode) {
            swal('Código sin verificar', 'El código debe de ser verificado', 'error');
        } else if (!$scope.statusUser) {
            swal({
                title: "Usuario sin verificar",
                text: "El usuario no ha sido verificado y no se guadará, ¿desea continuar?",
                icon: "warning",
                buttons: true,
                dangerMode: false
            }).then(function (willDelete) {
                if (willDelete) {
                    $scope.module.create();
                }
            });
        } else if (!$scope.module.parameterId) {
            swal('Tipo de cultivo no seleccionado', 'No ha selecionado un tipo de cultivo', 'error');
        } else {
            $scope.module.create();
        }
    };
    function aplicarCambios() {
        $scope.$apply();
    }
}]);
app.controller('AdminUserController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'UsersServices', function ($scope, $state, $timeout, AuthMiddleware, UsersServices) {

    AuthMiddleware.adminOnly();

    $scope.docs = [];

    UsersServices.getAll(function (docs) {
        $scope.docs = [];
        docs.forEach(function (doc) {
            $scope.docs.push(doc.data());
        });

        $scope.$apply();
    });
}]);
app.controller('AdminUserModifyController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'User', 'UsersServices', 'Document', function ($scope, $state, $timeout, AuthMiddleware, User, UsersServices, Document) {

    AuthMiddleware.adminOnly();

    $scope.user = User;
    $scope.id = null;
    var documents = [];
    var ids = [];
    UsersServices.getByDocument(parseInt(Document), function (docs) {
        docs.forEach(function (doc) {
            ids.push(doc.id);
            documents.push(doc.data());
        });
        $scope.id = ids[0];
        $scope.user.init(documents[0]);
        $scope.$apply();
    });

    $scope.accept = function () {
        User.acceptUser($scope.id);
    };

    $scope.refuse = function () {
        User.refuseUser($scope.id);
    };
}]);
app.controller('AdminParameterController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'ParametersServices', function ($scope, $state, $timeout, AuthMiddleware, ParametersServices) {

    AuthMiddleware.adminOnly();
    $scope.parameters = [];
    ParametersServices.getAll(function (docs) {
        docs.forEach(function (doc) {
            $scope.parameters.push({ data: doc.data(), id: doc.id });
            $scope.$apply();
        });
    });
}]);
app.controller('AdminParameterModifyController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'Document', 'ParametersServices', 'Parameter', function ($scope, $state, $timeout, AuthMiddleware, Document, ParametersServices, Parameter) {

    AuthMiddleware.adminOnly();

    $scope.action = 'Consulta';

    $scope.parameter = Parameter;

    ParametersServices.getById(Document, function (response) {
        $scope.parameter.init(response.data());
        $scope.$apply();
    });

    $scope.modify = function () {

        swal({
            title: "¿Seguro quiere modificar?",
            text: "Los datos serán modifcados y serán usados en futuras consultas",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(function (modify) {
            if (modify) {
                $scope.parameter.modify(Document);
            }
        });
    };
}]);
app.controller('AdminParameterNewController', ['$scope', '$state', '$timeout', 'AuthMiddleware', 'Parameter', function ($scope, $state, $timeout, AuthMiddleware, Parameter) {

    AuthMiddleware.adminOnly();

    $scope.parameter = Parameter;

    $scope.create = function () {
        $scope.parameter.create();
    };
}]);
app.controller('AdminGuideController', ['$scope', '$state', '$timeout', 'AuthMiddleware', function ($scope, $state, $timeout, AuthMiddleware) {

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
app.factory('Auth', ['AuthServices', '$state', function (AuthServices, $state) {

    var auth = {
        name: null,
        email: null,
        password: null,
        confirmpassword: null
    };

    auth.init = function (setup) {
        auth.name = setup.name;
        auth.email = setup.email;
        auth.password = setup.password;
        auth.confirmpassword = setup.confirmpassword;
    };

    auth.create = function () {
        var newUser = {
            email: auth.email,
            password: auth.password
        };

        AuthServices.create(newUser);
        auth.reset();
    };

    auth.modify = function () {
        var modifyUser = {
            name: auth.name,
            email: auth.email
        };

        AuthServices.modify(modifyUser);
    };

    auth.changePassword = function (UserData, errorMessage) {
        AuthServices.changePassword(UserData, function (err) {
            if (err.code == 'auth/wrong-password') {
                errorMessage('Contraseña no valida');
            } else if (err.code == 'auth/weak-password') ;{
                errorMessage('La contraseña debe de tener mínimo 6 caracteres');
            }
        });
    };

    auth.login = function () {
        var loginUser = {
            email: auth.email,
            password: auth.password
        };
        if (loginUser.password.length < 6) {
            swal('Datos no validos', 'La contraseña debe de tener como mínimo 6 carácteres', 'error');
        } else {
            $('#loginOfThis').modal('hide');
            auth.reset();
            AuthServices.login(loginUser);
        }
    };

    auth.logout = function () {
        AuthServices.logout();
    };

    auth.reset = function () {
        auth.name = null;
        auth.email = null;
        auth.password = null;
        auth.confirmpassword = null;
    };

    return auth;
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
        confirmpassword: null,
        comment: null,
        modules: []
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
        user.comment = setup.comment;
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
            password: user.password,
            comment: null
            //console.log(newUser);

        };if (newUser.associationType == null || newUser.associationType == '' || newUser.name == null || newUser.name == '' || newUser.lastName == null || newUser.lastName == '' || newUser.documentType == null || newUser.documentType == '' || newUser.documentNumber == null || newUser.documentNumber == '' || newUser.email == null || newUser.email == '' || newUser.phoneNumber == null || newUser.phoneNumber == '' || newUser.address == null || newUser.address == '' || newUser.municipality == null || newUser.municipality == '' || newUser.department == null || newUser.department == '' || newUser.zone == null || newUser.zone == '' || newUser.password == null || newUser.password == '') {
            swal('Campos incompletos', 'Todos los campos son obligatorios', 'error');
        } else {
            UsersServices.getByDocument(newUser.documentNumber, function (docNumbers) {
                if (docNumbers.empty) {
                    UsersServices.getByEmail(newUser.email, function (emails) {
                        if (emails.empty) {
                            UsersServices.create(newUser);
                            user.reset();
                        } else {
                            swal('El correo digitado ya se encuentra registrado', 'Por favor digite otro correo', 'error');
                        }
                    });
                } else {
                    swal('El documento digitado ya se encuentra registrado', 'Por favor verifique que el documento sea el suyo, si lo es y presentael mismo error por favor pongase en contacto con nosotros', 'error');
                };
            });
        }
    };

    user.modify = function () {
        var modifyUser = {
            name: user.name,
            email: user.email
        };

        UsersServices.modify(modifyUser);
    };

    user.refuseUser = function (id) {
        var modifyUser = {
            comment: user.comment ? user.comment : 'rechazado',
            active: 'rechazado'
        };
        UsersServices.modify(id, modifyUser, function () {
            swal({
                title: 'Usuario rechazado con éxito',
                text: "",
                type: 'success',
                confirmButtonColor: '#3085d6'
            }).then(function (result) {
                user.reset();
                $state.go('admin.users');
            });
        });
    };

    user.acceptUser = function (id) {
        var modifyUser = {
            comment: user.comment ? user.comment : 'nada',
            active: 'aceptado'
        };
        UsersServices.modify(id, modifyUser, function () {
            swal({
                title: 'Usuario aceptado con éxito',
                text: "",
                type: 'success',
                confirmButtonColor: '#3085d6'
            }).then(function (result) {
                user.reset();
                $state.go('admin.users');
            });
        });
    };

    user.reset = function () {
        user.name = null;
        user.email = null;
        user.password = null;
        user.confirmpassword = null;
        user.comment = null;
    };

    return user;
}]);
app.factory('Module', ['ModulesServices', '$state', 'UsersServices', function (ModulesServices, $state, UsersServices) {

    var module = {
        code: null,
        userId: null,
        parameterId: null,
        dateInit: null
    };

    module.init = function (setup) {
        module.code = setup.code;
        module.userId = setup.userId;
        module.parameterId = setup.parameterId;
        module.dateInit = setup.dateInit;
    };

    module.create = function () {
        var newModule = {
            code: module.code,
            userId: module.userId,
            parameterId: module.parameterId,
            dateInit: new Date()
        };
        if (newModule.userId) {
            UsersServices.addModule(newModule.userId, function (docs) {
                var id = null;
                var modules = [];
                docs.forEach(function (doc) {
                    id = doc.id;
                    modules = doc.data().modules;
                });
                modules.push(newModule.code);
                var data = { modules: modules };
                UsersServices.modify(id, data, function () {});
            });
        }
        ModulesServices.create(newModule, function (docRef) {
            module.reset();
            $state.go('admin.modules');
            swal('Datos Guardados con éxito!', '', 'success');
        });
    };

    module.modify = function (id) {
        var modifyModule = {
            code: module.code,
            userId: module.userId,
            parameterId: module.parameterId,
            dateInit: module.dateInit
        };
        ModulesServices.modify(id, modifyModule, function (docRef) {
            $state.go('admin.modules');
            swal('Dato modificado con éxito', '', 'success');
        });
    };

    module.reset = function () {
        module.code = null;
        module.userId = null;
        module.parameterId = null;
        module.dateInit = null;
    };

    return module;
}]);
app.factory('Parameter', ['ParametersServices', '$state', function (ParametersServices, $state) {

    var parameter = {
        typeofcrop: null,
        name: null,
        roomTemperature: { min: null, max: null },
        relativeHumidity: { min: null, max: null },
        ph: { min: null, max: null },
        electroconductivity: { min: null, max: null, measure: null },
        waterTemperature: { min: null, max: null },
        dissolvedOxygenInTheWater: { min: null, max: null }
    };

    parameter.init = function (setup) {
        parameter.typeofcrop = setup.typeofcrop;
        parameter.name = setup.name;
        parameter.roomTemperature = setup.roomTemperature;
        parameter.relativeHumidity = setup.relativeHumidity;
        parameter.ph = setup.ph;
        parameter.electroconductivity = setup.electroconductivity;
        parameter.waterTemperature = setup.waterTemperature;
        parameter.dissolvedOxygenInTheWater = setup.dissolvedOxygenInTheWater;
    };

    parameter.create = function () {
        var newParameter = {
            typeofcrop: parameter.typeofcrop,
            name: parameter.name,
            roomTemperature: parameter.roomTemperature,
            relativeHumidity: parameter.relativeHumidity,
            ph: parameter.ph,
            electroconductivity: parameter.electroconductivity,
            waterTemperature: parameter.waterTemperature,
            dissolvedOxygenInTheWater: parameter.dissolvedOxygenInTheWater
        };
        ParametersServices.create(newParameter, function (docRef) {
            swal('Datos Guardados con éxito!', '', 'success');
        });
    };

    parameter.modify = function (id) {
        console.log('is here');
        var modifyParameter = {
            typeofcrop: parameter.typeofcrop,
            name: parameter.name,
            roomTemperature: parameter.roomTemperature,
            relativeHumidity: parameter.relativeHumidity,
            ph: parameter.ph,
            electroconductivity: parameter.electroconductivity,
            waterTemperature: parameter.waterTemperature,
            dissolvedOxygenInTheWater: parameter.dissolvedOxygenInTheWater
        };
        console.log(modifyParameter);
        ParametersServices.modify(id, modifyParameter, function (docRef) {
            $state.go('admin.parameters');
            swal('dato modificado con éxito', '', 'success');
        });
    };

    parameter.reset = function () {
        parameter.typeofcrop = null;
        parameter.name = null;
        parameter.roomTemperature = { min: null, max: null };
        parameter.relativeHumidity = { min: null, max: null };
        parameter.ph = { min: null, max: null };
        parameter.electroconductivity = { min: null, max: null, measure: null };
        parameter.waterTemperature = { min: null, max: null };
        parameter.dissolvedOxygenInTheWater = { min: null, max: null };
    };

    return parameter;
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
app.service('AuthServices', ['$state', 'AuthMiddleware', function ($state, AuthMiddleware) {

    this.create = function (User, callback) {
        firebase.auth().createUserWithEmailAndPassword(User.email, User.password).then(function () {
            callback();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                swal('El usuario ya se encuentra registrado', 'El correo electrónico ya se encuentra en uso', 'error');
            }
        });
    };

    this.modify = function (User) {
        console.log(User);
    };

    this.changePassword = function (DataUser, errorCallback) {
        console.log(User);
    };

    this.login = function (User) {
        firebase.auth().signInWithEmailAndPassword(User.email, User.password).then(function () {
            AuthMiddleware.privileges();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            if (errorCode == 'auth/wrong-password' || errorCode == 'auth/user-not-found') {
                swal('Correo o contraseña incorrectos', 'Por favor vuelva a ingresar los datos', 'error');
            }
        });
    };

    this.logout = function () {
        firebase.auth().signOut().then(function () {
            $state.go('index');
        }).catch(function (error) {
            console.log(error);
        });
    };
}]);
app.service('UsersServices', ['AuthServices', '$state', 'AuthMiddleware', function (AuthServices, $state, AuthMiddleware) {

    this.create = function (User) {
        AuthServices.create(User, function () {
            firebase.auth().onAuthStateChanged(function (userA) {
                if (userA) {
                    db.collection("users").doc(userA.uid).set({
                        associationType: User.associationType,
                        name: User.name,
                        lastName: User.lastName,
                        documentType: User.documentType,
                        documentNumber: User.documentNumber,
                        email: User.email,
                        phoneNumber: User.phoneNumber,
                        address: User.address,
                        municipality: User.municipality,
                        department: User.department,
                        zone: User.zone,
                        active: 'esperando',
                        modules: []
                    }).then(function (docRef) {
                        $state.go('main');
                    }).catch(function (error) {
                        console.log("Error ingresando el archivo");
                        console.log(error);
                    });
                } else {
                    console.error('no user');
                }
            });
        });
    };

    this.modify = function (id, data, callback) {
        var documentToModify = db.collection('users').doc(id);
        documentToModify.update(data).then(callback()).catch(function (error) {
            console.log(error);
        });
    };

    this.getAll = function (callback) {
        db.collection('users').get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByDocument = function (document, callback) {
        document = parseInt(document);
        db.collection('users').where("documentNumber", "==", document).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByEmail = function (email, callback) {
        db.collection('users').where("email", "==", email).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.addModule = function (document, callback) {
        document = parseInt(document);
        db.collection('users').where("documentNumber", "==", document).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };
}]);
app.service('ModulesServices', ['$state', 'AuthMiddleware', function ($state, AuthMiddleware) {

    this.create = function (Module, callback) {
        db.collection("modules").add(Module).then(function (docRef) {
            callback(docRef);
        }).catch(function (error) {
            console.error(error);
        });
    };

    this.modify = function (id, data, callback) {
        var documentToModify = db.collection('modules').doc(id);
        documentToModify.update(data).then(function () {
            callback();
        }).catch(function (error) {
            console.log(error);
        });
    };

    this.getAll = function (callback) {
        db.collection('modules').get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByCode = function (code, callback) {
        db.collection('modules').where("code", "==", code).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByUser = function (user, callback) {
        db.collection('modules').where("userId", "==", user).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByParameter = function (parameter, callback) {
        db.collection('modules').where("parameterId", "==", parameter).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getById = function (id, callback) {
        db.collection('modules').doc(id).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log(error);
        });
    };
}]);
app.service('ParametersServices', ['$state', 'AuthMiddleware', function ($state, AuthMiddleware) {

    this.create = function (Parameter, callback) {
        db.collection("parameters").add(Parameter).then(function (docRef) {
            callback(docRef);
        }).catch(function (error) {
            console.error(error);
        });
    };

    this.modify = function (id, data, callback) {
        var documentToModify = db.collection('parameters').doc(id);
        documentToModify.update(data).then(function () {
            callback();
        }).catch(function (error) {
            console.log(error);
        });
    };

    this.getAll = function (callback) {
        db.collection('parameters').get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByCrop = function (name, callback) {
        db.collection('parameters').where("typeofcrop", "==", name).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    this.getByName = function (name, callback) {
        db.collection('parameters').where("name", "==", name).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };
    this.getById = function (id, callback) {
        db.collection('parameters').doc(id).get().then(function (docs) {
            callback(docs);
        }).catch(function (error) {
            console.log(error);
        });
    };
}]);