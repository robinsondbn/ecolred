app.factory('Module', ['ModulesServices','$state','UsersServices', function(ModulesServices, $state, UsersServices){
    
    let module = {
        code : 			null,
		userId : 		null,
		parameterId : 	null,
		dateInit :		null
    };
    
    module.init = (setup) => {
		module.code = 			setup.code;
		module.userId = 		setup.userId;
		module.parameterId = 	setup.parameterId;
		module.dateInit = 		setup.dateInit;
    }
    
    module.create = () => {
        let newModule = {
            code : 			module.code,
			userId : 		module.userId,
			parameterId : 	module.parameterId,
			dateInit : 		new Date()
        }
		if(newModule.userId){
		   UsersServices.addModule(newModule.userId, function(docs){
			   var id = null;
			   var modules = [];
			   docs.forEach((doc)=>{
				   id = doc.id;
				   modules = doc.data().modules
			   });
			   modules.push(newModule.code);
			   var data = {modules : modules};
			   UsersServices.modify(id, data, function(){});
		   });
		}
		ModulesServices.create(newModule, function(docRef){
			module.reset();
			$state.go('admin.modules');
			swal('Datos Guardados con éxito!','','success');
		});
    }
    
    module.modify = (id) => {
        let modifyModule = {
            code : 			module.code,
			userId : 		module.userId,
			parameterId : 	module.parameterId,
			dateInit : 		module.dateInit
        }
		ModulesServices.modify(id, modifyModule, function(docRef){
			$state.go('admin.modules');
			swal('Dato modificado con éxito','','success');
		});
    }
	
    
    module.reset = () => {
        module.code = 			null;
		module.userId = 		null;
		module.parameterId = 	null;
		module.dateInit = 		null;
    }
	
    
    return module
}]);