app.service('ParametersServices',['$state','AuthMiddleware', function($state,AuthMiddleware){
   
    this.create = (Parameter, callback) => {
		db.collection("parameters").add(Parameter)
		.then(function(docRef) {
			callback(docRef);
		})
		.catch(function(error) {
			console.error(error);
		});
    }
    
    this.modify = (id, data, callback) => {
        var documentToModify = db.collection('parameters').doc(id);
		documentToModify.update(data)
		.then(function(){
			callback()	
		}).catch((error)=>{
			console.log(error);
		})
        
    }
	
	this.getAll = (callback) => {
		db.collection('parameters').get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByCrop = (name, callback) => {
		db.collection('parameters').where("typeofcrop","==",name).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByName = (name, callback) => {
		db.collection('parameters').where("name","==",name).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	this.getById = (id, callback) => {
		db.collection('parameters').doc(id).get().then((docs)=>{callback(docs)}).catch((error)=>{console.log(error);});
	}
    
}]);