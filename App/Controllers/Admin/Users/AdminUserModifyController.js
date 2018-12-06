app.controller('AdminUserModifyController',['$scope', '$state','$timeout','AuthMiddleware', function($scope, $state, $timeout ,AuthMiddleware){
    
    AuthMiddleware.adminOnly();
    
}]);