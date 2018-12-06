app.controller('AdminParameterController',['$scope', '$state','$timeout','AuthMiddleware', function($scope, $state, $timeout ,AuthMiddleware){
    
    AuthMiddleware.adminOnly();
    
}]);