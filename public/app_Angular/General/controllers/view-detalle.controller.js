'use strict';

angular.module('general').controller('view-detalle.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detalles/'+$routeParams.detalleId
      }).then(function(response){
        $scope.detalle = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })

    }

    $scope.back = function(){
      $location.path('/caja/'+$routeParams.cajaId);
    };

    $scope.editar = function(detalle){
      $location.path('/caja/'+$routeParams.cajaId+'/editarDetalle/'+detalle._id);
    }

    $scope.eliminar = function(detalle) {
      $('#loadLogo').show();
      $http({
        method: 'DELETE',
        url: '/api/detalles/'+detalle._id
      }).then(function(response){
        $location.path('/caja/'+$routeParams.cajaId);
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })
    }

    $scope.printDiv = function(IdDiv, titulo){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>'+titulo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('</head><body onload="window.print()">');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('</html>');
      newWin.document.close();
      setTimeout(function () { newWin.close(); }, 3000);
    }

  }
]);
