'use strict';

angular.module('super').controller('reporte_detalles.controller', ['$scope', '$http',
  function($scope, $http){

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/reporteDetalles'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.detalles = response.data;
      console.log($scope.detalles);
    }, function(errorResponse){
      $('#loadLogo').hide();
      mostrarNotificacion(errorResponse.data.message);
    })


  }
]);
