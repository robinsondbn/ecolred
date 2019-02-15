app.service('PruebasServices',['$state', function($state){
   
    this.create = (dato) => {
		db.collection("prueba").add(dato)
		.then(function(docRef) {
			callback(docRef);
		})
		.catch(function(error) {
			console.error(error);
		});
    }
    
    this.modify = (id, data,callback) => {
        var documentToModify = db.collection('prueba').doc(id);
		documentToModify.update(data)
		.then(function(){
			callback()	
		}).catch((error)=>{
			console.log(error);
		})        
    }
	
	this.getAll = (callback) => {
		db.collection('prueba').get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
	
	this.getByQuery = (query, callback) => {
		db.collection('prueba').where(query).get().then(function(docs){
			callback(docs);
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	}
    
}]);