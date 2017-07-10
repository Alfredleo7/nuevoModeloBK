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
      $http({
        method: 'POST',
        url: '/api/detallesByCelda',
        data: $scope.data
      }).then(function(response){
        $scope.detalles = response.data;
        for(var i in $scope.detalles){
          $scope.total += $scope.detalles[i].valor;
        }
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
      var newWin = window.open('', 'my div');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte por '+tipo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/build/css/custom.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('</head><body style="-webkit-print-color-adjust:exact" onload="window.print()">');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('</html>');
      newWin.document.close();
      setTimeout(function () { newWin.close(); }, 3000);

    };

  }
]);
