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

    $scope.find = function() {
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Borrador'
      }).then(function(cajas){
        $scope.cajasBorrador = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Pendiente'
      }).then(function(cajas){
        $scope.cajasPendiente = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Aprobado'
      }).then(function(cajas){
        $scope.cajasAprobado = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + 'Rechazado'
      }).then(function(cajas){
        $scope.cajasRechazado = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

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

    var deleteDetallesByCaja = function (idCaja) {
      $http({
        method: 'DELETE',
        url: '/api/detallesByCaja/' + idCaja,
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido eliminada',
          styling: 'bootstrap3',
          type: 'success'
        })
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
        if (caja) {
          $http({
            method: 'DELETE',
            url: '/api/cajas/' + caja._id
          }).then(function(){
            /*for (var i in $scope.cajas) {
              if ($scope.cajas[i] === caja) {
                $scope.cajas.splice(i, 1);
              }
            }*/
            deleteDetallesByCaja(caja._id);
            if(caja.estado=='Borrador') $location.path('/CreacionCajas');
            if(caja.estado=='Rechazado') $location.path('/CajasRechazadas');
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        } else {
          $http({
            method: 'DELETE',
            url: '/api/cajas/' + $scope.caja._id
          }).then(function(){
            deleteDetallesByCaja($scope.caja._id);
            $location.path('/');
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });
        }
      }).on('pnotify.cancel', function() {

      });
    };


    var enviarDetallesByCaja = function (idCaja) {
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Pendiente'
        }
      }).then(function(response){
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
        if (caja) {

          if(caja.valor != 0){
            $http({
              method: 'PUT',
              url: '/api/enviarCaja/' + caja._id
            }).then(function(){/*
              for (var i in $scope.cajas) {
                if ($scope.cajas[i] === caja) {
                  $scope.cajas.splice(i, 1);
                }
              }*/
              enviarDetallesByCaja(caja._id);
              if(caja.estado=='Borrador') $location.path('/CreacionCajas');
              if(caja.estado=='Rechazado') $location.path('/CajasRechazadas');
            }, function(errorResponse) {
              mostrarNotificacion(errorResponse.data.message);
            });
          } else {
            mostrarNotificacion('El valor de la caja no puede ser $0.00')
          }
        } else {

          if($scope.caja.valor){
            $http({
              method: 'PUT',
              url: '/api/enviarCaja/' + $scope.caja._id
            }).then(function(){
              enviarDetallesByCaja($scope.caja._id);
              if($scope.caja.estado=='Borrador') $location.path('/CreacionCajas');
              if($scope.caja.estado=='Rechazado') $location.path('/CajasRechazadas');
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
