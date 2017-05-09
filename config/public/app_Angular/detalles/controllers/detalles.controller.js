'use strict';

angular.module('detalles').controller('DetallesController', ['$scope','$http','$routeParams','$location',/*'Detalles',*/
  function($scope, $http, $routeParams, $location/*, Detalles*/) {

    $scope.findByCaja = function(){
      console.log($scope.caja._id);
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/' + $scope.caja_id
      }).then(function(detalles){
        console.log(detalles.data);
        $scope.detalles = detalles.data;
      });
    };

    $scope.create = function(Cajaid) {
      var detalle = new Detalles({
        valor: this.valor,
        empresa: this.empresa,
        categoria: this.categoria,
        caja: Cajaid
      });

      detalle.$save(function(response) {
        //$location.path('detalles/' + response._id);
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
      if (detalle) {
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
      }
    };

  }
]);
