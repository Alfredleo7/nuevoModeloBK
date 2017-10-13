angular.module('super').controller('view_empresas.controller', ['$scope','$http',
  function($scope, $http, $routeParams){

    $http({
      method: 'GET',
      url: '/api/empresas'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.empresas = response.data;
    })
  }
])
