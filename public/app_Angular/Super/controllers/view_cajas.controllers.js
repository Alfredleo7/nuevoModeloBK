'use strict';

angular.module('super').controller('view_cajas.controller', ['$scope','$http','$location',
  function($scope, $http,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasConSecuencial/'
      }).then(function(response){
        $scope.cajas = response.data;
        console.log($scope.cajas);
        $('#loadLogo').hide();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.go = function(caja){
      $location.path('/caja/'+caja._id);
    };

  }
]);
