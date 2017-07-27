'use strict';

angular.module('super').controller('view_cajas.controller', ['$scope','$http',
  function($scope, $http){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajasConSecuencial/'
      }).then(function(response){
        $scope.cajas = response.data;
        console.log($scope.cajas);
        $('#loadLogo').hide();
      })
    }

  }
]);
