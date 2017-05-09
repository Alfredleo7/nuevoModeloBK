'use strict';

angular.module('cajas').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/cajas/views/list-cajas.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/cajas/views/list-cajas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/cajas/views/view-caja.view.html'
    });
  }
]);
