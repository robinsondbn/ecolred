app.factory('User', ['UsersServices','$state', function(UsersServices, $state){
    
    let user = {
        associationType: null,
        name: null,
        lastName: null,
        documentType: null,
        documentNumber: null,
        email: null,
        phoneNumber: null,
        address: null,
        municipality: null,
        department: null,
        zone: null,
        password : null,
        confirmpassword : null
    };
    
    user.init = (setup) => {
        user.associationType = setup.associationType;
        user.name = setup.name;
        user.lastName = setup.lastName;
        user.documentType = setup.documentType;
        user.documentNumber = setup.documentNumber;
        user.email = setup.email;
        user.phoneNumber = setup.phoneNumber;
        user.address = setup.address;
        user.municipality = setup.municipality;
        user.department = setup.department;
        user.zone = setup.zone;
        user.password = setup.password;
        user.confirmpassword = setup.confirmpassword;
    }
    
    user.create = () => {
        let newUser = {
            associationType:    user.associationType,
            name:               user.name,
            lastName:           user.lastName,
            documentType:       user.documentType,
            documentNumber:     user.documentNumber,
            email:              user.email,
            phoneNumber:        user.phoneNumber,
            address:            user.address,
            municipality:       user.municipality,
            department:         user.department,
            zone:               user.zone,
            password:           user.password
        }
        console.log(newUser);
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