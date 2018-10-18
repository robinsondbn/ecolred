app.controller('RegisterController', ['$scope','User',function($scope,User){
    
    $scope.user = User;
    
    $scope.register = () => {
      var password = $scope.user.password;
      var confirmPassword = $scope.user.confirmpassword;
      if(password === confirmPassword){
        swal({
          title: "Formulario completo",
          text: "¿Esta seguro que desea enviar la informacion?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("La informacion a sido enviada correctamente", {
              icon: "success",
            });
            $scope.user.create();
          } else {
            swal("De acuerdo, la informacion nofue enviada");
          }
        });

      }else{
          swal('Las contraseñas no coinciden','Lo campos de las contraseñas deben de ser iguales','error');
      }
    }
    
}]);