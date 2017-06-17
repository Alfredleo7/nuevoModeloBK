'use strict';

angular.module('general').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html',
      controller: 'CajasCtrl'
    }).
    when('/CreacionCajas', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html',
      controller: 'CajasCtrl'
    }).
    when('/CajasRechazadas', {
      templateUrl: 'app_Angular/General/views/cajasRechazadas.view.html',
      controller: 'CajasCtrl'
    }).
    when('/CajasEnviadas', {
      templateUrl: 'app_Angular/General/views/cajasEnviadas.view.html',
      controller: 'CajasCtrl'
    }).
    when('/CajasAprobadas', {
      templateUrl: 'app_Angular/General/views/cajasAprobadas.view.html',
      controller: 'CajasCtrl'
    }).
    when('/caja/:cajaId', {
      templateUrl: 'app_Angular/General/views/view-caja.view.html',
      controller: 'CajaCtrl'
    }).
    when('/caja/:cajaId/crearDetalle', {
      templateUrl: 'app_Angular/General/views/crear-detalle.view.html',
      controller: 'FormDetalleCtrl'
    }).
    when('/caja/:cajaId/editarDetalle/:detalleId', {
      templateUrl: 'app_Angular/General/views/edit-detalle.view.html',
      controller: 'FormDetalleCtrl'
    }).
    when('/caja/:cajaId/detalle/:detalleId', {
      templateUrl: 'app_Angular/General/views/view-detalle.view.html',
      controller: 'view-detalle.controller'
    });
  }
]);
