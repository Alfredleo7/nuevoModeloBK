'use strict';

angular.module('cajas').controller('DetallesController', ['$scope','$http','$routeParams','$location','Detalles','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Detalles, Caja_Detalles) {

    $scope.detalle = {};


    $scope.findByCaja = function(){
      var idCaja = Caja_Detalles.getIdCaja();
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/' + idCaja
      }).then(function(detalles){
        $scope.detalles = detalles.data;
      });
    };

    $scope.create = function() {
      var idCaja = Caja_Detalles.getIdCaja();
      var detalle = new Detalles({
        valor: $scope.detalle.valor,
        empresa: $scope.detalle.empresa,
        categoria: $scope.detalle.categoria
      });
      detalle.caja = idCaja;

      detalle.$save(function(response) {
        //$location.path('detalles/' + response._id);
        $scope.detalle = {};
        $scope.detalles.push(response);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
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
      $scope.detalle.$update(function() {
        $location.path('detalles/'+ $scope.detalle._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
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
        });
      } else {
        $http({
          method: 'DELETE',
          url: '/api/detalles/' + $scope.detalle._id
        }).then(function(detalle){
          $location.path('detalles');
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


    $scope.PanelCreate = false;

    $scope.mostrarCrearDetalle = function(){
      $scope.PanelCreate = true;
    }

    $scope.ocultarCrearDetalle = function(){
      $scope.PanelCreate = false;
    }


  }
]);
