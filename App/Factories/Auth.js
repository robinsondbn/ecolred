app.factory('Auth', ['AuthServices','$state', function(AuthServices, $state){
    
    let auth = {
		name:null,
        email: null,
        password: null,
		confirmpassword: null
    };
    
    auth.init = (setup) => {
		auth.name = setup.name;
        auth.email = setup.email;
        auth.password = setup.password;
        auth.confirmpassword = setup.confirmpassword;
    }
    
    auth.create = () => {
        let newUser = {
            email:    auth.email,
            password: auth.password
        }
		
        AuthServices.create(newUser);
        auth.reset();
        
    }
    
    auth.modify = () => {
        let modifyUser = {
            name : auth.name,
            email : auth.email
        }
        
        AuthServices.modify(modifyUser);
    }
    
    auth.changePassword = (UserData, errorMessage) => {
        AuthServices.changePassword(UserData, function(err){
            if(err.code == 'auth/wrong-password'){
                errorMessage('Contraseña no valida');
            }else if(err.code == 'auth/weak-password');{
                errorMessage('La contraseña debe de tener mínimo 6 caracteres');
            }
        });
    }
    
    auth.login = () => {
        let loginUser = {
            email : auth.email,
            password : auth.password
        }
		if(loginUser.password.length < 6){
		   swal('Datos no validos','La contraseña debe de tener como mínimo 6 carácteres','error');
		}else{
			$('#loginOfThis').modal('hide');
			auth.reset();
        	AuthServices.login(loginUser);
		}
        
    }
    
    auth.logout = () => {
        AuthServices.logout();
    }
    
    auth.reset = () => {
        auth.name = null;
        auth.email = null;
        auth.password = null;
        auth.confirmpassword = null;
    }
    
    return auth
}]);