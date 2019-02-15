app.controller('RegisterController', ['$scope','User',function($scope,User){
    
    $scope.user = User;
    
    $scope.register = () => {
        console.log(
            $scope.user.associationType, 
            $scope.user.name,
            $scope.user.lastName,
            $scope.user.documentType,
            $scope.user.documentNumber,
            $scope.user.email,
            $scope.user.phoneNumber,
            $scope.user.address,
            $scope.user.municipality,
            $scope.user.department);
      var password = $scope.user.password;
      var confirmPassword = $scope.user.confirmpassword;
        
      if(password === confirmPassword){
        swal({
          title: "Formulario completo",
          text: "¿Esta seguro que desea enviar la información?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            $scope.user.create();
          }
        });

      }else{
          swal('Las contraseñas no coinciden','Lo campos de las contraseñas deben de ser iguales','error');
      }
    }
    
}]);