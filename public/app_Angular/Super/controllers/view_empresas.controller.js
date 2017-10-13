angular.module('super').controller('view_empresas.controller', ['$scope','$http',
  function($scope, $http, $routeParams){


    var inicializarSelected = function(){
      for(var i in $scope.empresas){
        $scope.empresas[i].selected = false;
      }
    }

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/empresas'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.empresas = response.data;
      inicializarSelected();
      $scope.ver($scope.empresas[0]);
      $('#loadLogo').hide();
    }, function(errorResponse){
      $('#loadLogo').hide();
      mostrarNotificacion(errorResponse.data.message);
    })

    $scope.ver = function(empresa){
      inicializarSelected();
      empresa.selected = true;
      $scope.empresa = empresa;
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/sucursalesByEmpresa/'+empresa._id
      }).then(function(response){
        $scope.sucursales = response.data;
        $('#loadLogo').hide();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.createEmpresa = function(newEmpresa){
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/empresas',
        data: newEmpresa
      }).then(function(response){
        $scope.empresas.push(response.data);
        $scope.ver(response.data);
        newEmpresa = {};
        new PNotify({
          text: 'La empresa se ha creado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        })
        $('#loadLogo').hide();
      },function(errorResponse){
        newEmpresa = {};
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.createSucursal = function(newSucursal){
      newSucursal.empresa = $scope.empresa._id;
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/sucursales',
        data: newSucursal
      }).then(function(response){
        $scope.sucursales.push(response.data);
        newSucursal={};
        new PNotify({
          text: 'El '+response.data.tipo+' se ha creado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        })
        $('#loadLogo').hide();
      }, function(errorResponse){
        newSucursal={};
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }
  }
])
