'use strict';

angular.module('general').controller('reporte.controller', ['$scope','$http',
  function($scope,$http){

    $scope.anios = []
    $scope.filtroAnio = {};

    $http({
      method: 'GET',
      url: '/api/aniosDealleBySucursal'
    }).then(function(response){
      console.log(response.data);
      $scope.anios = response.data;
      $scope.filtroAnio = $scope.anios[$scope.anios.length - 1]._id;
      console.log($scope.filtroAnio);
    }, function(errorResponse){
      console.log(errorResponse.data);
    })

  }
]);
