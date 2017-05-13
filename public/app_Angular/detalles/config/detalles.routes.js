'use strict';

angular.module('detalles').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/detalles', {
      templateUrl: 'app_Angular/detalles/views/list-detalles.view.html'
    }).
    when('/detalles/create', {
      templateUrl: 'app_Angular/detalles/views/create-detalle.view.html'
    }).
    when('/detalles/:detalleId', {
      templateUrl: 'app_Angular/detalles/views/view-detalle.view.html'
    }).
    when('/detalles/:detalleId/edit', {
      templateUrl: 'app_Angular/detalles/views/edit-detalle.view.html'
    });
  }
]);
