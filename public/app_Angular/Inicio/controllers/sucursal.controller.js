'use strict';

angular.module('inicio').controller('sucursal.controller', ['$scope','$http',
  function($scope,$http){

    $scope.initEmpresas = function(){
      console.log('hola');
      $http({
        method: 'GET',
        url: '/api/empresas'
      }).then(function(response){
        console.log(response.data);
        $scope.empresas = response.data;
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.guardar = function(){

      $http({
        method: 'POST',
        url: '/api/sucursales',
        data: $scope.sucursal
      }).then(function(response){
        console.log(response.data);
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

  }
]);
