app.factory('Parameter', ['ParametersServices','$state', function(ParametersServices, $state){
    
    let parameter = {
        typeofcrop : 				null,
		name : 						null,
		roomTemperature : 			{min:null, max:null},
		relativeHumidity :			{min:null, max:null},
		ph : 						{min:null, max:null},
		electroconductivity : 		{min:null, max:null, measure: null},
		waterTemperature : 			{min:null, max:null},
		dissolvedOxygenInTheWater : {min:null, max:null}
    };
    
    parameter.init = (setup) => {
		parameter.typeofcrop = 					setup.typeofcrop;
		parameter.name = 						setup.name;
		parameter.roomTemperature = 			setup.roomTemperature;
		parameter.relativeHumidity = 			setup.relativeHumidity;
		parameter.ph = 							setup.ph;
		parameter.electroconductivity = 		setup.electroconductivity;
		parameter.waterTemperature = 			setup.waterTemperature;
		parameter.dissolvedOxygenInTheWater = 	setup.dissolvedOxygenInTheWater;
    }
    
    parameter.create = () => {
        let newParameter = {
            typeofcrop : 				parameter.typeofcrop,
			name : 						parameter.name,
			roomTemperature : 			parameter.roomTemperature,
			relativeHumidity : 			parameter.relativeHumidity,
			ph : 						parameter.ph,
			electroconductivity : 		parameter.electroconductivity,
			waterTemperature : 			parameter.waterTemperature,
			dissolvedOxygenInTheWater : parameter.dissolvedOxygenInTheWater
        }
		ParametersServices.create(newParameter, function(docRef){
			parameter.reset();
			$state.go('admin.parameters');
			swal('Datos Guardados con éxito!','','success');
		});
    }
    
    parameter.modify = (id) => {
        let modifyParameter = {
            typeofcrop : 				parameter.typeofcrop,
			name : 						parameter.name,
			roomTemperature : 			parameter.roomTemperature,
			relativeHumidity : 			parameter.relativeHumidity,
			ph : 						parameter.ph,
			electroconductivity : 		parameter.electroconductivity,
			waterTemperature : 			parameter.waterTemperature,
			dissolvedOxygenInTheWater : parameter.dissolvedOxygenInTheWater
        }
		console.log(modifyParameter);
		ParametersServices.modify(id, modifyParameter, function(docRef){
			$state.go('admin.parameters');
			swal('dato modificado con éxito','','success');
		});
    }
	
    
    parameter.reset = () => {
        parameter.typeofcrop = 					null;
		parameter.name = 						null;
		parameter.roomTemperature = 			{min:null, max:null};
		parameter.relativeHumidity = 			{min:null, max:null};
		parameter.ph = 							{min:null, max:null};
		parameter.electroconductivity = 		{min:null, max:null, measure: null};
		parameter.waterTemperature = 			{min:null, max:null};
		parameter.dissolvedOxygenInTheWater = 	{min:null, max:null};
    }
	
    
    return parameter
}]);