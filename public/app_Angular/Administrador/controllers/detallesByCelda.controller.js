'use strict';

angular.module('administrador').controller('detallesByCelda.controller', ['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){
    $scope.init = function(){
      $scope.data={};
      $scope.data.tipo = $routeParams.tipo;
      $scope.data.anio = $routeParams.anio;
      $scope.data.mes = $routeParams.mes;
      $scope.data.nombre = $routeParams.nombre;
      $http({
        method: 'POST',
        url: '/api/detallesByCelda',
        data: $scope.data
      }).then(function(response){
        $scope.detalles = response.data;
      });

      switch ($scope.data.mes) {
        case '1':
          $scope.nameMes = 'Enero';
          break;
        case '2':
          $scope.nameMes = 'Febrero';
          break;
        case '3':
          $scope.nameMes = 'Marzo';
          break;
        case '4':
          $scope.nameMes = 'Abril';
          break;
        case '5':
          $scope.nameMes = 'Mayo';
          break;
        case '6':
          $scope.nameMes = 'Junio';
          break;
        case '7':
          $scope.nameMes = 'Julio';
          break;
        case '8':
          $scope.nameMes = 'Agosto';
          break;
        case '9':
          $scope.nameMes = 'Septiembre';
          break;
        case '10':
          $scope.nameMes = 'Octubre';
          break;
        case '11':
          $scope.nameMes = 'Noviembre';
          break;
        case '12':
          $scope.nameMes = 'Diciembre';
          break;
      }

    }
  }
]);
