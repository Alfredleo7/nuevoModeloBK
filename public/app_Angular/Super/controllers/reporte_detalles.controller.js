'use strict';

angular.module('super').controller('reporte_detalles.controller', ['$scope', '$http',
  function($scope, $http){

    console.log('hola mundo');
    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/reporteDetalles'
    }).then(function(response){
      $('#loadLogo').hide();
      console.log(response.data);
    }, function(errorResponse){
      $('#loadLogo').hide();
      console.log(errorResponse.data);
    })

  }
]);
