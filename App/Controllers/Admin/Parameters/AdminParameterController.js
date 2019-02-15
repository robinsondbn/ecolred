app.controller('AdminParameterController',['$scope', '$state','$timeout','AuthMiddleware','ParametersServices', function($scope, $state, $timeout ,AuthMiddleware,ParametersServices){
    
    AuthMiddleware.adminOnly();
	$scope.parameters = [];
	ParametersServices.getAll((docs)=>{
		docs.forEach((doc)=>{
			$scope.parameters.push({data:doc.data(), id:doc.id});
			$scope.$apply();
		});
	});
    
}]);