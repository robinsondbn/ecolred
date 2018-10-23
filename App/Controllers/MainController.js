app.controller('MainController', ['$scope','$state','$timeout','User', function($scope,$state,$timeout,User){
    $scope.showParameter = 0;
    $scope.user = User;
    $scope.name = ' ';
    
    function getUser(){
        /*firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.user.init({
                    name :  user.displayName,
                    email : user.email
                });
                if(user.displayName){
                    $scope.name = user.displayName;    
                }else{
                    $scope.name = user.email;
                }
            } else { console.log('error, no hay usuario');}
        }); */       
    }
    
    
    $scope.modifyUser = () => {
        if($scope.user.password || $scope.user.confirmpassword){
            if($scope.user.password === $scope.user.confirmpassword){
                $scope.user.modify();
            }else{
               swal('Las contraseñas no coinciden','error');
            }           
        }else{
            $scope.user.modify();
        }
    }
    
    $scope.logout = () => {
        $scope.user.logout();
    }
    
    var barData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)'
            ],
            borderColor: [
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var lineData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [ 'rgba(139, 195, 74, 0.8)'],
            borderColor: [ ],
            borderWidth: 1
        }]
    };
    
    var areaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(139, 195, 74, 0.8)'
            ],
            borderColor: [
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(139, 195, 74, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var pieData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var polarData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var donaData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [{
            label: 'Parámetros',
            data: [99, 22, 7, 40, 1, 25],
            backgroundColor: [
                'rgba(197, 225, 165, 0.8)',
                'rgba(174, 213, 129, 0.8)',
                'rgba(139, 195, 74, 0.8)',
                'rgba(104, 159, 56, 0.8)',
                'rgba(85, 139, 47, 0.8)',
                'rgba(51, 105, 30, 0.8)'
            ],
            borderColor: [
                'rgba(197, 225, 165, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(85, 139, 47, 1)',
                'rgba(51, 105, 30, 1)'
            ],
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
    
    function pruebaFunction(){
        //llamada de función para optener el usuario
        getUser();
        
        $scope.barChart = new Chart('BarChart', {
            type : 'bar',
            data: barData,
            options : chartOptions
        });
        $scope.lineChart = new Chart('LineChart', {
            type : 'line',
            data: lineData,
            options : chartOptions
        });
        $scope.areaChart = new Chart('AreaChart', {
            type : 'line',
            data: areaData,
            options : chartOptions
        });
        $scope.pieChart = new Chart('PieChart', {
            type : 'pie',
            data: pieData,
            options : chartOptions
        });
        $scope.polarChart = new Chart('PolarChart', {
            type : 'polarArea',
            data: polarData,
            options : chartOptions
        });
        $scope.donaChart = new Chart('DonaChart', {
            type : 'doughnut',
            data: donaData,
            options : chartOptions
        });
    }
    
    $scope.ramdom = () => {
        var newData = [88,52,11,66,77,33];
        $scope.barChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.barChart.update();
        $scope.lineChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.lineChart.update();
        $scope.areaChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.areaChart.update();
        $scope.pieChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.pieChart.update();
        $scope.polarChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.polarChart.update();
        $scope.donaChart.data.datasets.forEach((dataset) => {
            dataset.data = newData;
        });
        $scope.donaChart.update();
    }
    
     $scope.funsions = () => {
       
     }
    
    $timeout(pruebaFunction(),1000);
    
    
    
}]);