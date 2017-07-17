'use strict';

angular.module('inicio').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Inicio/views/login.view.html',
      controller: 'login.controller'
    }).
    when('/login', {
      templateUrl: 'app_Angular/Inicio/views/login.view.html',
      controller: 'login.controller'
    }).
    when('/logup', {
      templateUrl: 'app_Angular/Inicio/views/logup.view.html',
      controller: 'logup.controller'
    });
  }
]);
