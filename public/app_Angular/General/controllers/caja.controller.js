'use strict';

angular.module('general').controller('caja.controller', ['$scope','$http','$location',
  function($scope, $http, $location) {

    $scope.create = function() {
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/cajas'
      }).then(function(response){
        $location.path('caja/' + response.data._id);
        new PNotify({
          text: 'La caja chica se ha creado con éxito',
          styling: 'bootstrap3',
          type: 'success'
        })
        $('#loadLogo').hide();
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };

    //START METODOS DE INICIO
    $scope.find = function(tipo) {
      if(tipo == 'BorradorRechazado'){
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/cajasBorradorRechazados'
        }).then(function(cajas){
          $scope.cajas = cajas.data;
          $('#loadLogo').hide();
        },function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });
      } else {
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/cajasByUsuario/' + tipo
        }).then(function(cajas){
          $scope.cajas = cajas.data;
          $('#loadLogo').hide();
        },function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });
      }
    };

    $scope.go = function(caja){
      $location.path('/caja/'+caja._id);
    };

  }
]);
