'use strict';

angular.module('general').controller('view-detalle.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){

      $http({
        method: 'GET',
        url: '/api/detalles/'+$routeParams.detalleId
      }).then(function(response){
        $scope.detalle = response.data;
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      })

    }

    $scope.back = function(){
      $location.path('/caja/'+$routeParams.cajaId);
    };

    $scope.editar = function(detalle){
      $location.path('/caja/'+$routeParams.cajaId+'/editarDetalle/'+detalle._id);
    }

  }
]);
