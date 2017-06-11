'use strict';

angular.module('general').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html'
    }).
    when('/CreacionCajas', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html'
    }).
    when('/CajasRechazadas', {
      templateUrl: 'app_Angular/General/views/cajasRechazadas.view.html'
    }).
    when('/CajasEnviadas', {
      templateUrl: 'app_Angular/General/views/cajasEnviadas.view.html'
    }).
    when('/CajasAprobadas', {
      templateUrl: 'app_Angular/General/views/cajasAprobadas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/General/views/view-caja.view.html'
    });
  }
]);
