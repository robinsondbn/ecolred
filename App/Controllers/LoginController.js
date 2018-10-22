app.controller('LoginController',['$scope', '$state', 'User', function($scope, $state, User){
    
    $scope.user = User;
    
    $scope.login = () =>{
      $('#loginOfThis').modal('hide');
      $scope.user.login();
      $scope.user.init({
          email : null,
          password : null
      });
    }
    
    $scope.redirect = () =>{
        $('#loginOfThis').modal('hide');
        $state.go('register');
    }
    
}]);