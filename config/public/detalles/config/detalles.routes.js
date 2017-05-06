'use strict';

angular.module('detalles').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/detalles', {
      templateUrl: 'detalles/views/list-detalles.view.html'
    }).
    when('/detalles/create', {
      templateUrl: 'detalles/views/create-detalle.view.html'
    }).
    when('/detalles/:detalleId', {
      templateUrl: 'detalles/views/view-detalle.view.html'
    }).
    when('/detalles/:detalleId/edit', {
      templateUrl: 'detalles/views/edit-detalle.view.html'
    });
  }
]);
