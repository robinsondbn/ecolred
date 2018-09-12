app.controller('RegisterController', ['$scope','User',function($scope,User){
    
    $scope.user = User;
    
    $scope.register = () => {
        var password = $scope.user.password;
        var confirmPassword = $scope.user.confirmpassword;
        if(password === confirmPassword){
            $scope.user.create();
        }else{
            swal('Las contraseñas no coinciden','Lo campos de las contraseñas deben de ser iguales','error');
        }
    }
    
}]);