'use strict';

angular.module('administrador').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Administrador/views/list-cajas.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/Administrador/views/list-cajas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/Administrador/views/view-caja.view.html'
    });
  }
]);
