'use strict';

angular.module('general').controller('CajaCtrl',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){

      $http({
        method: 'GET',
        url: '/api/cajas/'+$routeParams.cajaId
      }).then(function(response){
        $scope.caja = response.data;
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      });

      $http({
        method: 'GET',
        url: '/api/detallesByCaja/'+$routeParams.cajaId
      }).then(function(response){
        $scope.detalles = response.data;
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
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
      $http({
        method: 'DELETE',
        url: '/api/detallesByCaja/' + caja._id,
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido eliminada',
          styling: 'bootstrap3',
          type: 'success'
        });
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
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

        $http({
          method: 'DELETE',
          url: '/api/cajas/' + caja._id
        }).then(function(){
          deleteDetallesByCaja(caja);
          $scope.back();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });

      }).on('pnotify.cancel', function() {
      });

    };

    var enviarDetallesByCaja = function (caja) {
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
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
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
          $http({
            method: 'PUT',
            url: '/api/enviarCaja/' + caja._id
          }).then(function(){
            enviarDetallesByCaja(caja);
            $scope.back();
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        } else {
          mostrarNotificacion('El valor de la caja no puede ser $0.00')
        }

      }).on('pnotify.cancel', function() {
      });
    };

  }
]);
