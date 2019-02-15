app.service('UsersServices',['AuthServices','$state','AuthMiddleware', function(AuthServices,$state,AuthMiddleware){
   
    this.create = (User) => {
		AuthServices.create(User, function(){
			firebase.auth().onAuthStateChanged(function(userA) {
				if(userA){
				   	db.collection("users").doc(userA.uid).set({
						associationType:  	User.associationType,
					   	name:				User.name,
						lastName:			User.lastName,
						documentType:		User.documentType,
						documentNumber:		User.documentNumber,
						email:				User.email,
						phoneNumber:		User.phoneNumber,
						address:			User.address,
						municipality: 		User.municipality,
						department: 		User.department,
						zone: 				User.zone,
						active:				'esperando',
						modules: []
					})
					.then(function(docRef) {
						$state.go('main');
					})
					.catch(function(error) {
						console.log("Error ingresando el archivo");
						console.log(error);
					});
				}else{
					console.error('no user');
				}
			});
		});
    }
    
    
    
    this.modify = (id, data,callback) => {
        var documentToModify = db.collection('users').doc(id);
		documentToModify.update(data)
		.then(callback()).catch((error)=>{
			console.log(error);
		})
        
    }
	
	this.getAll = (callback) => {
		db.collection('users').get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByDocument = (document, callback) => {
		document = parseInt(document)
		db.collection('users').where("documentNumber","==",document).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByEmail = (email, callback) => {
		db.collection('users').where("email","==",email).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	
	this.addModule = (document, callback) => {
		document = parseInt(document)
		db.collection('users').where("documentNumber","==",document).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
    
}]);