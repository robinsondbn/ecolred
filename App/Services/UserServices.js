app.service('UsersServices',['$state', function($state){
   
    this.create = (User) => {
        
        var email = User.email;
        var password = User.password;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                swal("Usuario creado con éxito", "Datos guardados correctamente!", "success").then(() => {
                    $state.reload();
                    $state.go('main');
                });            
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                if(errorCode === 'auth/email-already-in-use'){
                    swal('Correo en uso','El correo ya se encuentra registrado','error');
                }else if(errorCode === 'auth/weak-password'){
                    swal('Contraseña erronea','La contraseña debe de contener como mínimo 6 carácteres','error');
                }
            });
    }
    
    this.modify = (User) => {
        var UserToModify = firebase.auth().currentUser;
        if(User.name){
            UserToModify.updateProfile({
                displayName : User.name
            }).then(()=>{
                if(User.email){
                    UserToModify.updateEmail(User.email).then(()=>{
                            $state.reload();
                        }).catch((err2)=>{
                            swal('Error',err2, 'error');        
                        });
                }else{
                    $state.reload();
                }
            }).catch((err)=>{
                swal('Error',err, 'error');
            });
        }else{
            swal('Error desconocido','Ha ocurrido un error al modificar los datos, estamos trabajando en ello','error');
        }
        
    }
    
    this.changePassword = (DataUser, errorCallback) => {
        var UserToModify = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(UserToModify.email, DataUser.pass);
        UserToModify.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
          UserToModify.updatePassword(DataUser.password).then(()=>{
              firebase.auth().signOut().then(()=>{
                  $('#User').modal('hide');
                  $state.go('index.login');
              }).catch((err)=>{
                  errorCallback(err);
              });
          }).catch((err)=>{
              errorCallback(err);
          });
        }).catch(function(error) {
          errorCallback(error);
        });
    }
    
    this.login = (User) => {
        firebase.auth().signInWithEmailAndPassword(User.email, User.password).then(()=>{
                $state.go('main');
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
    }
    
    this.getUser = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            return await user
        });
    }
    
    this.logout = () => {
        firebase.auth().signOut().then(()=>{
            $state.go('index.login');
        }).catch((err)=>{
            var errorMesagge = err;
            swal('error a tratar de salir',errorMesagge, 'error');
        });
    }
    
}]);