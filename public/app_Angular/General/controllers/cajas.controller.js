'use strict';

angular.module('general').controller('CajasController', ['$scope','$http','$routeParams','$location','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Caja_Detalles) {

    $scope.create = function() {
      $http({
        method: 'POST',
        url: '/api/cajas'
      }).then(function(response){
        $location.path('cajas/' + response.data._id);
        new PNotify({
          text: 'La caja chica se ha creado con éxito',
          styling: 'bootstrap3',
          type: 'success'
        })
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    //START METODOS DE INICIO
    $scope.findBorrador = function() {
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Borrador'
      }).then(function(cajas){
        $scope.cajasBorrador = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.findPendiente = function(){
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Pendiente'
      }).then(function(cajas){
        $scope.cajasPendiente = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.findAprobado = function(){
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Aprobado'
      }).then(function(cajas){
        $scope.cajasAprobado = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.findRechazado = function(){
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Rechazado'
      }).then(function(cajas){
        $scope.cajasRechazado = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    //END METODOS DE INICIO

    $scope.findOne = function() {

      var idCaja = $routeParams.cajaId;

      $http({
        method: 'GET',
        url: '/api/cajas/' + idCaja
      }).then(function(response){
        $scope.caja = response.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });

      Caja_Detalles.setIdCaja($routeParams.cajaId);
    };

    $scope.update = function() {

      $http({
        method: 'PUT',
        url: '/api/cajas/' + $scope.caja._id,
        data: $scope.caja
      }).then(function(response){

      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });

    };

    $scope.updateCaja = function() {
      $scope.update();
    }

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

    $scope.delete = function(cajas, caja) {
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
        if (caja) {
          $http({
            method: 'DELETE',
            url: '/api/cajas/' + caja._id
          }).then(function(){
            for (var i in cajas) {
              if (cajas[i] === caja) {
                cajas.splice(i, 1);
              }
            }
            deleteDetallesByCaja(caja);
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        } else {
          $http({
            method: 'DELETE',
            url: '/api/cajas/' + $scope.caja._id
          }).then(function(){
            deleteDetallesByCaja($scope.caja);
            if($scope.caja.estado == 'Borrador'){
              $location.path('CreacionCajas');
            } else {
              $location.path('CajasRechazadas');
            }
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        }
      }).on('pnotify.cancel', function() {

      });
    };
    //CODIGO A REEMPLAZAR

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

    $scope.enviar = function(cajas, caja) {
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
        if (caja) {

          if(caja.valor != 0){
            $http({
              method: 'PUT',
              url: '/api/enviarCaja/' + caja._id
            }).then(function(){
              for (var i in cajas) {
                if (cajas[i] === caja) {
                  cajas.splice(i, 1);
                }
              }
              enviarDetallesByCaja(caja);
            }, function(errorResponse) {
              mostrarNotificacion(errorResponse.data.message);
            });
          } else {
            mostrarNotificacion('El valor de la caja no puede ser $0.00')
          }
        } else {

          if($scope.caja.valor != 0){
            $http({
              method: 'PUT',
              url: '/api/enviarCaja/' + $scope.caja._id
            }).then(function(){
              enviarDetallesByCaja($scope.caja);
              if($scope.caja.estado == 'Borrador'){
                $location.path('CreacionCajas');
              } else {
                $location.path('CajasRechazadas');
              }
            }, function(errorResponse) {
              mostrarNotificacion(errorResponse.data.message);
            });
          } else {
            mostrarNotificacion('El valor de la caja no puede ser $0.00')
          }
        }
      }).on('pnotify.cancel', function() {

      });
    };

  }
]);
