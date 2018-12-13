app.controller('AdminController',['$scope', '$state','$timeout','UsersServices','AuthMiddleware', function($scope, $state, $timeout,UsersServices,AuthMiddleware){
    
    AuthMiddleware.adminOnly();
    
    $scope.llamarDatos = () => {
        firebase.database().ref('/users/').once('value').then((snapshot)=>{
            $scope.array = snapshot.val();
        });
    }
    
    $scope.logout = () => {
        UsersServices.logout();
    }
    
}]);