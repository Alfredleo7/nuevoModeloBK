'use strict';

angular.module('super').controller('view_operarios.controller', ['$scope','$http',
  function($scope, $http){

    $scope.operario = {};

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/usuarios/'+'General'
      }).then(function(response){
        $scope.usuarios = response.data;
        $('#loadLogo').hide();
      })

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/empresas'
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.empresas = response.data;
      })

    }

    $scope.registrar =function(){
      if($scope.operario.password ==  $scope.operario.passwordConfirm){
        $('#loadLogo').show();
        $scope.operario.tipo = 'General';
        $http({
          method: 'POST',
          url: '/api/usuarios',
          data: $scope.operario
        }).then(function(response){
          new PNotify({
            text: 'Ha sido registrado correctamente',
            styling: 'bootstrap3',
            type: 'success'
          });
          $('#loadLogo').hide();
          $('.modalNuevoOperario').modal('hide');
          $scope.usuarios.push(response.data);
        },function(errorResponse){
          $('#loadLogo').hide();
          new PNotify({
            text:errorResponse.data.message,
            styling: 'bootstrap3'
          })
        });
      } else {
        new PNotify({
          text: 'Las contraseñas no coinciden',
          styling: 'bootstrap3'
        })
      }
    }

    $scope.getSucursales = function(){

      if($scope.operario.empresa){
        $('#loadLogo').show();
        $scope.sucursales = [];
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.operario.empresa
        }).then(function(response){
          $('#loadLogo').hide();
          $scope.sucursales = response.data;
        })
      }

    }

    $scope.inicializarOperario = function(){
      $scope.operario = {};
    }

    $scope.view = function(operario){
      $scope.operario = operario;
    }

    $scope.initEditarOperario = function(operario){
      $scope.operario = {
        _id: operario._id,
        firstName: operario.firstName,
        lastName: operario.lastName,
        usuario: operario.usuario,
        empresa: operario.empresa._id
      }
      $scope.getSucursales();
      $scope.operario.sucursal= operario.sucursal._id;
    }

    $scope.actualizar = function(){
      $http({
        method: 'PUT',
        url: '/api/usuarios/'+$scope.operario._id,
        data: $scope.operario
      }).then(function(response){
        new PNotify({
          text: 'Ha sido actualizado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $scope.init();
        $('.modalEditarOperario').modal('hide');
      }, function(errorResponse){
        new PNotify({
          text:errorResponse.data.message,
          styling: 'bootstrap3'
        })
      })
    }

    $scope.eliminar = function(){
      $http({
        method: 'DELETE',
        url: '/api/usuarios/'+$scope.operario._id
      }).then(function(response){
        new PNotify({
          text: 'Ha sido Eliminado exitósamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $scope.init();
      }, function(errorResponse){
        new PNotify({
          text:errorResponse.data.message,
          styling: 'bootstrap3'
        })
      });
    }

  }
]);
