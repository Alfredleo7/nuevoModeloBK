'use strict';

angular.module('super').controller('view_operarios.controller', ['$scope','$http',
  function($scope, $http){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/usuarios/'+'General'
      }).then(function(response){
        $scope.usuarios = response.data;
        $('#loadLogo').hide();
      })
    }

  }
]);
