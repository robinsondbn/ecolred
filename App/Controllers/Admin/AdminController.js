app.controller('AdminController',['$scope', '$state','$timeout','AuthServices','AuthMiddleware', function($scope, $state, $timeout,AuthServices,AuthMiddleware){
    
    AuthMiddleware.adminOnly();
    
    $scope.logout = () => {
        AuthServices.logout();
    }
    
}]);