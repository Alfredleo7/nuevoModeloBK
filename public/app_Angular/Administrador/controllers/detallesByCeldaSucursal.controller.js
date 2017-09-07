'use strict';

angular.module('administrador').controller('detallesByCeldaSucursal.controller', ['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $scope.today = new Date();

      $scope.data={};
      $scope.data.tipo = $routeParams.tipo;
      $scope.data.anio = $routeParams.anio;
      $scope.data.mes = $routeParams.mes;
      $scope.data.nombre = $routeParams.nombre;

      $scope.total = 0;
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/detallesByCelda',
        data: $scope.data
      }).then(function(response){
        $scope.detalles = response.data;
        for(var i in $scope.detalles){
          $scope.total += $scope.detalles[i].valor;
        }
        $('#loadLogo').hide();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      });

      switch ($scope.data.mes) {
        case '1':
          $scope.nameMes = 'Enero';
          break;
        case '2':
          $scope.nameMes = 'Febrero';
          break;
        case '3':
          $scope.nameMes = 'Marzo';
          break;
        case '4':
          $scope.nameMes = 'Abril';
          break;
        case '5':
          $scope.nameMes = 'Mayo';
          break;
        case '6':
          $scope.nameMes = 'Junio';
          break;
        case '7':
          $scope.nameMes = 'Julio';
          break;
        case '8':
          $scope.nameMes = 'Agosto';
          break;
        case '9':
          $scope.nameMes = 'Septiembre';
          break;
        case '10':
          $scope.nameMes = 'Octubre';
          break;
        case '11':
          $scope.nameMes = 'Noviembre';
          break;
        case '12':
          $scope.nameMes = 'Diciembre';
          break;
      }

    }

    $scope.go = function(caja, detalle){
      $location.path('/caja/'+caja+'/detalle/'+detalle._id);
    };

    $scope.back = function(){
      $location.path('/reporteXLocales');
    }

    $scope.printDiv = function(IdDiv, tipo){

      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte por '+tipo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body>');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('<script type="text/javascript">');
      newWin.document.write('window.print();');
      newWin.document.write('window.close();');
      newWin.document.write('</script>');
      newWin.document.write('</html>');

    };

  }
]);
