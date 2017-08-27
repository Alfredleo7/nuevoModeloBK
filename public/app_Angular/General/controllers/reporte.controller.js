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
        var totalCategoria;
        var indice;
        var _valor;
        $scope.totalMeses = new Array(12).fill(0);
        //Darle un formato manejable
        for(var i in response.data){
          categoria = {
            descripcion: response.data[i]._id,
            meses: new Array(13)
          };
          totalCategoria = 0;

          //Enviar cada valor al mes correspondiente
          for(var j in response.data[i].meses){
            indice = response.data[i].meses[j].mes-1;
            _valor = response.data[i].meses[j].total;
            categoria.meses[indice] = {
              valor: _valor
            };
            totalCategoria += _valor;
            $scope.totalMeses[indice] += _valor;
          }
          //Calcular el total de la categoria
          categoria.meses[12] = {
            valor: totalCategoria
          };
          //Agregar a la variable
          $scope.categorias.push(categoria);
        }
      }, function(errorResponse){
        console.log(errorResponse.data);
      })
    }

  }
]);
