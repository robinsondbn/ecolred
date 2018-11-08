app.factory('User', ['UsersServices','$state', function(UsersServices, $state){
    
    let user = {
        name : null,
        email : null,
        password : null,
        confirmpassword : null
    };
    
    user.init = (setup) => {
        user.name = setup.name;
        user.email = setup.email;
        user.password = setup.password;
        user.confirmpassword = setup.confirmpassword;
    }
    
    user.create = () => {
        let newUser = {
            name : user.name,
            email : user.email,
            password : user.password
        }
        UsersServices.create(newUser);
        user.reset();
        
    }
    
    user.modify = () => {
        let modifyUser = {
            name : user.name,
            email : user.email
        }
        
        UsersServices.modify(modifyUser);
    }
    
    user.changePassword = (UserData, errorMessage) => {
        UsersServices.changePassword(UserData, function(err){
            if(err.code == 'auth/wrong-password'){
                errorMessage('Contraseña no valida');
            }else if(err.code == 'auth/weak-password');{
                errorMessage('La contraseña debe de tener mínimo 6 caracteres');
            }
        });
    }
    
    user.login = () => {
        let loginUser = {
            email : user.email,
            password : user.password
        }
        
        UsersServices.login(loginUser);
    }
    
    user.logout = () => {
        UsersServices.logout();
    }
    
    user.reset = () => {
        user.name = null;
        user.email = null;
        user.password = null;
        user.confirmpassword = null;
    }
    
    return user
}]);