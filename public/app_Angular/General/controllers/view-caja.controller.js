'use strict';

angular.module('general').controller('view-caja.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajas/'+$routeParams.cajaId
      }).then(function(response){
        $scope.caja = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/'+$routeParams.cajaId
      }).then(function(response){
        $scope.detalles = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.back = function(){
      if($scope.caja.estado == 'Borrador')$location.path('/CreacionCajas');
      if($scope.caja.estado == 'Pendiente')$location.path('/CajasEnviadas');
      if($scope.caja.estado == 'Aprobado')$location.path('/CajasAprobadas');
      if($scope.caja.estado == 'Rechazado')$location.path('/CajasRechazadas');
    };

    $scope.go = function(caja, detalle){
      $location.path('/caja/'+caja._id+'/detalle/'+detalle._id);
    };

    var deleteDetallesByCaja = function (caja) {
      $('#loadLogo').show();
      $http({
        method: 'DELETE',
        url: '/api/detallesByCaja/' + caja._id,
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido eliminada',
          styling: 'bootstrap3',
          type: 'success'
        });
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.delete = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar esta caja?',
          icon: 'glyphicon glyphicon-question-sign',
          hide: false,
          confirm: {
              confirm: true
          },
          buttons: {
              closer: false,
              sticker: false
          },
          history: {
              history: false
          },
          styling: 'bootstrap3',
          type: 'warning'
      })).get().on('pnotify.confirm', function() {
        $('#loadLogo').show();
        $http({
          method: 'DELETE',
          url: '/api/cajas/' + caja._id
        }).then(function(){
          deleteDetallesByCaja(caja);
          $scope.back();
          $('#loadLogo').hide();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });

    };

    var enviarDetallesByCaja = function (caja) {
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + caja._id,
        data: {
          estado: 'Pendiente'
        }
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido enviada con éxito',
          styling: 'bootstrap3',
          type: 'success'
        });
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.enviar = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea enviar esta caja?',
          icon: 'glyphicon glyphicon-question-sign',
          hide: false,
          confirm: {
              confirm: true
          },
          buttons: {
              closer: false,
              sticker: false
          },
          history: {
              history: false
          },
          styling: 'bootstrap3',
          type: 'warning'
      })).get().on('pnotify.confirm', function() {

        if(caja.valor != 0){
          $('#loadLogo').show();
          $http({
            method: 'PUT',
            url: '/api/enviarCaja/' + caja._id
          }).then(function(){
            enviarDetallesByCaja(caja);
            $scope.back();
            $('#loadLogo').hide();
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        } else {
          mostrarNotificacion('El valor de la caja no puede ser $0.00');
          $('#loadLogo').hide();
        }

      }).on('pnotify.cancel', function() {
      });
    };

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