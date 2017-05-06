'use strict';

angular.module('detalles').controller('DetallesController', ['$scope','$routeParams','$location','Detalles',
  function($scope, $routeParams, $location, Detalles) {
    $scope.create = function() {
      var detalle = new Detalles({
        valor: this.valor,
        empresa: this.empresa,
        categoria: this.categoria
      });

      detalle.$save(function(response) {
        $location.path('detalles/' + response._id);
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
