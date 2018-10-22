'use strict';

app.factory('AuthMiddleware', ['$state', function($state){
    
    var authMiddleware = this;
    
    authMiddleware.run = (event) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                $state.go('index.login');
            }
        });
    }
    
    return {
        run : authMiddleware.run
    }
}]);