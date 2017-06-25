'use strict';

angular.module('general').controller('caja.controller', ['$scope','$http','$location',
  function($scope, $http, $location) {

    $scope.create = function() {
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/cajas'
      }).then(function(response){
        $location.path('caja/' + response.data._id);
        new PNotify({
          text: 'La caja chica se ha creado con éxito',
          styling: 'bootstrap3',
          type: 'success'
        })
        $('#loadLogo').hide();
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };

    //START METODOS DE INICIO
    $scope.find = function(tipo) {
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario/' + tipo
      }).then(function(cajas){
        $scope.cajas = cajas.data;
        $('#loadLogo').hide();
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

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
          for (var i in $scope.cajas) {
            if ($scope.cajas[i] === caja) {
              $scope.cajas.splice(i, 1);
            }
          }
          deleteDetallesByCaja(caja);
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
            for (var i in $scope.cajas) {
              if ($scope.cajas[i] === caja) {
                $scope.cajas.splice(i, 1);
              }
            }
            enviarDetallesByCaja(caja);
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

  }
]);
