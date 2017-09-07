'use strict';

angular.module('general').controller('cambiarContrasena.controller',['$scope','$http','$location',
  function($scope,$http,$location){

    $scope.actualizar = function(){
      if($scope.body.newPassword == $scope.newPasswordRepet){
        $('#loadLogo').show();
        $http({
          method: 'PUT',
          url: '/api/usuariosPassword',
          data: $scope.body
        }).then(function(response){
          mostrarNotificacion(response.data.message);
          $location.path('/');
          $('#loadLogo').hide();
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        mostrarNotificacion('Las contraseñas no coinciden');
      }
    }

  }
]);
