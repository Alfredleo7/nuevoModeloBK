angular.module('super').controller('view_celda.controller', ['$scope','$http','$routeParams',
  function($scope, $http, $routeParams){
    $http({
      method: 'GET',
      url: '/api/detallesOfCelda/'+$routeParams.anio+'/'+$routeParams.mes+'/'+$routeParams.sucursal+'/'+$routeParams.categoria
    }).then(function(response){
      console.log(response.data);
    }, function(errorResponse){
      console.log(errorResponse.data);
    })
  }
])
