app.controller('AdminModuleModifyController',['$scope', '$state','$timeout','AuthMiddleware','Document','ModulesServices','Module', function($scope, $state, $timeout ,AuthMiddleware,Document,ModulesServices,Module){
    
    AuthMiddleware.adminOnly();
	
	$scope.module = Module;
	
	ModulesServices.getById(Document, function(response){
		$scope.module.init(response.data());
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
				$scope.module.modify(Document);
			}
		});
	}
    
}]);