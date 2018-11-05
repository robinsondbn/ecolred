app.controller('WaterTemperatureController',['$scope', '$state','$timeout', function($scope, $state, $timeout){
    
  $('#datepickerWaterTemperature').datepicker({
      format: "dd/mm/yyyy",
      maxViewMode: 2,
      language: "es",
      autoclose: true
    }).on('changeDate', function (selected) {
      console.log(selected.date);
  });
  
     var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Grados Centigrados',
            data: [27, 28, 29, 26, 27, 26],
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