'use strict';

angular.module('general').controller('view-detalle.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detalles/'+$routeParams.detalleId
      }).then(function(response){
        $scope.detalle = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })

    }

    $scope.back = function(){
      $location.path('/caja/'+$routeParams.cajaId);
    };

    $scope.editar = function(detalle){
      $location.path('/caja/'+$routeParams.cajaId+'/editarDetalle/'+detalle._id);
    }

    $scope.eliminar = function(detalle) {
      $('#loadLogo').show();
      $http({
        method: 'DELETE',
        url: '/api/detalles/'+detalle._id
      }).then(function(response){
        $location.path('/caja/'+$routeParams.cajaId);
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })
    }

  }
]);
