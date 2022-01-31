
app.controller('DepositCtrl', ['$scope', 'DepositService',function ($scope, DepositService) {

        var baseUrl = 'http://localhost:3000/';

        $scope.metricas=[
            {id:'min',type:'Min'},
            {id:'max',type:'Max'},
            {id:'avg',type:'Promedio'},
            {id:'total',type:'Total'},
        ];

        $scope.studentID = 0;
        $scope.resumen= [];
        $scope.model={
            cbFamily:'',
            cbMetrica:'',
            txtYear:''
        };
        
        $scope.getResumen=function() {
            
            var mensajeValidation = $scope.validations($scope.model);

            if (mensajeValidation.length>0) {
    
              const listMessages = mensajeValidation.map((men) =>{
                return "<li style='color:red;'><i style='padding-right:15px;' class='glyphicon glyphicon-plus' aria-hidden='true'></i>"+men+"</li>"
              });
    
              const messages_errs="<ul class='list-group' style='color:black;'>"+listMessages+"</ul>";
          
                  Swal.fire({
                    icon: 'error',
                    title: 'Ingrese los datos requeridos',
                    html: messages_errs
                  });
                  
              }else{
            
            Swal.fire('Procesando busqueda');

            Swal.showLoading();
            
            $scope.type=$scope.model.cbMetrica.text;

            var apiRoute = baseUrl + 'family_summary_resumen';
            var resumenData = DepositService.getAllResumen(apiRoute, $scope.model);
            resumenData.then(function (response) {
                
                if (response.data != "") {
                    Swal.close();
                    Swal.fire(
                      'Se encontaron '+response.data.length+' registros',
                      '',
                      'success'
                    )
                    $scope.resumen=response.data;
                    $scope.updateData(response.data);``

                } else {
                    alert("Some error");
                }
            
            }, function (error) {
                console.log("Error: " + error);
            });
            }
        }


        $scope.updateData = function (data) {

            const  categories=data.map((c)=>{
                return c.mes
            });

            const newData = data.map((x) => {
                return x.min!=null ? x.min:x.max!=null ? x.max :x.avg!=null ? x.avg:x.total!=null ? x.total:0
              });

            $scope.bar.xaxis.categories=categories;
            $scope.bar.series[0].data=newData;
        }

        $scope.bar = {
            chart: {
                height: 350,
                type: 'bar',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [{
                name: "Depositos",
                data: []
            }],
            title: {
                text: '',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3','transparent'], 
                    opacity: 0.5
                },
            },
            xaxis: {
                categories:["Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
            },
            colors: 
            [function({ value}) {
                if (value > 0) {
                    return '#FEB019'
                } else {
                    return '#FF4560'
                }
              }
            ]
        };

        $scope.validations=function(model){
            console.log('entro aqui '+model);
            let messages=[];

            if (model.cbFamily === '') messages.push('Seleccione Familia');
            if (model.cbMetrica === '') messages.push('Seleccione Metrica');
            if (model.txtYear === '') messages.push('Ingrese Año de consulta');
            return messages;
        }

        
        $scope.GetFamily = function () {
            var apiRoute = baseUrl + 'families';
            var student = DepositService.getAll(apiRoute);
            student.then(function (response) {
                $scope.families = response.data;

            },
            function (error) {
                console.log("Error: " + error);
            });

        }
        $scope.GetFamily();


        $scope.Clear = function () {
            $scope.model.cbFamily='',
            $scope.model.cbMetrica='',
            $scope.model.txtYear=''
        }

    }]);