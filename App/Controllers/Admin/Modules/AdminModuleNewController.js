app.controller('AdminModuleNewController',['$scope', '$state','$timeout','AuthMiddleware','Module','ModulesServices','UsersServices','ParametersServices', function($scope, $state, $timeout ,AuthMiddleware, Module,ModulesServices,UsersServices,ParametersServices){
    
    AuthMiddleware.adminOnly();
	
	$scope.module = Module;
	
	$scope.statusCodeText = 'Verificar';
	$scope.statusUserSalt = 'Saltar';
	$scope.statusUserText = 'Verificar';
	$scope.parameterOptions = [];
	
	
	$scope.statusCode = false;
	$scope.statusUser = false;
	
	$scope.codeVerify = () => {
		ModulesServices.getByCode($scope.module.code, function(doc){
			$scope.changeStatusCode(doc.empty);
		});
	}
	
	$scope.userVerify = () => {
		UsersServices.getByDocument($scope.module.userId, function(doc){
			$scope.changeStatusUser(doc.empty);
		});
	}
	
	$scope.create = () => {
		$scope.module.create();
	}
	
	$scope.changeCode = () => {
		$scope.changeStatusCode();
	}
	
	$scope.changeUser = () => {
		$scope.changeStatusUser();
	}
	
	$scope.userSalt = () => {
		$scope.statusUserText = 'Saltado';
		$scope.statusUserSalt = 'Saltado';
	}
	
	$scope.changeStatusCode = (validate) => {
		if(validate){
		   	$scope.statusCodeText = 'Verificado';
	
			$scope.statusCode = true;
		}else if(false){
		   	$scope.statusCodeText = 'Código ya existe';
	
			$scope.statusCode = false;
		}else{
			$scope.statusCodeText = 'Verificar';
	
			$scope.statusCode = false;
		}
		aplicarCambios();
	}
	
	$scope.changeStatusUser = (validate) => {
		if(validate){
			$scope.statusUserText = 'Usuario no encontrado';
	
			$scope.statusUser = false;
		}else if(false){
		   	$scope.statusUserText = 'Verificado';
	
			$scope.statusUser = true;
		}else{
			$scope.statusUserText = 'Verificar';
	
			$scope.statusUser = false;
		}
		aplicarCambios();
	}
	
	$scope.changeTypeParamater = () => {
		ParametersServices.getByCrop($scope.typeParameter, function(docs){
			$scope.parameterOptions = [];
			docs.forEach((doc)=>{
				$scope.parameterOptions.push({data: doc.data(), id: doc.id});
			});
			aplicarCambios();
		});
	}
	
	$scope.create = () => {
		if(!$scope.statusCode){
		   	swal('Código sin verificar','El código debe de ser verificado','error');
		}else if(!$scope.statusUser){
			swal({
			  title: "Usuario sin verificar",
			  text: "El usuario no ha sido verificado y no se guadará, ¿desea continuar?",
			  icon: "warning",
			  buttons: true,
			  dangerMode: false,
			})
			.then((willDelete) => {
			  if (willDelete) {
				$scope.module.create();
			  }
			})
		}else if(!$scope.module.parameterId){
			swal('Tipo de cultivo no seleccionado','No ha selecionado un tipo de cultivo','error');
		}else{
			$scope.module.create();
		}
	}
	function aplicarCambios(){
		$scope.$apply();
	}
	
	
}]);