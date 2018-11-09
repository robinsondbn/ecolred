'use strict';

app.factory('AuthMiddleware', ['$state', function($state){
    
    var authMiddleware = this;
    
    authMiddleware.run = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                $state.go('index.login');
            }
        });
    }
    
    authMiddleware.privileges = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (user.email === 'monte07jul@hotmail.com'){
                    $state.go('main');
                } else {
                    $state.go('admin');
                }
            } else {
                $state.go('index.login');
            }
        });
    }
    
    authMiddleware.mainOnly = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (user.email === 'monte07jul@hotmail.com'){
                    $state.go('admin');
                }
            } else {
                $state.go('index.login');
            }
        });
    }
    
    authMiddleware.adminOnly = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (user.email !== "monte07jul@hotmail.com"){
                    $state.go('main');
                }
            } else {
                $state.go('index.login');
            }
        });
    }
    
    return authMiddleware
}]);