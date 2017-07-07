'use strict';

angular.module('administrador').controller('view-Cajas.controller', ['$scope','$http','$location',
  function($scope, $http, $location) {

    //START METODOS DE INICIO
    $scope.findPendientes = function() {

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasPendientes'
      }).then(function(response){
        $scope.cajas = response.data;
        $('#loadLogo').hide();
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };

    $scope.findAprobadas = function() {

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasAprobadas'
      }).then(function(response){
        $scope.cajas = response.data;
        $('#loadLogo').hide();
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };

    $scope.findRechazadas = function() {

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasRechazadas'
      }).then(function(response){
        $scope.cajas = response.data;
        $('#loadLogo').hide();
      },function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };

    $scope.go = function(caja){
      $location.path('/caja/'+caja._id);
    };

  }
]);
