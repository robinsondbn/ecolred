app.service('ModulesServices',['$state','AuthMiddleware', function($state,AuthMiddleware){
   
    this.create = (Module, callback) => {
		db.collection("modules").add(Module)
		.then(function(docRef) {
			callback(docRef);
		})
		.catch(function(error) {
			console.error(error);
		});
    }
    
    this.modify = (id, data, callback) => {
        var documentToModify = db.collection('modules').doc(id);
		documentToModify.update(data)
		.then(function(){
			callback()	
		}).catch((error)=>{
			console.log(error);
		})
        
    }
	
	this.getAll = (callback) => {
		db.collection('modules').get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByCode = (code, callback) => {
		db.collection('modules').where("code","==",code).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByUser = (user, callback) => {
		db.collection('modules').where("userId","==",user).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByParameter = (parameter, callback) => {
		db.collection('modules').where("parameterId","==",parameter).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	
	this.getById = (id, callback) => {
		db.collection('modules').doc(id).get().then((docs)=>{callback(docs)}).catch((error)=>{console.log(error);});
	}
    
}]);