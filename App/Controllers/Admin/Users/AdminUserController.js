app.controller('AdminUserController',['$scope', '$state','$timeout','AuthMiddleware','UsersServices', function($scope, $state, $timeout ,AuthMiddleware,UsersServices){
    
    AuthMiddleware.adminOnly();
	
	$scope.docs = [];
	
	UsersServices.getAll(function(docs){
		$scope.docs = [];
		docs.forEach(function(doc){
			$scope.docs.push(doc.data());
		});
		
		$scope.$apply();
	});
    
}]);