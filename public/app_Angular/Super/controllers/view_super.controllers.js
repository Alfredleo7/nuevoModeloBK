'use strict';

angular.module('super').controller('view_super.controller', ['$scope','$http',
  function($scope, $http){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/usuarios/'+'Super'
      }).then(function(response){
        $scope.usuarios = response.data;
        $('#loadLogo').hide();
      })
    }

  }
]);
