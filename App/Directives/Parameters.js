app.directive('parametros', ['$state', function($state){
    return {
        restrict : 'E',
        scope : {
            name : '@',
            elements : '='
        },
        templateUrl : 'Templates/Parameters.html',
        //link : link,
        controller : ['$scope', function($scope){
            
        }]
    }
}]);