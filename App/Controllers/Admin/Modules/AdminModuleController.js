app.controller('AdminModuleController',['$scope', '$state','$timeout','AuthMiddleware','ModulesServices', function($scope, $state, $timeout ,AuthMiddleware,ModulesServices){
    
    AuthMiddleware.adminOnly();
	$scope.modules = [];
	ModulesServices.getAll((docs)=>{
		docs.forEach((doc)=>{
			$scope.modules.push({data:doc.data(), id:doc.id});
			$scope.$apply();
		});
	});
    
}]);