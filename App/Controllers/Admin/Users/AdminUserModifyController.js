app.controller('AdminUserModifyController',['$scope', '$state','$timeout','AuthMiddleware','User','UsersServices','Document', function($scope, $state, $timeout ,AuthMiddleware,User,UsersServices,Document){
    
	AuthMiddleware.adminOnly();
    
	$scope.user = User;
	$scope.id = null;
	var documents = [];
	var ids = [];
	UsersServices.getByDocument(parseInt(Document), function(docs){
		docs.forEach(function(doc){
			ids.push(doc.id);
			documents.push(doc.data());
		});
		$scope.id = ids[0];
		$scope.user.init(documents[0]);
		$scope.$apply();
	});
	
	$scope.accept = () => {
		User.acceptUser($scope.id);
	}
	
	$scope.refuse = () => {
		User.refuseUser($scope.id);
	}
    
}]);