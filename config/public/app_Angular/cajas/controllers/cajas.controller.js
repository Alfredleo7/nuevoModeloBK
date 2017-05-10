'use strict';

angular.module('cajas').controller('CajasController', ['$scope','$http','$routeParams','$location','Cajas','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Cajas, Caja_Detalles) {

    $scope.create = function() {
      var caja = new Cajas();

      caja.$save(function(response) {
        $location.path('cajas/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      $scope.cajas = Cajas.query();
    };

    $scope.findOne = function() {
      $scope.caja = Cajas.get({
        cajaId: $routeParams.cajaId
      });
      Caja_Detalles.setIdCaja($routeParams.cajaId);
    };

    $scope.update = function() {

      $http({
        method: 'PUT',
        url: '/api/cajas/' + $scope.caja._id,
        data: $scope.caja
      });

      /*$scope.caja.$update(function() {
        $location.path('cajas/'+ $scope.caja._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });*/
    };

    $scope.updateCaja = function() {
      $scope.update();
    }

    $scope.delete = function(caja) {
      if (caja) {
        caja.$remove(function() {
          for (var i in $scope.cajas) {
            if ($scope.cajas[i] === caja) {
              $scope.cajas.splice(i, 1);
            }
          }
        });
      } else {
        $scope.caja.$remove(function() {
          $location.path('cajas');
        });
      }
    };

  }
]);
