'use strict';

angular.module('administrador').controller('DetallesController', ['$scope','$http','$routeParams','$location','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Caja_Detalles) {

    $scope.detalle = {};

    $scope.detalle.tipo = 'factura';

    $scope.isType = function(tipo){
      return $scope.detalle.tipo == tipo;
    }

    // Control de paneles
    $scope.PanelEditDetalle = false;
    $scope.PanelCreateDetalle = false;
    $scope.PanelTableDetalles = true;
    $scope.PanelViewDetalle = false;

    var showPanelCreateDetalle = function(){
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = true;
    }
    var showPanelEditDetalle = function(){
      $scope.PanelEditDetalle = true;
      $scope.PanelCreateDetalle = false;
    }
    var showPanelTableDetalles = function(){
    $scope.PanelViewDetalle = false;
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = false;
    }

    $scope.showPanelCreateDetalle = function(){
      showPanelCreateDetalle();
      $scope.detalle = {};
    }
    $scope.showPanelEditDetalle = function(detalle){
      $scope.valorPrevio = detalle.valor;
      $scope.detalle = detalle;
      showPanelEditDetalle();
    }
    $scope.showPanelTableDetalles = function(){
      showPanelTableDetalles();
    }

    $scope.showPanelViewDetalle = function(detalle){
      $scope.PanelViewDetalle = true;
      $scope.detalle = detalle;
      $scope.detalle.fecha = new Date(detalle.fecha);
    }

    // Funciones CRUD
    $scope.findByCaja = function(){
      var idCaja = Caja_Detalles.getIdCaja();
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/' + idCaja
      }).then(function(detalles){
        $scope.detalles = detalles.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.create = function() {

      var idCaja = Caja_Detalles.getIdCaja();
      $scope.detalle.caja = idCaja;

      $http({
        method: 'POST',
        url: '/api/detalles',
        data: $scope.detalle
      }).then(function(response){
        //Actualizar la Caja Chica
        $scope.caja.valor += response.data.valor;
        $scope.updateCaja();

        $scope.detalles.push(response.data);
        showPanelTableDetalles();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });

    };

    $scope.find = function() {

      $http({
        method: 'GET',
        url: '/api/detalles'
      }).then(function(response){
        $scope.detalles = response.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });

    };

    $scope.findOne = function() {
      var idDetalle = $routeParams.detalleId;
      $http({
        method: 'GET',
        url: '/api/detalles/' + idDetalle
      }).then(function(response){
        $scope.detalle = response.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.update = function() {

      $http({
        method: 'PUT',
        url: '/api/detalles/' + $scope.detalle._id,
        data: $scope.detalle
      }).then(function(detalle){
        //Actualizar la Caja Chica
        $scope.caja.valor = Number($scope.caja.valor) - Number($scope.valorPrevio);
        $scope.caja.valor = Number($scope.caja.valor) + Number($scope.detalle.valor);
        $scope.updateCaja();

        showPanelTableDetalles();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.delete = function(detalle) {
      if(detalle) {
        $http({
          method: 'DELETE',
          url: '/api/detalles/' + detalle._id
        }).then(function(){
          for (var i in $scope.detalles) {
            if ($scope.detalles[i] === detalle) {
              $scope.detalles.splice(i, 1);
            }
          }
          //Actualizar la Caja Chica
          $scope.caja.valor -= detalle.valor;
          $scope.updateCaja();
        },function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        $http({
          method: 'DELETE',
          url: '/api/detalles/' + $scope.detalle._id
        }).then(function(detalle){
          //Actualizar la Caja Chica
          $scope.caja.valor -= detalle.valor;
          $scope.updateCaja();
          $location.path('detalles');
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }
    };
  }
]);