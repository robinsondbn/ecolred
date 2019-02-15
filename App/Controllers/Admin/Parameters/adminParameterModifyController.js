app.controller('AdminParameterModifyController',['$scope', '$state','$timeout','AuthMiddleware','Document','ParametersServices','Parameter', function($scope, $state, $timeout ,AuthMiddleware,Document,ParametersServices,Parameter){
    
    AuthMiddleware.adminOnly();
	
	$scope.action = 'Consulta';
	
	$scope.parameter = Parameter;
	
	ParametersServices.getById(Document, function(response){
		$scope.parameter.init(response.data());
		$scope.$apply();
	});
	
	$scope.modify = () => {
		
		swal({
			title: "¿Seguro quiere modificar?",
			text: "Los datos serán modifcados y serán usados en futuras consultas",
			icon: "warning",
			buttons: true,
  			dangerMode: true,
		}).then((modify) => {
  			if(modify){
				$scope.parameter.modify(Document);
			}
		});
		
	}
	
    
}]);