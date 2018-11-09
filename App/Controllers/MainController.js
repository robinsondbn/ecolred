app.controller('MainController', ['$scope','$state','$timeout','User', 'AuthMiddleware',function($scope,$state,$timeout,User,AuthMiddleware){
    
    AuthMiddleware.mainOnly();
    
    $scope.showParameter = 0;
    $scope.user = User;
    $scope.name = ' ';
    $scope.messageError = null;
    $scope.contra = {
        pass: null,
        password: null,
        confirmpassword:null
    };
                            
    
    function getUser(){
        firebase.auth().onAuthStateChanged(function(user) { 
            if (user) {
                $scope.user.init({
                    name :  user.displayName,
                    email : user.email
                });
                if(user.displayName){
                    $scope.name = user.displayName;    
                }else{
                    $scope.name = user.email;
                }
            } else {
                $state.go('index.login');
            }
        });    
    }
    
    
    $scope.modifyUser = () => {
        if($scope.user.password || $scope.user.confirmpassword){
            if($scope.user.password === $scope.user.confirmpassword){
                $scope.user.modify();
            }else{
               swal('Las contraseñas no coinciden','error');
            }           
        }else{
            $scope.user.modify();
        }
    }
    
    $scope.logout = () => {
        $scope.user.logout();
    }
    
    $scope.changePasswordFunction = () => {
        if($scope.contra.pass){
            if($scope.contra.pass.length < 6 || $scope.contra.password.length < 6 || $scope.contra.password.length < 6){
               $scope.messageError = 'La contraseña debe de tener mínimo 6 caracteres';
            }else{               
                if($scope.contra.password === $scope.contra.confirmpassword){
                    $scope.messageError = '';
                    $scope.user.changePassword($scope.contra, function(message){
                        $scope.messageError = message;
                    });
                }else{
                    $scope.messageError = 'Las contraseñas no coinciden';
                }
            }
        }else{
           $scope.messageError = 'Debe de colocar la contraseña actual para actualizar';
        }
    }
    
    function pruebaFunction(){
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
    
     $scope.funsions = () => {
       
     }
    
    $timeout(pruebaFunction(),1);
    
    
    
}]);