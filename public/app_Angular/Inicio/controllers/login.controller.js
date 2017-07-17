'use strict';

angular.module('inicio').controller('login.controller', ['$scope','$http',
  function($scope,$http){
    $scope.usuario = {};

    $scope.login = function(){
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: 'api/usuariosLogin',
        data: $scope.usuario
      }).then(function(response){
        window.location.href="/";
      },function(errorResponse){
        $('#loadLogo').hide();
        new PNotify({
          text:errorResponse.data.message,
          styling: 'bootstrap3'
        })
      })
    };

  }
]);
