'use strict';

angular.module('super').controller('view_categorias.controller', ['$scope','$http',
  function($scope, $http){

    $scope.monto = {};

    $scope.form = false;
    $scope.trueForm = function(){
      $scope.form = true;
    }
    $scope.falseForm = function(){
      $scope.form = false;
    }
    $scope.trueNuevo = function(){
      $scope.nuevo = true;
    }
    $scope.falseNuevo = function(){
      $scope.nuevo = false;
    }

    $scope.iniciarNuevo = function(){
      $scope.trueForm();
      $scope.trueNuevo();
      $scope.monto = {};
    }

    $scope.iniciarActualizacion = function(monto){
      $scope.trueForm();
      $scope.falseNuevo();
      $scope.monto.empresa = monto.empresa._id;
      $scope.getSucursales();
      $scope.monto = {
        _id: monto._id,
        creado: monto.creado,
        categoria: monto.categoria,
        empresa: monto.empresa._id,
        sucursal: monto.sucursal._id,
        montoMax: monto.montoMax
      };
    }

    $http({
      method: 'GET',
      url: '/api/empresas'
    }).then(function(response){
      $scope.empresas = response.data;
    })

    $scope.init = function(){
      $http({
        method: 'GET',
        url: '/api/categorias/'
      }).then(function(response){
        $scope.categorias = response.data;
      })
    }

    $scope.ver = function(categoria){
      $scope.categoria = categoria;
      $http({
        method: 'GET',
        url: '/api/montosCategorias/'+categoria._id
      }).then(function(response){
        $scope.montos = response.data;
      }, function(errorResponse){
        console.log(errorResponse);
      })
    }

    $scope.getSucursales = function(){
      if($scope.monto.empresa){
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.monto.empresa
        }).then(function(response){
          $scope.sucursales = response.data;
        })
      }
    }

    $scope.guardarMonto = function(){
      $scope.monto.categoria = $scope.categoria._id;
      $http({
        method: 'POST',
        url: '/api/montosCategorias',
        data: $scope.monto
      }).then(function(response){
        $scope.montos.push(response.data);
        $scope.monto = {};
        $scope.sucursales = [];
        $scope.falseForm();
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.delete = function(monto){
      $http({
        method: 'DELETE',
        url: '/api/deleteMontosCategorias/'+ monto._id
      }).then(function(response){
        for (var i in $scope.montos) {
          if ($scope.montos[i]._id === response.data._id) {
            $scope.montos.splice(i, 1);
          }
        }
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      })
    }

  }
]);
