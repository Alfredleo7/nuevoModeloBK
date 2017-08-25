'use strict';

angular.module('general').controller('reporte.controller', ['$scope','$http',
  function($scope,$http){

    $scope.anios = []
    $scope.filtroAnio = {};
    $scope.categorias = [];

    $http({
      method: 'GET',
      url: '/api/aniosDetalleBySucursal'
    }).then(function(response){
      $scope.anios = response.data;
      $scope.filtroAnio = $scope.anios[$scope.anios.length - 1]._id;
      $scope.getReporte();
    }, function(errorResponse){
      console.log(errorResponse.data);
    })

    $scope.getReporte = function(){
      var categoria;
      var mes;
      $http({
        method: 'GET',
        url: '/api/DetallesBySucursal/'+$scope.filtroAnio
      }).then(function(response){
        console.log(response.data);
        for(var i in response.data){
          categoria = {
            descripcion: response.data[i]._id,
            meses: new Array(12)
          };
          for(var j in response.data[i].meses){
            categoria.meses[response.data[i].meses[j].mes-1] = {
              valor: response.data[i].meses[j].total
            };
          }
          $scope.categorias.push(categoria);
        }
        console.log($scope.categorias);
      }, function(errorResponse){
        console.log(errorResponse.data);
      })
    }

  }
]);
