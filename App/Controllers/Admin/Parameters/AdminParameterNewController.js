app.controller('AdminParameterNewController',['$scope', '$state','$timeout','AuthMiddleware','Parameter', function($scope, $state, $timeout ,AuthMiddleware,Parameter){
    
    AuthMiddleware.adminOnly();
	
	$scope.parameter = Parameter;
	
	$scope.create = () => {
		$scope.parameter.create();
	}
    
}]);