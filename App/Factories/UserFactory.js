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
        confirmpassword : null,
		comment : null,
		modules : []
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
		user.comment = setup.comment;
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
            password:           user.password,
			comment:			null
        }
        //console.log(newUser);
		
		if(newUser.associationType == null || newUser.associationType == '' || newUser.name == null || newUser.name == '' || newUser.lastName == null || newUser.lastName == '' || newUser.documentType == null || newUser.documentType == '' || newUser.documentNumber == null || newUser.documentNumber == '' || newUser.email == null || newUser.email == '' || newUser.phoneNumber == null || newUser.phoneNumber == '' || newUser.address == null || newUser.address == '' || newUser.municipality == null || newUser.municipality == '' || newUser.department == null || newUser.department == '' || newUser.zone == null || newUser.zone == '' || newUser.password == null || newUser.password == ''){
		   swal('Campos incompletos','Todos los campos son obligatorios','error');
		}else{
			UsersServices.getByDocument(newUser.documentNumber, function(docNumbers){
				if(docNumbers.empty){
					UsersServices.getByEmail(newUser.email, function(emails){
						if(emails.empty){
							UsersServices.create(newUser);
							user.reset();  
						}else{
							swal('El correo digitado ya se encuentra registrado','Por favor digite otro correo','error');
						}
					});
				}else{
					swal('El documento digitado ya se encuentra registrado','Por favor verifique que el documento sea el suyo, si lo es y presentael mismo error por favor pongase en contacto con nosotros','error');
				};
			});
		   	
		}
        
    }
    
    user.modify = () => {
        let modifyUser = {
            name : user.name,
            email : user.email
        }
        
        UsersServices.modify(modifyUser);
    }
	
	user.refuseUser = (id) => {
		let modifyUser = {
			comment:	user.comment?user.comment:'rechazado',
			active: 	'rechazado'
		}
		UsersServices.modify(id,modifyUser, function(){
			swal({
  				title: 'Usuario rechazado con éxito',
  				text: "",
  				type: 'success',
  				confirmButtonColor: '#3085d6'
			}).then((result) => {
				user.reset();
  				$state.go('admin.users');
			})
		});
	}
	
	user.acceptUser = (id) => {
		let modifyUser = {
			comment:	user.comment?user.comment:'nada',
			active: 	'aceptado'
		}
		UsersServices.modify(id,modifyUser, function(){
			swal({
  				title: 'Usuario aceptado con éxito',
  				text: "",
  				type: 'success',
  				confirmButtonColor: '#3085d6'
			}).then((result) => {
				user.reset();
  				$state.go('admin.users');
			})
		});
	}
    
    user.reset = () => {
        user.name = null;
        user.email = null;
        user.password = null;
        user.confirmpassword = null;
		user.comment = null;
    }
	
    
    return user
}]);