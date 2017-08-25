'use strict';

angular.module('administrador').controller('view-CajasPendientes.controller', ['$scope','$http','$location',
  function($scope, $http, $location) {

    $('#loadLogo').hide();

    $scope.sucursales = [];
    $scope.sucursal = {};

    var inicializarSelected = function(){
      for(var i in $scope.sucursales){
        $scope.sucursales[i].selected = false;
      }
    }

    var sucursal;
    $http({
      method: 'GET',
      url: '/api/SurcursalesConCajasPendientes'
    }).then(function(response){
      for(var i in response.data){
        sucursal = {
          _id: response.data[i]._id.sucursal._id,
          nombre: response.data[i]._id.sucursal.nombre,
          tipo: response.data[i]._id.sucursal.tipo,
          empresa: response.data[i]._id.empresa.nombre
        }
        $scope.sucursales.push(sucursal);
      }
      if($scope.sucursales.length != 0){
        inicializarSelected();
        $scope.ver($scope.sucursales[0]);
      }
    })

    $scope.ver = function(sucursal){
      inicializarSelected();
      sucursal.selected = true;
      $scope.sucursal = sucursal;
      $scope.cajas = [];
      $http({
        method: 'GET',
        url: '/api/CajasPendientesBySucursal/'+sucursal._id
      }).then(function(response){
        $scope.cajas = response.data;
      }, function(errorResponse){
        console.log(errorResponse);
      })
    }

    $scope.go = function(caja){
      $location.path('/caja/'+caja._id);
    };

  }
]);
