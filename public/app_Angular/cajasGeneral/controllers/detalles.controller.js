'use strict';

angular.module('general').controller('DetallesController', ['$scope','$http','$routeParams','$location','Detalles','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Detalles, Caja_Detalles) {

    $scope.detalle = {};

    // Control de paneles
    $scope.PanelEditDetalle = false;
    $scope.PanelCreateDetalle = false;
    $scope.PanelTableDetalles = true;

    var showPanelCreateDetalle = function(){
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = true;
      //$scope.PanelTableDetalles = false;
    }
    var showPanelEditDetalle = function(){
      $scope.PanelEditDetalle = true;
      $scope.PanelCreateDetalle = false;
      //$scope.PanelTableDetalles = false;
    }
    var showPanelTableDetalles = function(){
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = false;
      //$scope.PanelTableDetalles = true;
    }

    $scope.showPanelCreateDetalle = function(){
      showPanelCreateDetalle();
      $scope.detalle = {};
    }
    $scope.showPanelEditDetalle = function(){
      showPanelEditDetalle();
    }
    $scope.showPanelTableDetalles = function(){
      showPanelTableDetalles();
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

      /*var idCaja = Caja_Detalles.getIdCaja();
      var detalle = new Detalles({
        valor: $scope.detalle.valor,
        empresa: $scope.detalle.empresa,
        categoria: $scope.detalle.categoria
      });
      detalle.caja = idCaja;

      detalle.$save(function(response) {
        //Actualizar la Caja Chica
        $scope.caja.valor += response.valor;
        $scope.updateCaja();

        $scope.detalles.push(response);
        showPanelTableDetalles();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });*/
    };

    $scope.find = function() {
      $scope.detalles = Detalles.query();
    };

    $scope.findOne = function() {
      $scope.detalle = Detalles.get({
        detalleId: $routeParams.detalleId
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

      /*$scope.detalle.$update(function() {
        $location.path('detalles/'+ $scope.detalle._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });*/
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
      /*if (detalle) {
        detalle.$remove(function() {
          for (var i in $scope.detalles) {
            if ($scope.detalles[i] === detalle) {
              $scope.detalles.splice(i, 1);
            }
          }
        });
      } else {
        $scope.detalle.$remove(function() {
          $location.path('detalles');
        });
      }*/
    };

    $scope.edit = function(detalle){
      $scope.valorPrevio = detalle.valor;
      showPanelEditDetalle();
      $scope.detalle = detalle;
    }


  }
]);
