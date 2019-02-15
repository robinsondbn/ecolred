app.controller('LoginController',['$scope', '$state', 'Auth', function($scope, $state, Auth){
    
    $scope.auth = Auth;
    
    $scope.login = () =>{
      $scope.auth.login();
    }
    
    $scope.redirect = () =>{
        $('#loginOfThis').modal('hide');
        $state.go('register');
    }
    
}]);