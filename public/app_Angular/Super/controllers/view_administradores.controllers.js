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
    }

  }
]);
