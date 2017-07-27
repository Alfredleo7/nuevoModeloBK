'use strict';

angular.module('super').controller('view_categorias.controller', ['$scope','$http',
  function($scope, $http){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/categorias/'
      }).then(function(response){
        $scope.categorias = response.data;
        $('#loadLogo').hide();
      })
    }

  }
]);
