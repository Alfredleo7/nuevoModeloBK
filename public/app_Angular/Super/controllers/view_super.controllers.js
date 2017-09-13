'use strict';

angular.module('super').controller('view_super.controller', ['$scope','$http',
  function($scope, $http){
    $scope.super = {};

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/usuarios/'+'Super'
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
      if($scope.super.password ==  $scope.super.passwordConfirm){
        $('#loadLogo').show();
        $scope.super.tipo = 'Super';
        $http({
          method: 'POST',
          url: '/api/usuarios',
          data: $scope.super
        }).then(function(response){
          new PNotify({
            text: 'Ha sido registrado correctamente',
            styling: 'bootstrap3',
            type: 'success'
          });
          $('#loadLogo').hide();
          $('.modalNuevoSuper').modal('hide');
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

      if($scope.super.empresa){
        $('#loadLogo').show();
        $scope.sucursales = [];
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.super.empresa
        }).then(function(response){
          $('#loadLogo').hide();
          $scope.sucursales = response.data;
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })
      }

    }

    $scope.inicializarSuper = function(){
      $scope.super = {};
    }

    $scope.view = function(superUsuario){
      $scope.super = superUsuario;
    }

    $scope.initEditarSuper = function(superUsuario){
      $scope.super = {
        _id: superUsuario._id,
        firstName: superUsuario.firstName,
        lastName: superUsuario.lastName,
        usuario: superUsuario.usuario,
        empresa: superUsuario.empresa._id
      }
      $scope.getSucursales();
      $scope.super.sucursal= superUsuario.sucursal._id;
    }

    $scope.actualizar = function(){
      $http({
        method: 'PUT',
        url: '/api/usuarios/'+$scope.super._id,
        data: $scope.super
      }).then(function(response){
        new PNotify({
          text: 'Ha sido actualizado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $scope.init();
        $('.modalEditarSuper').modal('hide');
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.eliminar = function(){
      $http({
        method: 'DELETE',
        url: '/api/usuarios/'+$scope.super._id
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
