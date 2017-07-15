'use strict';

angular.module('administrador').controller('cambiarContrasena.controller',['$scope','$http','$location',
  function($scope,$http,$location){

    $scope.actualizar = function(){
      if($scope.body.newPassword == $scope.newPasswordRepet){
        $http({
          method: 'PUT',
          url: '/api/usuariosPassword',
          data: $scope.body
        }).then(function(response){
          mostrarNotificacion(response.data.message);
          $location.path('/');
        }, function(errorResponse){
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        mostrarNotificacion('Las contraseñas no coinciden');
      }
    }

  }
]);
