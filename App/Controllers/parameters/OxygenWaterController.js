app.controller('OxygenWaterController',['$scope', '$state','$timeout', function($scope, $state, $timeout){
    
   var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: '%',
            data: [19, 15, 24, 20, 18, 20],
            backgroundColor: [ 'rgba(139, 195, 74, 0.8)'],
            borderColor: [ ],
            borderWidth: 1
        }]
    };
    
    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    
    function startFunction(){
        $scope.lineChart = new Chart('LineChart', {
            type : 'line',
            data: lineData,
            options : chartOptions
        });
    }
    
    
    $timeout(startFunction(),1000);  
    
}]);