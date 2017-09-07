'use strict';

angular.module('inicio').controller('logup.controller', ['$scope','$http',
  function($scope,$http){
    $scope.registrar =function(){

      if($scope.newUsuario.password ==  $scope.passwordConfirm){
        $('#loadLogo').show();
        $http({
          method: 'POST',
          url: '/api/usuarios',
          data: $scope.newUsuario
        }).then(function(response){
          new PNotify({
            text: 'Ha sido registrado correctamente',
            styling: 'bootstrap3',
            type: 'success'
          });
          $('#loadLogo').hide();
          window.location.href="#signin";
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        new PNotify({
          text: 'Las contraseñas no coinciden',
          styling: 'bootstrap3'
        })
      }
    }

    $scope.initRegistro = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/empresas'
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.empresas = response.data;
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.getSucursales = function(){

      if($scope.newUsuario.empresa){
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.newUsuario.empresa
        }).then(function(response){
          $('#loadLogo').hide();
          $scope.sucursales = response.data;
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })
      }

    }
  }
]);
