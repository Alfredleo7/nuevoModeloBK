'use strict';

angular.module('administrador').controller('view-CajasAprobadas.controller', ['$scope','$http','$location','localStorageService',
  function($scope, $http, $location, localStorageService) {

    $('#loadLogo').hide();

    $scope.sucursales = [];

    var inicializarSelected = function(){
      for(var i in $scope.sucursales){
        $scope.sucursales[i].selected = false;
      }
    }

    var sucursal;
    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/SurcursalesConCajasAprobadas'
    }).then(function(response){
      $('#loadLogo').hide();
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

        if(localStorageService.get('idSucursalAprobada')){
          for(var i in $scope.sucursales){
            if($scope.sucursales[i]._id == localStorageService.get('idSucursalAprobada')){
              $scope.ver($scope.sucursales[i]);
            }
          }
        }
      }
    })

    $scope.ver = function(sucursal){
      inicializarSelected();
      sucursal.selected = true;
      $scope.sucursal = sucursal;
      $scope.cajas = [];
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/CajasAprobadasBySucursal/'+sucursal._id
      }).then(function(response){
        $('#loadLogo').hide();
        localStorageService.set('idSucursalAprobada', sucursal._id);
        $scope.cajas = response.data;
      }, function(errorResponse){
        $('#loadLogo').hide();
        console.log(errorResponse);
      })
    }

    $scope.go = function(caja){
      $location.path('/caja/'+caja._id);
    };

  }
]);
