app.service('AuthServices',['$state','AuthMiddleware', function($state,AuthMiddleware){
   
    this.create = (User, callback) => {
		firebase.auth().createUserWithEmailAndPassword(User.email, User.password).then(function(){callback()}).catch(function(error){
			var errorCode = error.code;
  			var errorMessage = error.message;
			if(errorCode == 'auth/email-already-in-use'){
				swal('El usuario ya se encuentra registrado','El correo electrónico ya se encuentra en uso','error');   
			}
		});
    }
    
    this.modify = (User) => {
        console.log(User);
    }
    
    this.changePassword = (DataUser, errorCallback) => {
        console.log(User);
    }
    
    this.login = (User) => {
        firebase.auth().signInWithEmailAndPassword(User.email, User.password).then(()=>{
        	AuthMiddleware.privileges();
        }).catch(function(error) {
        	var errorCode = error.code;
            var errorMessage = error.message;
			console.log(error);
			if(errorCode == 'auth/wrong-password' || errorCode == 'auth/user-not-found'){
				swal('Correo o contraseña incorrectos','Por favor vuelva a ingresar los datos','error');
			}
        });
    }
    
    this.logout = () => {
    	firebase.auth().signOut().then(function() {
		  $state.go('index');
		}).catch(function(error) {
		  console.log(error);
		});
    }
    
}]);