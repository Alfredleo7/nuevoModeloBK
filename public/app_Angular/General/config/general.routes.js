'use strict';

angular.module('general').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html',
      controller: 'caja.controller'
    }).
    when('/pruebaReporte', {
      templateUrl: 'app_Angular/General/views/reporte.view.html',
      controller: 'reporte.controller'
    }).
    when('/CreacionCajas', {
      templateUrl: 'app_Angular/General/views/creacionCajas.view.html',
      controller: 'caja.controller'
    }).
    when('/CajasRechazadas', {
      templateUrl: 'app_Angular/General/views/cajasRechazadas.view.html',
      controller: 'caja.controller'
    }).
    when('/CajasEnviadas', {
      templateUrl: 'app_Angular/General/views/cajasEnviadas.view.html',
      controller: 'caja.controller'
    }).
    when('/CajasAprobadas', {
      templateUrl: 'app_Angular/General/views/cajasAprobadas.view.html',
      controller: 'caja.controller'
    }).
    when('/caja/:cajaId', {
      templateUrl: 'app_Angular/General/views/view-caja.view.html',
      controller: 'view-caja.controller'
    }).
    when('/caja/:cajaId/crearDetalle', {
      templateUrl: 'app_Angular/General/views/crear-detalle.view.html',
      controller: 'detalle.controller'
    }).
    when('/caja/:cajaId/editarDetalle/:detalleId', {
      templateUrl: 'app_Angular/General/views/edit-detalle.view.html',
      controller: 'detalle.controller'
    }).
    when('/caja/:cajaId/detalle/:detalleId', {
      templateUrl: 'app_Angular/General/views/view-detalle.view.html',
      controller: 'view-detalle.controller'
    }).
    when('/CambiarContrasena', {
      templateUrl: 'app_Angular/General/views/cambiarContrasena.view.html',
      controller: 'cambiarContrasena.controller'
    }).
    when('/Proveedores',{
      templateUrl: 'app_Angular/General/views/proveedores.view.html',
      controller: 'proveedores.controller'
    });
  }
]);
