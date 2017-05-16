'use strict';

angular.module('general').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/General/views/list-cajas.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/General/views/list-cajas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/General/views/view-caja.view.html'
    });
  }
]);
