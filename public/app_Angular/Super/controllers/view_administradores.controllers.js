'use strict';

angular.module('super').controller('view_administradores.controller', ['$scope','$http',
  function($scope, $http){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/usuarios/'+'Administrador'
      }).then(function(response){
        $scope.usuarios = response.data;
        $('#loadLogo').hide();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
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

    $scope.registrar =function(){
      if($scope.administrador.password ==  $scope.administrador.passwordConfirm){
        $('#loadLogo').show();
        $scope.administrador.tipo = 'Administrador';
        $http({
          method: 'POST',
          url: '/api/usuarios',
          data: $scope.administrador
        }).then(function(response){
          new PNotify({
            text: 'Ha sido registrado correctamente',
            styling: 'bootstrap3',
            type: 'success'
          });
          $('#loadLogo').hide();
          $('.modalNuevoAdministrador').modal('hide');
          $scope.usuarios.push(response.data);
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

    $scope.getSucursales = function(){

      if($scope.administrador.empresa){
        $('#loadLogo').show();
        $scope.sucursales = [];
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.administrador.empresa
        }).then(function(response){
          $('#loadLogo').hide();
          $scope.sucursales = response.data;
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })
      }

    }

    $scope.inicializarAdministrador = function(){
      $scope.administrador = {};
    }

    $scope.view = function(administrador){
      $scope.administrador = administrador;
    }

    $scope.initEditarAdministrador = function(administrador){
      $scope.administrador = {
        _id: administrador._id,
        firstName: administrador.firstName,
        lastName: administrador.lastName,
        usuario: administrador.usuario,
        empresa: administrador.empresa._id
      }
      $scope.getSucursales();
      $scope.administrador.sucursal= administrador.sucursal._id;
    }

    $scope.actualizar = function(){
      $http({
        method: 'PUT',
        url: '/api/usuarios/'+$scope.administrador._id,
        data: $scope.administrador
      }).then(function(response){
        new PNotify({
          text: 'Ha sido actualizado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $scope.init();
        $('.modalEditarAdministrador').modal('hide');
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.eliminar = function(){
      $http({
        method: 'DELETE',
        url: '/api/usuarios/'+$scope.administrador._id
      }).then(function(response){
        new PNotify({
          text: 'Ha sido Eliminado exitósamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $scope.init();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      });
    }

  }
]);
