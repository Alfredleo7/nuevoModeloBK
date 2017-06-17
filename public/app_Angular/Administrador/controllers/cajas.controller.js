'use strict';

angular.module('administrador').controller('CajasController', ['$scope','$http','$routeParams','$location','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Caja_Detalles) {


    $scope.create = function() {
      $http({
        method: 'POST',
        url: '/api/cajas'
      }).then(function(response){
        $location.path('cajas/' + response.data._id);
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.find = function() {
      $http({
        method: 'GET',
        url: '/api/cajasByUsuario'
      }).then(function(cajas){
        $scope.cajas = cajas.data;
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.findPendientes = function() {
      $http({
        method: 'GET',
        url: '/api/cajasPendientes'
      }).then(function(cajas){
        $scope.cajas = cajas.data;
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
        $location.path('cajas');
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
        mostrarNotificacion(response.data.message);
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };
    var aprobarDetallesByCaja = function (idCaja) {
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Aprobado'
        }
      }).then(function(response){
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.delete = function(caja) {

      if (caja) {
        $http({
          method: 'DELETE',
          url: '/api/cajas/' + caja._id
        }).then(function(){
          for (var i in $scope.cajas) {
            if ($scope.cajas[i] === caja) {
              $scope.cajas.splice(i, 1);
            }
          }
          deleteDetallesByCaja(caja._id);
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        $http({
          method: 'DELETE',
          url: '/api/cajas/' + $scope.caja._id
        }).then(function(){
          deleteDetallesByCaja($scope.caja._id);
          $location.path('cajas');
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }

    };

    $scope.aprobar = function(caja) {

      if (caja) {
        $http({
          method: 'PUT',
          url: '/api/aprobarCaja/' + caja._id
        }).then(function(){
          for (var i in $scope.cajas) {
            if ($scope.cajas[i] === caja) {
              $scope.cajas.splice(i, 1);
            }
          }
          aprobarDetallesByCaja(caja._id);
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        $http({
          method: 'PUT',
          url: '/api/aprobarCaja/' + $scope.caja._id
        }).then(function(){
          aprobarDetallesByCaja($scope.caja._id);
          $location.path('cajas');
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }

    };

    $scope.rechazar = function(caja) {

      if (caja) {
        $http({
          method: 'PUT',
          url: '/api/rechazarCaja/' + caja._id
        }).then(function(){
          for (var i in $scope.cajas) {
            if ($scope.cajas[i] === caja) {
              $scope.cajas.splice(i, 1);
            }
          }
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        $http({
          method: 'PUT',
          url: '/api/rechazarCaja/' + $scope.caja._id
        }).then(function(){
          $location.path('cajas');
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }

    };

  }
]);
