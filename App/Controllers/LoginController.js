app.controller('LoginController',['$scope', 'User', function($scope, User){
    
    $scope.user = User;
    
    $scope.login = () =>{
        $scope.user.login();
        $scope.user.init({
            email : null,
            password : null
        });
    }
    
}]);